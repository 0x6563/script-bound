import type { ComponentContext, ListConfig, ListTabbedConfig } from "../../services/types.ts";
import type { DataBoundApplication } from "../../services/application.ts";
import { Render, ShouldRender } from "../../render.ts";
import { PickOne } from '../../services/utility.ts';

const sides = new Set(['top', 'left', 'right', 'bottom', 'none']);

// <template>
//     <div :data-tab-side="state.side" data-control="list" data-component="tabs">
//         <div data-element="labels">
//             <ConditionalRenderer v-for="(item, index) in items" :context="item.context">
//                 <div :data-active="index == state.active" @click="state.active = index" data-element="label" v-html="item?.label" />
//             </ConditionalRenderer>
//         </div>

//         <div data-element="viewport">
//             <div v-for="(item, index) in items" :data-active="index == state.active" data-element="viewport-child">
//                 <Renderer :config=props.config.layout :context=item.context />
//             </div>
//         </div>
//     </div>
// </template>
export function Tabs(application: DataBoundApplication, config: ListConfig<ListTabbedConfig>, contexts: ComponentContext) {
    const items: any[] = [];
    const labels: any[] = [];
    const side = PickOne(sides, config.settings.side, 'top');

    const container = application.createNode('div');
    container.setAttribute('data-tab-side', side);
    container.setAttribute('data-control', "list");
    container.setAttribute('data-component', "tabs");

    const labelsContainer = application.createNode('div');
    labelsContainer.setAttribute('data-element', 'labels');
    container.appendChild(labelsContainer);

    const viewportContainer = application.createNode('div');
    viewportContainer.setAttribute('data-element', 'viewport');
    container.appendChild(viewportContainer);

    for (let i = 0; i < contexts.length; i++) {
        const { label, context } = contexts[i];
        if (ShouldRender(context)) {
            const labelTab = application.createNode('div');
            labelTab.setAttribute('data-element', 'label');
            labelTab.innerHTML = label;
            labelTab.addEventListener('click', () => setActive(i));
            labelsContainer.appendChild(labelTab);

            const viewportChild = application.createNode('div');
            viewportChild.setAttribute('data-element', 'viewport-child');
            viewportChild.appendChild(Render(application, config.layout, context));
            viewportChild.addEventListener('click', () => setActive(i));
            viewportContainer.appendChild(viewportChild);

            labels.push(labelTab);
            items.push(viewportChild);
        } else {
            labels.push(null);
            items.push(null);
        }
    }
    setActive(contexts.findIndex(v => !v.context.state.hide));

    function setActive(active) {
        for (let i = 0; i < items.length; i++) {
            if (items[i]) {
                labels[i].setAttribute('data-active', (active == i).toString());
                items[i].setAttribute('data-active', (active == i).toString());
            }
        }
    }

    return container;
}

