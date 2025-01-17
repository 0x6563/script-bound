import type { ListComponentASTNode, PositionalSide } from "../../services/types/types.ts";
import type { ComponentController } from "../../services/controllers/component.ts";
import { PickOne } from '../../services/utility.ts';
import { ListComponent } from "../list.ts";

const sides = new Set(['top', 'left', 'right', 'bottom', 'none']);
export class Tabs extends ListComponent<{ side: PositionalSide }> {
    private attributes;

    constructor(protected controller: { config: ListComponentASTNode<{ side: PositionalSide }> } & ComponentController) {
        super(controller);
        this.attributes = {
            'data-control': "list",
            'data-component': "tabs",
            'data-tab-side': PickOne(sides, this.controller.config.settings.side, 'top')
        }
    }

    connect(subcomponents: ComponentController[]) {
        const items: any[] = [];
        const labels: any[] = [];

        const container = this.controller.application.createNode('div', this.attributes);

        const labelsContainer = this.controller.application.createNode('div');
        labelsContainer.setAttribute('data-element', 'labels');
        container.appendChild(labelsContainer);

        const viewportContainer = this.controller.application.createNode('div');
        viewportContainer.setAttribute('data-element', 'viewport');
        container.appendChild(viewportContainer);

        for (let i = 0; i < subcomponents.length; i++) {
            const component = subcomponents[i];
            const labelTab = this.controller.application.createNode('div');
            labelTab.setAttribute('data-element', 'label');
            labelTab.innerHTML = component.data.bind as string;
            labelTab.addEventListener('click', () => setActive(i));
            labelsContainer.appendChild(labelTab);

            const viewportChild = this.controller.application.createNode('div');
            viewportChild.setAttribute('data-element', 'viewport-child');
            if (component) {
                const doms = component.connect();
                for (const dom of doms) {
                    viewportChild.appendChild(dom);
                }
            }
            viewportContainer.appendChild(viewportChild);

            labels.push(labelTab);
            items.push(viewportChild);

        }
        setActive(subcomponents.findIndex(subcomponent => subcomponent.attributes.local.if?.value));

        function setActive(active) {
            for (let i = 0; i < items.length; i++) {
                if (items[i]) {
                    labels[i].setAttribute('data-active', (active == i).toString());
                    items[i].setAttribute('data-active', (active == i).toString());
                }
            }
        }

        return [container];
    }
} 