import type { InputConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";

export function Checkbox(application: DataBoundApplication, config: InputConfig<InputConfig>, value: boolean = false) {
    const input = application.createNode('input');
    input.setAttribute('type', 'checkbox');
    input.setAttribute('value', value.toString());
    input.addEventListener('change', (v) => v);
    return input;
} 