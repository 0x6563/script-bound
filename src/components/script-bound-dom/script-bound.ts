import type { ScriptBoundConfig } from './services/types/types.ts';
import { DataController } from './services/controllers/data.ts';
import { ApplicationController } from './services/controllers/application.ts';
import { ComponentController } from './services/controllers/component.ts';
import type { ElementNodeLike } from './services/elements.ts';
import { ParseConfigString } from './services/config.ts';

export class ScriptBoundElement extends HTMLElement {
    private container: HTMLDivElement;
    private styleTag: HTMLStyleElement;
    private componentController?: ComponentController;

    private _data: any;
    private _source?: string;
    private _config?: ScriptBoundConfig;

    constructor() {
        super();
        this.container = document.createElement('div');
        this.container.setAttribute('data-bound-application', '');
        this.styleTag = document.createElement('style');
    }

    get data(): any { return this._data; }
    set data(value: any) {
        this._data = value;
        this.render();
    }

    get config(): ScriptBoundConfig | undefined { return this._config; }

    get source(): string | undefined { return this._source; }
    set source(src: string) {
        this._source = src;
        this.render();
    }

    connectedCallback(): void {
        if (this._source === undefined) {
            const initial = this.textContent?.trim();
            if (initial) {
                this._source = initial;
            }
        }
        this.replaceChildren(this.container, this.styleTag);
        this.render();
    }

    disconnectedCallback(): void {
        this.componentController?.disconnect();
        this.componentController = undefined;
    }

    private render(): void {
        if (!this.isConnected || !this._source) {
            return;
        }

        this._config = ParseConfigString(this._source).ast;
        this.componentController?.disconnect();
        this.container.innerHTML = '';

        const application = new ApplicationController(this._config, this._data);
        const data = new DataController({ application, data: application.data });
        this.componentController = new ComponentController({
            application,
            data,
            node: this._config.layout[0],
            attributes: {},
            parentNode: this.container as unknown as ElementNodeLike
        });
        this.styleTag.innerHTML = this._config.style;
    }
}

customElements.define('script-bound', ScriptBoundElement);
