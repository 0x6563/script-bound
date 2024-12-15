import Input from "../layouts/controls/input.vue";
import Output from "../layouts/controls/output.vue";
import Container from "../layouts/controls/container.vue";
import List from "../layouts/controls/list.vue";
import Text from '../layouts/inputs/text.vue';
import Checkbox from '../layouts/inputs/checkbox.vue';
import Multi from '../layouts/lists/multi.vue';
import Single from '../layouts/lists/single.vue';
import Tabs from '../layouts/lists/tabs.vue';
import Dump from '../layouts/debug/dump.vue';
import Error from '../layouts/debug/error.vue';
import Html from '../layouts/outputs/html.vue';
import Flow from "../layouts/containers/flow.vue";

export const Registry: {
    input: ComponentRegistry,
    output: ComponentRegistry,
    list: ComponentRegistry,
    control: ComponentRegistry,
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
    control: {
        container: Container,
        input: Input,
        list: List,
        output: Output,
    },
    container: {
        flow: Flow
    },
    debug: {
        dump: Dump,
        error: Error
    },
}

interface ComponentRegistry {
    [key: string]: any;
}
export function GetComponent(control: keyof typeof Registry, name: string) {
    return Registry[control]?.[name] || Registry.debug.error;
}