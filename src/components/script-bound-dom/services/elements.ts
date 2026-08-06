export function CreateElementNode(type: string): ElementNodeLike {
    return document.createElement(type) as unknown as ElementNodeLike;
}

export function CreateTextNode(text: string): TextNodeLike {
    return document.createTextNode(text) as unknown as TextNodeLike;
}

export function CreateCommentNode(comment: string): TextNodeLike {
    return document.createComment(comment) as unknown as TextNodeLike;
}

export function CreateFragment(): ElementNodeLike {
    return document.createDocumentFragment() as unknown as ElementNodeLike;
}

export class VirtualElement implements ElementNodeLike {
    parentNode: ElementNodeLike | null = null;

    get innerHTML(): string {
        throw new Error("Method not implemented.");
    }
    set innerHTML(s: string) {
        throw new Error("Method not implemented.");
    }

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
    before(element: DOMNodeLike): DOMNodeLike {
        throw new Error("Method not implemented.");
    }
    after(element: DOMNodeLike): DOMNodeLike {
        throw new Error("Method not implemented.");
    }
    remove(): void {
        throw new Error("Method not implemented.");
    }
    toString(): string {
        throw new Error("Method not implemented.");
    }
}

export type DOMNodeLike = TextNodeLike | ElementNodeLike;

export interface TextNodeLike {
    textContent: string | null;
    parentNode: null | ElementNodeLike;
    before(element: DOMNodeLike): DOMNodeLike;
    after(element: DOMNodeLike): DOMNodeLike;
    remove(): void;
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
    before(element: DOMNodeLike): DOMNodeLike;
    after(element: DOMNodeLike): DOMNodeLike;
    remove(): void;
    toString(): string;
}