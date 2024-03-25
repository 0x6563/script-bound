<script lang="ts" setup>
import { cssWorker, htmlWorker, tsWorker, editorWorker, jsonWorker } from '../services/workers';
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { editor } from 'monaco-editor';

interface ComponentProps {
    value: string | any;
    language: string;
    minHeight: number;
    maxHeight: number;
    minWidth: number;
    maxWidth: number;
    theme: string;
    width: 'fill' | 'auto';
    height: 'fill' | 'auto';
    settings: editor.IStandaloneEditorConstructionOptions;
}
const props = withDefaults(
    defineProps<ComponentProps>(),
    {
        value: '',
        language: 'json',
        minHeight: 200,
        maxHeight: 0,
        minWidth: 600,
        maxWidth: 0,
        theme: 'vs-light',
        width: 'fill',
        height: 'fill',
        settings: {},
    } as any
) as unknown as ComponentProps;
const emit = defineEmits<{ edit: [string], load: [{ resize: () => void }] }>()
const container = ref<HTMLDivElement>();
let codeEditor: editor.IStandaloneCodeEditor;
// let Monaco: any;

watch(props, () => {
    if (typeof props.value != 'string') {
        props.value = JSON.stringify(props.value, null, 2);
    }
    if (codeEditor && props.value != codeEditor.getValue()) {
        codeEditor.setValue(props.value);
        resize();
    }
    if (codeEditor && editor) {
        editor.setTheme(props.theme);
    }
})

onMounted(() => {
    if (container.value) {
        container.value.style.height = '100%';
        container.value.style.width = '100%';
        container.value.style.position = 'relative';
        // Monaco = await import('monaco-editor');
        if (!window.MonacoEnvironment) {
            (window as any).MonacoEnvironment = {
                getWorker(_: any, label: any) {
                    if (label === 'json') {
                        return new jsonWorker();
                    }
                    if (label === 'css' || label === 'scss' || label === 'less') {
                        return new cssWorker();
                    }
                    if (label === 'html' || label === 'handlebars' || label === 'razor') {
                        return new htmlWorker();
                    }
                    if (label === 'typescript' || label === 'javascript') {
                        return new tsWorker();
                    }
                    return new editorWorker();
                },
            }
        }

        codeEditor = editor.create(container.value, {
            value: typeof props.value == 'string' ? props.value : JSON.stringify(props.value, null, 2),
            language: props.language,
            theme: props.theme,
            scrollBeyondLastLine: false,
            automaticLayout: true,
            ...props.settings,
        });

        resize();
        codeEditor?.getModel()?.onDidChangeContent(() => {
            const val = codeEditor?.getValue() as string;
            props.value = val;
            resize();
            emit('edit', val);
        });
        emit('load', { resize });
    }
});

onUnmounted(() => {
    if (codeEditor) {
        codeEditor.dispose();
        const model = codeEditor.getModel();
        if (model)
            model.dispose();
    }
});

function resize() {
    if (container.value && codeEditor) {
        container.value.style.display = 'block';
        container.value.style.width = '100%';
        container.value.style.height = '100%';

        let targetWidth = container.value.offsetWidth;
        let targetHeight = container.value.offsetHeight;

        if (props.width == 'auto') {
            targetWidth = codeEditor.getContentWidth();
        }

        if (props.height == 'auto') {
            targetHeight = codeEditor.getContentHeight();
        }

        const newWidth = Math.max(props.minWidth, Math.min(props.maxWidth || targetWidth, targetWidth));
        const newHeight = Math.max(props.minHeight, Math.min(props.maxHeight || targetHeight, targetHeight));

        codeEditor.layout({ width: newWidth, height: newHeight });
        container.value.style.height = `${newHeight}px`;
        container.value.style.width = `${newWidth}px`;
    }
}
</script>

<template>
    <div ref=container class="editor" />
</template>