import type { ComponentsDictionary } from '../services/types/types.ts';
import { Textbox } from './inputs/textbox.ts';
import { Checkbox } from './inputs/checkbox.ts';
import { Single } from './lists/single.ts';
import { Tabs } from './lists/tabs.ts';
import { SelectComponent } from './inputs/select.ts';
import { HTMLElementComponent } from './html.ts';
import { Flow } from "./containers/flow.ts";
import { DebugDump } from "./debugs/dump.ts";
import { DebugError } from "./debugs/error.ts";
import { Button } from './inputs/button.ts';
import { IfComponent } from './containers/if.ts';
import { ForComponent } from './containers/for.ts';
import { HTMLTextComponent } from './text.ts';
import { ExpressionComponent } from './expression.ts';

export const SymbolText = Symbol('SymbolText');
export const SymbolExpression = Symbol('SymbolText');

export const ComponentsByName: ComponentsDictionary = {
    textbox: Textbox as any,
    text: Textbox as any,
    input: Textbox as any,
    checkbox: Checkbox as any,
    single: Single as any,
    tabs: Tabs as any,
    select: SelectComponent as any,
    html: HTMLElementComponent as any,
    flow: Flow as any,
    dump: DebugDump as any,
    error: DebugError as any,
    button: Button as any,
    if: IfComponent as any,
    for: ForComponent as any,
    [SymbolText]: HTMLTextComponent,
    [SymbolExpression]: ExpressionComponent
}


