import { ObjectMutationObserver } from "object-mutation-observer";
import type { DataBoundConfig } from "./types";

export class DataBoundApplication {
    observer: ObjectMutationObserver;
    data;

    constructor(
        public config: DataBoundConfig,
        data: any
    ) {
        this.observer = new ObjectMutationObserver({
            emit: 'sync',
            greedyProxy: true,
            resolveChangeAncestors: 'early',
            tagFunctions: ['array-mutators']
        });
        this.data = this.observer.watch(data, (c) => console.log(c));
    }

    layout(id: string) {
        return this.config.layouts[id];
    }

}