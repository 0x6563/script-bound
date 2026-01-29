import type { ScriptBoundConfig, BaseComponentASTNode, ListComponentASTNode, ComponentsDictionary, HTMLElementASTNode, AttributeValue, Runnable, ComponentRegistry, ComponentClass } from "./types/types.js";
import { Parse } from 'grammar-well/parse';
import grammar from './xml.js';
import { ComponentsByName } from "../components/registry.js";
import { ApplicationController } from "./controllers/application.js";
import { HTMLElementComponent } from "../components/html.js";
import { Virtual } from "../components/containers/virtual.js";
import { HTMLTextComponent } from "../components/text.js";
import { ExpressionComponent } from "../components/expression.js";

export function ParseConfigString(input: string, components: ComponentsDictionary = {}): { cst: any, ast: ScriptBoundConfig } {
    const c = { ...ComponentsByName, ...components }
    const registry: ComponentRegistry = {
        byName: {},
        byClass: {}
    }

    for (const key in c) {
        registry.byName[key] = c[key]
        if (c[key].Attributes.group) {
            registry.byClass[c[key].Attributes.group] = registry.byClass[c[key].Attributes.group] || {};
            registry.byClass[c[key].Attributes.group][key] = c[key];
            if (c[key].Attributes.default) {
                registry.byName[c[key].Attributes.group] = c[key];
            }
        }
    }

    console.log(registry)
    try {
        const parsed = ParseSample(input);
        if (parsed.error) {
            console.error(parsed.error);
            return undefined as unknown as any;
        }
        const xml: XML = parsed.result;
        console.log(xml);
        return { cst: xml, ast: ConvertXMLElements(xml.nodes, registry) };
    } catch (error) {
        console.log(error);
    }
    return { cst: {}, ast: { layout: [], events: {}, style: '' } };
}

function ConvertXMLElement(node: XMLNode, registry: ComponentRegistry): ScriptBoundConfig {
    const ImportRegistry = {
        base(node: XMLElement, component: ComponentClass): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, registry);
            const input: BaseComponentASTNode = {
                ...attributes,
                type: 'base',
                component: component,
                events: config.events,
                content: config.layout,
            };
            return { events: {}, style: '', layout: [input] };
        },
        list(node: XMLElement, component: ComponentClass): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes, registry);
            if (config.layout.length > 1) {
                if (config.layout[0].type == 'text' && !config.layout[0].text.trim()) {
                    config.layout.splice(0, 1);
                }
            }
            if (config.layout.length > 1) {
                const l = config.layout.length - 1;
                if (config.layout[l].type == 'text' && !config.layout[l].text.trim()) {
                    config.layout.splice(l, 1);
                }
            }
            const content = config.layout.length > 1 ? { type: 'base' as 'base', component: Virtual, attributes: {}, events: {}, content: config.layout } : config.layout[0];
            const layout: ListComponentASTNode = {
                ...attributes,
                type: 'list',
                repeat: true,
                component: component,
                events: config.events,
                content
            }
            return { ...config, layout: [layout] };
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
        return { events: {}, style: '', layout: [{ type: 'text', text: node.text, component: HTMLTextComponent }] };
    } else if ('literal' in node) {
        return { events: {}, style: '', layout: [{ type: 'expression', expression: node.literal as Runnable, component: ExpressionComponent }] };
    } else if (node.tag == 'script') {
        return ImportRegistry.script(node);
    } else if (node.tag == 'style') {
        return ImportRegistry.style(node);
    }
    const component = ApplicationController.GetComponent(node.tag, node.attributes?.type?.value, registry);

    if (component) {
        if (component.Attributes.repeat) {
            return ImportRegistry.list(node, component);
        } else {
            return ImportRegistry.base(node, component);
        }
    }

    if ('tag' in node) {
        const attributes = ImportAttributes(node.attributes);
        const config = ConvertXMLElements(node.nodes, registry);
        const output: HTMLElementASTNode = {
            ...attributes,
            type: 'html',
            tag: node.tag,
            content: config.layout,
            component: HTMLElementComponent
        };
        return { events: {}, style: '', layout: [output] };

    };
    console.log(node);
    throw 'Not a component';
}

function ConvertXMLElements(nodes: XMLNode[] = [], components: ComponentRegistry): ScriptBoundConfig {
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
    const attributes = { attributes: {}, settings: undefined as unknown as AttributeValue, additional: {} };
    for (const key in dictionary) {
        const { value, type } = dictionary[key];
        const attr = { value, type };
        switch (key) {
            case 'id':
            case 'class':
            case 'scope':
            case 'unlock':
            case 'lock':
            case 'if':
            case 'slots':
            case 'settings':
                attributes.attributes[key] = attr;
                break;
            case 'type':
                break;
            default:
                attributes.additional[key] = attr;
                break;
        }
    }
    return attributes;
}

function ImportScriptEvents(dictionary: { [key: string]: { key: string; value: any; type: string } }) {
    const e = dictionary.event?.value || 'global';
    return Array.isArray(e) ? e : [e];
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
