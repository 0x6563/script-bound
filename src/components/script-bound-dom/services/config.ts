import type { ContainerConfig, ComponentDefinition, ScriptBoundConfig, InputConfig, ListConfig, OutputConfig } from "./types/types.js";
import { Parse } from 'grammar-well/parse';
import grammar from './xml.js';
import { ComponentsByName } from "../components/registry.js";

export function ParseConfigString(input: string): ScriptBoundConfig | undefined {
    try {
        const parsed = ParseSample(input);
        if (parsed.error) {
            console.error(parsed.error);
            return;
        }
        const xml: XML = parsed.result;
        const config: ScriptBoundConfig = {} as any;
        for (const node of xml.nodes) {
            if (node && (node as any)?.tag == 'layouts') {
                config.layouts = ImportLayoutConfig(node as XMLElement);
            }

            if (node && (node as any)?.tag == 'scripts') {
                config.scripts = ImportScripts((node as XMLElement).nodes);
            }

            if (node && (node as any)?.tag == 'style') {
                config.style = ImportText((node as XMLElement).nodes);
            }
        }
        return config;
    } catch (error) {
        console.log(error);
    }
    // return { layouts, rules }
}

function ImportLayoutConfig(xml: XMLElement) {
    const layouts: ScriptBoundConfig['layouts'] = {} as any;
    for (const node of xml.nodes) {
        if (node && 'tag' in node) {
            layouts[node.attributes?.id.value] = ImportLayouts((node as XMLElement).nodes, true)[0];
        }
    }
    return layouts;
}

function ImportLayouts(nodes: XMLNode[], first?: true): ComponentDefinition[] {
    const elements: ComponentDefinition[] = [];
    for (const node of nodes) {
        if (node && 'attributes' in node) {
            elements.push(ImportLayout(node));
            if (first) {
                break;
            }
        }
    }
    return elements;
}

const ImportRegistry = {
    container(node: XMLElement, component: string = 'flow'): ContainerConfig {
        const attributes = ImportAttributes(node.attributes);
        const layout: ContainerConfig = {
            ...attributes,
            type: 'container',
            component: node.attributes.type?.value || component,
            content: ImportLayouts(node.nodes)
        };
        return layout;
    },
    list(node: XMLElement, component: string = 'multi'): ListConfig {
        const attributes = ImportAttributes(node.attributes);
        const layout: ListConfig = {
            ...attributes,
            type: 'list',
            component: node.attributes.type?.value || component,
            template: ImportLayouts(node.nodes, true)[0]
        }
        return layout;
    },
    input(node: XMLElement, component: string = 'textbox'): InputConfig {
        const attributes = ImportAttributes(node.attributes);
        const input: InputConfig = {
            ...attributes,
            type: 'input',
            component: node.attributes.type?.value || component,
        };
        return input;
    },
    output(node: XMLElement, component: string = 'html'): OutputConfig {
        const attributes = ImportAttributes(node.attributes);
        const output: OutputConfig = {
            ...attributes,
            type: 'output',
            component: node.attributes.type?.value || component,
            content: UnparseXML(node.nodes).trim(),
        };
        return output;
    }
}

function ImportLayout(node: XMLElement) {
    if (node.tag in ImportRegistry) {
        return ImportRegistry[node.tag](node)
    } else if (ComponentsByName[node.tag].type in ImportRegistry) {
        return ImportRegistry[ComponentsByName[node.tag].type](node, node.tag);
    };
    throw 'Not a component';
}

function ImportAttributes(dictionary: { [key: string]: { key: string; value: any; type: string } }) {
    const attributes = { attributes: {}, settings: {}, events: {} };
    for (const key in dictionary) {
        const { value } = dictionary[key];
        if (key.indexOf('on:') == 0) {
            attributes.events[key.slice(3)] = value;
            continue;
        }
        switch (key) {
            case 'id':
            case 'class':
            case 'bind':
            case 'unlock':
            case 'lock':
            case 'if':
                attributes.attributes[key] = value;
                break;
            case 'settings':
                if (typeof value == 'object' && !Array.isArray(value)) {
                    Object.assign(attributes.settings, value)
                }
                break;
            default:
                attributes.settings[key] = value;
                break;
        }
    }
    return attributes;
}

function ImportScripts(nodes: XMLNode[]) {
    const scripts = {};
    for (const node of nodes) {
        if (node && 'attributes' in node && node?.tag == 'script' && node.attributes.id) {
            scripts[node.attributes.id.value] = node.nodes[0];
        }
    }
    return scripts;

}

function ImportText(nodes: XMLNode[]) {
    if (nodes[0] && 'text' in nodes[0]) {
        return nodes[0].text.trim();
    }
}

function UnparseXML(xml: XMLNode | XMLNode[] = null, disabled = { script: true, style: true }) {
    let s = '';
    if (!xml) {
        return s;
    }
    xml = Array.isArray(xml) ? xml : [xml];
    for (const node of xml) {
        if (!node)
            continue;
        if ('text' in node) {
            s += node.text;
        } else {
            if (!disabled[node.tag.toLowerCase()])
                s += `<${node.tag}${UnparseAttributes(node.tag, node.attributes)}>${UnparseXML(node.nodes, disabled)}</${node.tag}>`;
        }
    }
    return s;
}

function UnparseAttributes(_tag: string, attributes?: { [key: string]: { key: string; value: string; type: string } }) {
    let s = '';
    if (!attributes) {
        return s;
    }
    for (const key in attributes) {
        s += ` ${key}=${JSON.stringify(attributes[key].value)}`;
    }
    return s;
}

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
