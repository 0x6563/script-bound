export function CreateElementNode(type: string): DOMNodeLike {
    return document.createElement(type) as DOMNodeLike;
}

export class VirtualElement implements DOMNodeLike {
    innerHTML: string = '';
    constructor(private type: string) { }
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


export interface DOMNodeLike {
    innerHTML: string;
    setAttribute(key: string, value: string): void;
    addEventListener(type: string, callback: any): void;
    removeEventListener(type: string, callback: any): void;
    removeAttribute(key: string): void;
    appendChild(element: DOMNodeLike): void;
    removeChild(element: DOMNodeLike): void;
    toString(): string;
}