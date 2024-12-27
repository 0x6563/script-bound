import type { InputConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";

export function Text(application: DataBoundApplication, config: InputConfig<{ label?: string }>, value: boolean = false) {
    const label = application.createNode('label');

    const input = application.createNode('input');
    input.setAttribute('type', 'text');
    input.setAttribute('value', value.toString());
    input.addEventListener('change', (v) => v);

    label.appendChild(input);

    const labelDiv = application.createNode('div');
    labelDiv.setAttribute('data-bound-label', '');
    labelDiv.innerHTML = config.settings?.label || '&nbsp;';

    label.appendChild(labelDiv);
    return label;
}