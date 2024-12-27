# Data Bound
# Notes

### Directives
Directives are cascading that drive component behavior 
- hide
- lock

### Events

- change (Not to be confused with data changes that are monitored actively)


### Elements

| type      | data | layouts | events | directives |
| --------- | ---- | ------- | ------ | ---------- |
| workspace | many | many    | no     | no         |
| container | one  | many    | no     | yes        |
| list      | many | one     | no     | yes        |
| output    | one  | one     | no     | yes        |
| input     | one  | one     | yes    | yes        |
 
### Sample

```
<layouts>
    <layout id="main">
        <container flow="top-bottom">
            <container flow="left-right" bind="$.personal">
                <output type="html" bind="@path" />
                <output type="html">
                    <b>Bold Text</b> Regular Text
                </output>
                <output type="html" bind="$root.html" />
            </container>
            <container flow="left-right" bind="$.personal">
                <input type="text" bind="$.firstName" label="First Name" />
                <input type="text" bind="$.firstName" label="First Name" hide=($ == "Jane")/>
                <input type="text" bind="$.lastName" label="Last Name" />
            </container>
            <container flow="top-bottom">
                <input type="text" bind="$.personal.address" label="Address" />
            </container>
            <container flow="left-right">
                <input type="text" bind="$.personal.city" label="City" />
                <input type="text" bind="$.personal.state" label="State" />
                <input type="text" bind="$.personal.zip" label="Zip" />
            </container>
            <list type="tabs" side="left" bind="$.contact">
                <container hide="isHome">
                    <output type="html" bind="@path" />
                    <input type="text" bind="$.type" />
                    <input type="text" bind="$.phoneNumber" />
                </container>
            </list>
        </container>
    </layout>
</layouts>
<scripts>
    <script id="isHome"> $.type == "home" </script>
</scripts>
<style>
    input {
        color: red;
        border: none;
        border-bottom: 2px solid black;
        font-size: 14px;

    }
    input + *{
        position: relative;
        transition: all 200ms;
        font-size: 14px;
        top: 2px;
        left: 0px;
        height: 12px;
        pointer-events:none;
    }
    input:not(:focus):placeholder-shown + * {
        font-size: 14px;
        top: -24px;
        left: 6px;
    }

    input:focus {
        outline: none;
        border-bottom: 2px solid blue;
    }

    [data-renderer] {
        border: solid 1px #bbb;
        padding: 8px !important;
    }
</style>
```

 Copyright 2024 Eduardo Covarrubias. All rights reserved.
