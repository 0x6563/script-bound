export declare class ScriptBoundElement extends HTMLElement {
    data: any;
    readonly config: unknown;
    source: string | undefined;
}

declare global {
    interface HTMLElementTagNameMap {
        'script-bound': ScriptBoundElement;
    }
}
