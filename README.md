# Script Bound

**Beta / experimental.** Syntax, tag names, and the component API are all still
settling and may change without notice.

A reactive DOM framework driven by XML-like templates, with expressions and scripts
evaluated by [moderate-code-interpreter](https://github.com/0x6563/moderate-code-interpreter).
It ships as `<script-bound>`, a native custom element with no framework dependency of
its own - the Vue app in this repo (`npm run dev`) is just a demo/editor built around it.

## Usage

As a plain custom element (data/source are set as JS properties, not string attributes):

```html
<script src="script-bound.js"></script>
<script-bound></script-bound>
<script>
  const el = document.querySelector('script-bound');
  el.data = { /* ... */ };
  el.source = xmlSource; // raw template text - parsing happens internally
</script>
```

Or from an npm/bundler project:

```ts
import '<pkg>/script-bound.esm.js';
```

`data` is the raw JS object the template reads/writes. `source` is the template
as a string - the element parses it itself (via a bundled copy of the grammar)
and re-renders. `config` is exposed read-only as the parsed
`{ layout, events, style }` result, if you need to inspect it. Setting `data` or
`source` (even after the element is connected) re-renders it.

## Template syntax basics

- `$` always refers to the current scope's data. `$root`/`$parent` reach outward.
- `<($.foo)>` interpolates an expression into text.
- `<script event="...">...</script>` inside a component runs on that event (e.g. a
  button's `action` on click).
- `$=(...)` narrows scope for a component and its children to the result of an
  expression - it does not, on its own, make anything writable.
- `attr&=(...)` (e.g. `value&=($.firstName)`) marks a specific attribute as
  two-way bound: changes to the underlying control assign back into that expression.
  This is independent of `$` - an element doesn't need its own `$=` to have a
  writable attribute.
- `<for (...)>` iterates an array or object, reactively.
- `<if (...)>` conditionally renders its children, reactively.
- Components can register their own child tags (e.g. `<select>` registers a local
  `<option>`) without polluting the global tag registry.

Built-in tags: `flow`, `input`/`textbox`/`text`, `checkbox`, `button`, `select`/`option`,
`for`, `if`, `tabs`, `single`, plus plain HTML tags.

## Example

```xml
<div class="wrapper">
    <flow settings={"direction":"left-right"} $=($.personal)>
        <input type="text" value&=($.firstName) settings={ "label": "First Name" }/>
        <input type="text" value&=($.lastName) settings={ "label": "Last Name" } />
    </flow>
    <h1>Hello <($.personal.firstName)><if ($.personal.lastName)><span><( $.personal.lastName )></span></if>!</h1>
    <button class="click">
        <script event="click">
            $.counter = $.counter + 1;
        </script>
        Click this button
    </button>
    <h4>You've clicked that button <($.counter)> times!</h4>

    <for ($.dependencies)>
        <a href=($root.giturl .. $.slug)><($.name)></a>
    </for>
</div>
<style>
    .wrapper { padding: 24px; }
</style>
```

See `src/samples/sample.xml` and `src/samples/data.json` for a fuller, running example
(open the demo via `npm run dev`).

## Building

- `npm run dev` / `npm run build` - the demo/editor app (Vue, for local development only).
- `npm run build:standalone` - builds `dist-standalone/script-bound.js` (IIFE, every
  dependency inlined - drop it in a plain `<script>` tag) and
  `dist-standalone/script-bound.esm.js` (ESM, third-party dependencies left external
  for a consuming bundler to resolve).

Copyright 2026 Eduardo Covarrubias. All rights reserved.
