export function CreateElementNode(type: string): ElementNodeLike {
    return document.createElement(type) as ElementNodeLike;
}

export function CreateTextNode(text: string): TextNodeLike {
    return document.createTextNode(text);
}

export class VirtualElement implements ElementNodeLike {
    innerHTML: string = '';
    parentNode: ElementNodeLike | null = null;

    constructor(private type: string) { }

    insertBefore(element: DOMNodeLike, reference: DOMNodeLike) {
        throw new Error("Method not implemented.");
    }
    setAttribute(key: string, value: string): void {
        throw new Error("Method not implemented.");
    }
    addEventListener(type: string, callback: any): void {
        throw new Error("Method not implemented.");
    }
    removeEventListener(type: string, callback: any): void {
        throw new Error("Method not implemented.");
    }
    removeAttribute(key: string): void {
        throw new Error("Method not implemented.");
    }
    appendChild(element: DOMNodeLike): void {
        throw new Error("Method not implemented.");
    }
    removeChild(element: DOMNodeLike): void {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
}

export type DOMNodeLike = TextNodeLike | ElementNodeLike;

export interface TextNodeLike {
    textContent: string | null;
}

export interface ElementNodeLike {
    innerHTML: string;
    parentNode: null | ElementNodeLike;
    setAttribute(key: string, value: string): void;
    addEventListener(type: string, callback: any): void;
    removeEventListener(type: string, callback: any): void;
    removeAttribute(key: string): void;
    appendChild(element: DOMNodeLike): void;
    removeChild(element: DOMNodeLike): void;
    insertBefore(element: DOMNodeLike, reference: DOMNodeLike);
    toString(): string;
}