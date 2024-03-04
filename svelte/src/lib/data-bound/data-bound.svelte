<svelte:options
	customElement={{
		tag: 'custom-element',
		shadow: 'none',
		props: {
			name: { reflect: true, type: 'Number', attribute: 'element-index' }
		},
		extend: (customElementConstructor) => {
			// Extend the class so we can let it participate in HTML forms
			return class extends customElementConstructor {
				static formAssociated = true;

				constructor() {
					super();
					this.attachedInternals = this.attachInternals();
				} 
			};
		}
	}}
/>

<script lang="ts">
  import { createEventDispatcher, onMount } from 'svelte';
  import Renderer from './renderer.svelte';
  import type { DataBoundConfig } from './lib/types';
  import { Context } from './lib/context';
  import { DataBoundApplication } from './lib/application';
  export let config: DataBoundConfig;
  export let data: any;
  let context;
  const dispatch = createEventDispatcher();

  onMount(() => {
    const application = new DataBoundApplication(config, data);
    context = new Context({ data: application.data, application });
    application.observer.watch(application.data, () => {
      dispatch('change', application.data);
    });
  });
</script>

<div class="data-bound">
  {#if context}
    <Renderer config={config.layouts.main} {context} />
  {/if}
</div>

<style lang="scss">
  :global([data-layout]) {
    margin: 0;
    padding: 0;
    width: 100%;
    box-sizing: border-box;
  }
  :global([data-direction]:not([data-direction=''])) {
    display: flex;
    margin: 0;
    padding: 0;
    & > * {
      flex: 1 1 auto;
    }
  }

  :global([data-direction='left-right']) {
    flex-direction: row;
  }

  :global([data-direction='right-left']) {
    flex-direction: row-reverse;
  }

  :global([data-direction='top-bottom']) {
    flex-direction: column;
  }

  :global([data-direction='bottom-top']) {
    flex-direction: column-reverse;
  }

  :global([data-wrap='wrap']) {
    flex-wrap: wrap;
  }
  :global([data-wrap='nowrap']) {
    flex-wrap: nowrap;
  }

  :global([data-wrap='wrap-reverse']) {
    flex-wrap: wrap-reverse;
  }
</style>
