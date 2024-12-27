import type { DOMNodeLike } from "./services/element";
import type { ComponentContext, ComponentRegistry, ContainerConfig, ControlStructure, InputConfig, ListConfig } from "./services/types";
import type { DataBoundApplication } from "./services/application";
import type { Context } from "./services/context";
import { GetComponent } from "./components/registry";

const ComponentType: ComponentRegistry = {
  container(application: DataBoundApplication, config: ContainerConfig<any>, context: Context) {
    return GetComponent('container', config?.component || 'flow')(application, config, context)
  },
  input(application: DataBoundApplication, config: InputConfig<any>, context: Context) {
    const input = GetComponent('input', config?.component || 'text')(application, config, context.data);
    input.addEventListener('change', (e, value) => context.data = value);
    return input;
  },
  output(application: DataBoundApplication, config: ContainerConfig<any>, context: Context) {
    return GetComponent('output', config?.component || 'html')(application, config, context.data)
  },
  list(application: DataBoundApplication, config: ListConfig<any>, context: Context) {
    const contexts = Convert(config, context, context.data) as ComponentContext;
    const list = GetComponent('list', config?.component || 'multi')(application, config, contexts);
    return list;
  }
}

// type ComponentProps = { config: ControlStructure } & ({ parent: Context, bind?: string } | { context: Context });
// const props = defineProps<ComponentProps>();
// const context = (props as any)?.context || (props as any).parent.fork(props.config, props);


// <template>
//   <ConditionalRender :context="context">
//     <div :id="props.config.id" :class="props.config.class" data-renderer>
//       <ComponentRender :config="config" :context="context" />
//     </div>
//   </ConditionalRender>
// </template>

export function Render(application: DataBoundApplication, config: ControlStructure, context: Context): DOMNodeLike {
  const subcontext = config.bind ? context.fork(config, { bind: config.bind }) : context;
  if (ShouldRender(subcontext)) {
    const div = application.createNode('div', { id: config.id, class: config.class, 'data-renderer': '' });
    console.log(config);
    div.appendChild(ComponentType[config.type](application, config, subcontext))
    return div;
  } else {
    return document.createComment('') as unknown as DOMNodeLike;
  }
}

export function ShouldRender(context: Context) {
  return !context.state.hide;
}

function Convert(config: ListConfig<any>, context: Context, data: any): ComponentContext {
  if (Array.isArray(data)) {
    return data.map((_, i) => ConvertToComponentContext(config, context, i.toString()));
  }
  if (typeof data == 'object') {
    return Object.keys(data).map((v) => ConvertToComponentContext(config, context, v));
  }
  return [];
}

function ConvertToComponentContext(config: ListConfig<any>, context: Context, bind: string) {
  return { label: bind, context: context.fork(config.layout, { bind }), bind }
}
