import { Textbox } from './inputs/textbox.ts';
import { Checkbox } from './inputs/checkbox.ts';
import { Multi } from './lists/multi.ts';
import { Single } from './lists/single.ts';
import { Tabs } from './lists/tabs.ts';
import { Html } from './outputs/html.ts';
import { Flow } from "./containers/flow.ts";
import { DebugDump } from "./debugs/dump.ts";
import { DebugError } from "./debugs/error.ts";

export const ComponentsByType = {
    input: {
        text: Textbox,
        textbox: Textbox,
        checkbox: Checkbox
    },
    list: {
        multi: Multi,
        single: Single,
        tabs: Tabs,
    },
    output: {
        html: Html
    },
    container: {
        flow: Flow
    },
    debug: {
        dump: DebugDump,
        error: DebugError
    },
}
export const ComponentsByName = {
    textbox: Textbox,
    checkbox: Checkbox,
    multi: Multi,
    single: Single,
    tabs: Tabs,
    html: Html,
    flow: Flow,
    dump: DebugDump,
    error: DebugError
}


export function GetComponent(group: "container" | "list" | "input" | "output", name: string): typeof ComponentsByName[keyof typeof ComponentsByName] {
    return ComponentsByType[group]?.[name] || ComponentsByName[name] || ComponentsByName.error;
}