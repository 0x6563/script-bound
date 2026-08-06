import type { ScriptBoundConfig, ElementASTNode, Runnable, } from "./types/types.js";
import { Parse } from 'grammar-well/parse';
import grammar from './xml.js';

export function ParseConfigString(input: string): { cst: any, ast: ScriptBoundConfig } {

    try {
        const parsed = ParseSample(input);
        console.log(parsed);

        if (parsed.error) {
            console.error(parsed.error);
            return undefined as unknown as any;
        }
        const xml: XML = parsed.result;
        console.log(xml);
        return { cst: xml, ast: ConvertXMLElements(xml.nodes) };
    } catch (error) {
        console.log(error);
    }
    return { cst: {}, ast: { layout: [], events: {}, style: '' } };
}

function ConvertXMLElement(node: XMLNode): ScriptBoundConfig {
    const ImportRegistry = {
        base(node: XMLElement): ScriptBoundConfig {
            const attributes = ImportAttributes(node.attributes);
            const config = ConvertXMLElements(node.nodes);
            const input: ElementASTNode = {
                ...attributes,
                type: 'element',
                tag: node.tag,
                events: config.events,
                content: config.layout,
            };

            if (node.expression)
                input.expression = node.expression;

            return { events: {}, style: '', layout: [input] };
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
        return { events: {}, style: '', layout: [{ type: 'text', text: node.text }] };
    } else if ('literal' in node) {
        return { events: {}, style: '', layout: [{ type: 'expression', expression: node.literal as Runnable }] };
    } else if (node.tag == 'script') {
        return ImportRegistry.script(node);
    } else if (node.tag == 'style') {
        return ImportRegistry.style(node);
    }
    return ImportRegistry.base((node as XMLElement));
}

function ConvertXMLElements(nodes: XMLNode[] = []): ScriptBoundConfig {
    const result: ScriptBoundConfig = { layout: [], events: {}, style: '' };
    for (const node of nodes) {
        const config = ConvertXMLElement(node);
        result.layout.push(...config.layout);
        result.style += config.style;
        Object.assign(result.events, config.events);
    }
    return result;
}

function ImportAttributes(dictionary: { [key: string]: { key: string; value: any; type: string; binding?: boolean } }) {
    const attributes = { attributes: {} };
    for (const key in dictionary) {
        const { value, type, binding } = dictionary[key];
        const attr = { value, type, ...(binding ? { binding } : {}) };
        attributes.attributes[key] = attr;
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
    expression: any;
    attributes: { [key: string]: { key: string; value: any; type: string } }
    nodes: XMLNode[]
}

interface XMLText {
    text: string
}