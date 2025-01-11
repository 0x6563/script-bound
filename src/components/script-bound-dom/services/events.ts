export class Events<T> {
    private static EVENT_TYPE = 'event';
    private $events = new EventTarget();
    private lookups = new WeakMap();
    constructor() { }

    addEventListener(callback: (detail: T) => void) {
        const wrapped = ((e) => { callback(e.detail as T) });
        this.lookups.set(callback, wrapped);
        this.$events.addEventListener(Events.EVENT_TYPE, wrapped);
    }

    removeEventListener(callback: (detail: T) => void) {
        const wrapped = this.lookups.get(callback);
        this.lookups.delete(callback);
        this.$events.removeEventListener(Events.EVENT_TYPE, wrapped);
    }

    emit(e: T) {
        this.$events.dispatchEvent(new CustomEvent(Events.EVENT_TYPE, { detail: e }));
    }
}