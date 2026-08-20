import * as esbuild from 'esbuild';
import { copyFileSync } from 'node:fs';

const entryPoints = ['./src/custom-elements/script-bound.ce.ts'];
const target = 'esnext';

await esbuild.build({
    entryPoints,
    bundle: true,
    minify: true,
    target,
    format: 'iife',
    outfile: './dist/script-bound.js',
});

await esbuild.build({
    entryPoints,
    bundle: true,
    target,
    format: 'esm',
    external: ['moderate-code-interpreter', 'object-mutation-observer', 'grammar-well'],
    outfile: './dist/script-bound.esm.js',
});

copyFileSync('./src/custom-elements/script-bound.d.ts', './dist/script-bound.esm.d.ts');