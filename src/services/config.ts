import { ContainerConfig, ControlStructure, DataBoundConfig, InputConfig, ListConfig, OutputConfig } from "../components/data-bound/services/types";
import { Parse } from 'grammar-well/build/index';
import grammar from './xml.js';

export function ParseConfigString(input: string): DataBoundConfig | undefined {
    try {
        const parsed = ParseSample(input);
        if (parsed.error) {
            console.error(parsed.error);
            return;
        }
        const xml: XML = parsed.result.results[0];
        const config: DataBoundConfig = {} as any;
        for (const node of xml.nodes) {
            if (node && (node as any)?.tag == 'layouts') {
                config.layouts = ImportLayoutConfig(node as XMLElement);
            }

            if (node && (node as any)?.tag == 'scripts') {
                config.rules = ImportScripts((node as XMLElement).nodes);
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
    const layouts: DataBoundConfig['layouts'] = {} as any;
    for (const node of xml.nodes) {
        if (node && 'tag' in node) {
            layouts[node.attributes?.id] = ImportLayouts((node as XMLElement).nodes, true)[0];
        }
    }
    return layouts;
}

function ImportLayouts(nodes: XMLNode[], first?: true): ControlStructure[] {
    const elements: ControlStructure[] = [];
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

function ImportLayout(node: XMLElement) {
    if (node.tag == 'container') {
        return ImportContainer(node);
    } else if (node.tag == 'list') {
        return ImportList(node);
    } else if (node.tag == 'input') {
        return ImportInput(node);
    } else if (node.tag == 'output') {
        return ImportOutput(node);
    }
    throw 'Not a component';
}
function ImportContainer(node: XMLElement): ContainerConfig {
    const attributes = ImportAttributes(node.attributes);
    const layout: ContainerConfig = {
        ...attributes.main,
        settings: attributes.settings,
        type: node.tag as any,
        component: node.attributes.type,
        layouts: ImportLayouts(node.nodes)
    };
    return layout;
}

function ImportList(node: XMLElement): ListConfig {
    const attributes = ImportAttributes(node.attributes);
    const layout: ListConfig = {
        ...attributes.main,
        settings: attributes.settings,
        type: node.tag as any,
        component: node.attributes.type,
        layout: ImportLayouts(node.nodes, true)[0]
    }
    return layout;
}

function ImportInput(node: XMLElement): InputConfig {
    const attributes = ImportAttributes(node.attributes);
    const input: InputConfig = {
        ...attributes.main,
        settings: attributes.settings,
        type: node.tag as any,
        component: node.attributes.type,
    };
    return input;
}

function ImportOutput(node: XMLElement): OutputConfig {
    const attributes = ImportAttributes(node.attributes);
    const output: OutputConfig = {
        ...attributes.main,
        settings: attributes.settings,
        type: node.tag as any,
        layout: UnparseXML(node.nodes).trim(),
        component: node.attributes.type,
    };
    return output;
}

function ImportAttributes(attributes: { [key: string]: string }) {
    const split = { main: {}, settings: {} };
    for (const key in attributes) {
        const value = attributes[key];
        switch (key) {
            case 'id':
            case 'class':
            case 'bind':
            case 'rebind':
            case 'lock':
            case 'hide':
            case 'component':
            case 'type':
            case 'preprocessors':
            case 'postprocessors':
                split.main[key] = value;
                break;
            case 'settings':
                if (typeof value == 'object' && !Array.isArray(value)) {
                    Object.assign(split.settings, value)
                } else {
                    split.settings[key] = value;
                }
                break;
            default:
                split.settings[key] = value;
                break;
        }
    }
    return split;
}
function ImportScripts(nodes: XMLNode[]) {
    const rules = {};
    for (const node of nodes) {
        if (node && 'attributes' in node && node?.tag == 'script' && node.attributes.id) {
            rules[node.attributes.id] = ImportText(node.nodes);
        }
    }
    return rules;

}

function ImportText(nodes: XMLNode[]) {
    if (nodes[0] && 'text' in nodes[0]) {
        return nodes[0].text.trim();
    }
}

function UnparseXML(xml?: XMLNode | XMLNode[]) {
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
            if (node.tag.toLowerCase() != 'script' && node.tag.toLowerCase() != 'style')
                s += `<${node.tag}${UnparseAttributes(node.tag, node.attributes)}>${UnparseXML(node.nodes)}</${node.tag}>`;
        }
    }
    return s;
}

function UnparseAttributes(tag: string, attributes?: { [key: string]: string }) {
    let s = '';
    if (!attributes) {
        return s;
    }
    for (const key in attributes) {
        s += ` ${key}=${JSON.stringify(attributes[key])}`;
    }
    return s;
}

export function ParseSample(sample: string) {
    try {
        const response: any = {};
        const parseStart = performance.now();
        response.result = Parse(grammar(), sample, { algorithm: 'earley' });
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
    attributes: { [key: string]: string }
    nodes: XMLNode[]
}
interface XMLText { text: string }
