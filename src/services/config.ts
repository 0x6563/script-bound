import { ContainerConfig, ControlStructure, DataBoundConfig, InputConfig, ListConfig, OutputConfig } from "../components/data-bound/services/types";
import { Parse } from 'grammar-well/parse';
import grammar from './xml.js';

export function ParseConfigString(input: string): DataBoundConfig | undefined {
    try {
        const parsed = ParseSample(input);
        if (parsed.error) {
            console.error(parsed.error);
            return;
        }
        const xml: XML = parsed.result;
        const config: DataBoundConfig = {} as any;
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
    const layouts: DataBoundConfig['layouts'] = {} as any;
    for (const node of xml.nodes) {
        if (node && 'tag' in node) {
            layouts[node.attributes?.id.value] = ImportLayouts((node as XMLElement).nodes, true)[0];
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
        ...attributes.config,
        settings: attributes.settings,
        type: node.tag as any,
        component: node.attributes.type?.value,
        layouts: ImportLayouts(node.nodes)
    };
    return layout;
}

function ImportList(node: XMLElement): ListConfig {
    const attributes = ImportAttributes(node.attributes);
    const layout: ListConfig = {
        ...attributes.config,
        settings: attributes.settings,
        type: node.tag as any,
        component: node.attributes.type?.value,
        layout: ImportLayouts(node.nodes, true)[0]
    }
    return layout;
}

function ImportInput(node: XMLElement): InputConfig {
    const attributes = ImportAttributes(node.attributes);
    const input: InputConfig = {
        ...attributes.config,
        lifecycle: attributes.lifecycle,
        settings: attributes.settings,
        type: node.tag as any,
    } as InputConfig;
    return input;
}

function ImportOutput(node: XMLElement): OutputConfig {
    const attributes = ImportAttributes(node.attributes);
    const output: OutputConfig = {
        ...attributes.config,
        lifecycle: attributes.lifecycle,
        settings: attributes.settings,
        type: node.tag as any,
        layout: UnparseXML(node.nodes).trim(),
    } as OutputConfig;
    return output;
}

function ImportAttributes(dictionary: { [key: string]: { key: string; value: any; type: string } }) {
    const attributes = { config: {}, settings: {}, lifecycle: {} };
    for (const key in dictionary) {
        const { type, value } = dictionary[key];
        if (key.indexOf('on:') == 0) {
            attributes.lifecycle[key.slice(3)] = value;
            continue;
        }
        if (key.indexOf('setting:') == 0) {
            attributes.settings[key.slice(8)] = value;
            continue;
        }
        if (key.indexOf('s:') == 0) {
            attributes.settings[key.slice(2)] = value;
            continue;
        }
        switch (key) {
            case 'component':
            case 'id':
            case 'class':
            case 'bind':
                if (type == 'json')
                    attributes.config[key] = value;
                break;
            case 'lock':
            case 'hide':
                attributes.config[key] = value;
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
