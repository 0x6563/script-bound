import type { ElementNodeLike } from "../../services/elements.ts";
import { PickOne } from '../../services/utility.ts';
import { BaseComponent } from "../base.ts";

const sides = new Set(['top', 'left', 'right', 'bottom', 'none']);

export class Tabs extends BaseComponent {
    private labels: ElementNodeLike[] = [];
    private items: ElementNodeLike[] = [];

    connect() {
        const settings = this.controller.attributes.settings?.value as { side?: string } | undefined;
        const attributes = {
            'data-control': "list",
            'data-component': "tabs",
            'data-tab-side': PickOne(sides, settings?.side, 'top')
        };

        const container = this.controller.application.createNode('div', attributes);

        const labelsContainer = this.controller.application.createNode('div');
        labelsContainer.setAttribute('data-element', 'labels');
        container.appendChild(labelsContainer);

        const viewportContainer = this.controller.application.createNode('div');
        viewportContainer.setAttribute('data-element', 'viewport');
        container.appendChild(viewportContainer);

        this.controller.node.content.forEach((node, i) => {
            const labelTab = this.controller.application.createNode('div');
            labelTab.setAttribute('data-element', 'label');
            labelTab.innerHTML = i.toString();
            labelTab.addEventListener('click', () => this.setActive(i));
            labelsContainer.appendChild(labelTab);

            const viewportChild = this.controller.application.createNode('div');
            viewportChild.setAttribute('data-element', 'viewport-child');
            const bookmark = this.controller.application.createComment('');
            viewportChild.appendChild(bookmark);
            this.controller.createChildren({ content: [node], refNode: bookmark });
            viewportContainer.appendChild(viewportChild);

            this.labels.push(labelTab);
            this.items.push(viewportChild);
        });

        this.setActive(0);
        return [container];
    }

    private setActive(active: number) {
        for (let i = 0; i < this.items.length; i++) {
            this.labels[i].setAttribute('data-active', (active == i).toString());
            this.items[i].setAttribute('data-active', (active == i).toString());
        }
    }
}
