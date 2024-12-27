import { Text } from './inputs/text.ts';
import { Checkbox } from './inputs/checkbox.ts';
import { Multi } from './lists/multi.ts';
import { Single } from './lists/single.ts';
import { Tabs } from './lists/tabs.ts';
import { Html } from './outputs/html.ts';
import { Flow } from "./containers/flow.ts";
import { Debug_Dump } from "./debugs/dump.ts";
import { Debug_Error } from "./debugs/error.ts";
import type { DOMNodeLike } from '../services/element.ts';
import type { ComponentRegistry } from '../services/types.ts';

export const Registry: {
    input: ComponentRegistry,
    output: ComponentRegistry,
    list: ComponentRegistry,
    debug: ComponentRegistry,
    container: ComponentRegistry,
} = {
    input: {
        text: Text,
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
        dump: Debug_Dump,
        error: Debug_Error
    },
}


export function GetComponent(control: keyof typeof Registry, name: string): (...args: any[]) => DOMNodeLike {
    return Registry[control]?.[name] || Registry.debug.error;
}