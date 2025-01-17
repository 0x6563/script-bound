import { Textbox } from './inputs/textbox.ts';
import { Checkbox } from './inputs/checkbox.ts';
import { Multi } from './lists/multi.ts';
import { Single } from './lists/single.ts';
import { Tabs } from './lists/tabs.ts';
import { Html } from './outputs/html.ts';
import { Flow } from "./containers/flow.ts";
import { DebugDump } from "./debugs/dump.ts";
import { DebugError } from "./debugs/error.ts";
import type { ComponentsDictionary } from '../services/types/types.ts';

export const ComponentsByName: ComponentsDictionary = {
    textbox: Textbox as any,
    text: Textbox as any,
    checkbox: Checkbox as any,
    multi: Multi as any,
    single: Single as any,
    tabs: Tabs as any,
    html: Html as any,
    flow: Flow as any,
    dump: DebugDump as any,
    error: DebugError as any
}

