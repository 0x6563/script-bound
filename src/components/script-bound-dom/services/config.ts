import type { ContainerComponentASTNode, ScriptBoundConfig, InputComponentASTNode, ListComponentASTNode, OutputComponentASTNode, ComponentsDictionary, HTMLElementASTNode } from "./types/types.js";
import { Parse } from 'grammar-well/parse';
import grammar from './xml.js';
import { ComponentsByName } from "../components/registry.js";

export function ParseConfigString(input: string, components: ComponentsDictionary = {}): ScriptBoundConfig | undefined {
    let c = { ...ComponentsByName, ...components }
    try {
        const parsed = ParseSample(input);
        if (parsed.error) {
            console.error(parsed.error);
            return;
        }
        const xml: XML = parsed.result;
        console.log(xml);
        return ConvertXMLElements(xml.nodes, c);
    } catch (error) {
        console.log(error);
    }
}

function ConvertXMLElement(node: XMLNode, components: ComponentsDictionary): ScriptBoundConfig {
    const ImportRegistry = {
        container(node: XMLElement, component: string = 'flow'): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, components);
            const layout: ContainerComponentASTNode = {
                ...attributes,
                type: 'container',
                component: node.attributes.type?.value || component,
                events: config.events,
                content: config.layout,
            };
            return { ...config, layout: [layout] };
        },
        list(node: XMLElement, component: string = 'multi'): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, components);
            const layout: ListComponentASTNode = {
                ...attributes,
                type: 'list',
                component: node.attributes.type?.value || component,
                events: config.events,
                template: config.layout[0]
            }
            return { ...config, layout: [layout] };
        },
        input(node: XMLElement, component: string = 'textbox'): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, components);
            const input: InputComponentASTNode = {
                ...attributes,
                type: 'input',
                events: config.events,
                component: node.attributes.type?.value || component,
            };
            return { events: {}, style: '', layout: [input] };
        },
        output(node: XMLElement, component: string = 'html'): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, components);
            const output: OutputComponentASTNode = {
                ...attributes,
                type: 'output',
                component: node.attributes.type?.value || component,
                events: config.events,
                content: config.layout
            };
            return { events: {}, style: '', layout: [output] };
        },
        script(node: XMLElement): ScriptBoundConfig {
            const events = ImportScriptEvents(node.attributes);
            const r = { events: events.reduce((c, n) => ({ ...c, [n]: node.nodes[0] as any }), {}), style: '', layout: [] };
            return r;
        },
        style(node: XMLElement): ScriptBoundConfig {
            return { events: {}, style: (node.nodes[0]! as XMLText).text!.trim(), layout: [] };
        }
    }

    if (!node) {
        return { events: {}, style: '', layout: [] };
    } else if ('text' in node) {
        if (node.text.trim())
            return { events: {}, style: '', layout: [{ type: 'text', content: node.text as string, settings: {} }] };
        return { events: {}, style: '', layout: [] };
    } else if ('literal' in node) {
        return { events: {}, style: '', layout: [{ type: 'expression', expression: node.literal, settings: {} }] };
    } else if (components[node.tag]?.Type in ImportRegistry) {
        return ImportRegistry[components[node.tag]?.Type as keyof typeof ImportRegistry](node, node.tag);
    } else if (node.tag in ImportRegistry) {
        return ImportRegistry[node.tag](node);
    } else if ('tag' in node) {
        const attributes = ImportAttributes(node.attributes);
        const config = ConvertXMLElements(node.nodes, components);
        const output: HTMLElementASTNode = {
            ...attributes,
            type: 'html',
            tag: node.tag,
            content: config.layout,
            settings: {
                attributes: attributes.custom
            }
        };
        return { events: {}, style: '', layout: [output] };

    };
    throw 'Not a component';
}

function ConvertXMLElements(nodes: XMLNode[] = [], components: ComponentsDictionary): ScriptBoundConfig {
    const result: ScriptBoundConfig = { layout: [], events: {}, style: '' };
    for (const node of nodes) {
        const config = ConvertXMLElement(node, components);
        result.layout.push(...config.layout);
        result.style += config.style;
        Object.assign(result.events, config.events);
    }
    return result;
}

function ImportAttributes(dictionary: { [key: string]: { key: string; value: any; type: string } }) {
    const attributes = { attributes: {}, settings: {}, custom: {} };
    for (const key in dictionary) {
        const { value, type } = dictionary[key];
        // const attr = { value, type };
        const attr = value;
        switch (key) {
            case 'id':
            case 'class':
            case 'bind':
            case 'unlock':
            case 'lock':
            case 'if':
            case 'slots':
                attributes.attributes[key] = attr;
                break;
            case 'settings':
                if (typeof attr == 'object' && !Array.isArray(attr)) {
                    Object.assign(attributes.settings, attr)
                }
                break;
            case 'type':
                break;
            default:
                attributes.custom[key] = attr;
                break;
        }
    }
    return attributes;
}

function ImportScriptEvents(dictionary: { [key: string]: { key: string; value: any; type: string } }) {
    const e = dictionary.on.value || 'global';
    return Array.isArray(e) ? e : [e];
}


// function UnparseXML(xml: XMLNode | XMLNode[] = null, disabled = { script: true, style: true }) {
//     let s = '';
//     if (!xml) {
//         return s;
//     }
//     xml = Array.isArray(xml) ? xml : [xml];
//     for (const node of xml) {
//         if (!node)
//             continue;
//         if ('text' in node) {
//             s += node.text;
//         } else {
//             if (!disabled[node.tag.toLowerCase()])
//                 s += `<${node.tag}${UnparseAttributes(node.tag, node.attributes)}>${UnparseXML(node.nodes, disabled)}</${node.tag}>`;
//         }
//     }
//     return s;
// }

// function UnparseAttributes(_tag: string, attributes?: { [key: string]: { key: string; value: string; type: string } }) {
//     let s = '';
//     if (!attributes) {
//         return s;
//     }
//     for (const key in attributes) {
//         s += ` ${key}=${JSON.stringify(attributes[key].value)}`;
//     }
//     return s;
// }

export function ParseSample(sample: string) {
    try {
        const response: any = {};
        const parseStart = performance.now();
        response.result = Parse(new grammar() as any, sample, { algorithm: 'earley' }, 'first');
        response.timing = performance.now() - parseStart;
        return response;

    } catch (error: any) {
        console.log(error)
        return { error: error.toString() };
    }
}

interface XML {
    nodes: XMLNode[]
}
type XMLNode = XMLElement | XMLComment | XMLText;
type XMLComment = null;
interface XMLElement {
    tag: string;
    attributes: { [key: string]: { key: string; value: any; type: string } }
    nodes: XMLNode[]
}
interface XMLText { text: string }
