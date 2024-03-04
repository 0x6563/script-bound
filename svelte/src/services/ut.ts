export class Inherit {
    $readonly: boolean = false;
    $hide: boolean = false;

    get readonly() {
        return this.source.readonly || this.$readonly;
    }

    get hide() {
        return this.source.hide || this.$hide;
    }

    set readonly(b: boolean) {
        this.$readonly = b;
    }

    set hide(b: boolean) {
        this.$hide = b;
    }

    constructor(private source: { readonly: boolean; hide: boolean }) { }
}

export function TryJson(json: string, fallback?: any) {
    try {
        return JSON.parse(json);
    } catch (error) {

    }
    return fallback;
}