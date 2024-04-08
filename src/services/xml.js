// Generated automatically by Grammar-Well, version unknown 
// https://github.com/0x6563/grammar-well

function GWLanguage(){
    
    return {
        grammar: {
            start: "XMLPlus",
            rules: {
                XMLPlus: [
                    { name: "XMLPlus", symbols: [ "Node" ], postprocess: ({data}) => { return { nodes: data[0] ?[data[0]]:[] }; } },
                    { name: "XMLPlus", symbols: [ "XMLPlus", "_", "Node" ], postprocess: ({data}) => { return { nodes: data[2] ? data[0].nodes.concat(data[2]): data[0].nodes }; } }
                ],
                Node: [
                    { name: "Node", symbols: [ "Element" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Node", symbols: [ "Text" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Node", symbols: [ "Comment" ], postprocess: ({data}) => { return null; } },
                    { name: "Node", symbols: [ "Script" ], postprocess: ({data}) => { return data[0]; } }
                ],
                Text: [
                    { name: "Text", symbols: [ { token: "text" } ], postprocess: ({data}) => { return { text: data[0].value }; } }
                ],
                Comment: [
                    { name: "Comment", symbols: [ { token: "lcomment" }, { token: "text" }, { token: "rcomment" } ], postprocess: ({data}) => { return null; } }
                ],
                Element: [
                    { name: "Element", symbols: [ "ElementOpen", "_", { literal: ">" }, "_", "XMLPlus", "_", "ElementClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: data[4].nodes}; } },
                    { name: "Element", symbols: [ "ElementOpen", "_", { literal: "/" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes, nodes:[] }; } },
                    { name: "Element", symbols: [ "ElementOpen", "_", { literal: ">" }, "_", "ElementClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [] }; } }
                ],
                ElementOpen: [
                    { name: "ElementOpen", symbols: [ { literal: "<" }, { token: "word" }, "__", "XMLPlusAttributes" ], postprocess: ({data}) => { return { tag: data[1].value, attributes: data[3] }; } },
                    { name: "ElementOpen", symbols: [ { literal: "<" }, { token: "word" } ], postprocess: ({data}) => { return { tag: data[1].value, attributes: [] }; } }
                ],
                ElementClose: [
                    { name: "ElementClose", symbols: [ { literal: "<" }, { literal: "/" }, { token: "word" }, { literal: ">" } ] }
                ],
                Script: [
                    { name: "Script", symbols: [ "ScriptOpen", "_", { literal: ">" }, "_", "Text", "_", "ScriptClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [data[4]]}; } },
                    { name: "Script", symbols: [ "ScriptOpen", "_", { literal: "/" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes, nodes:[] }; } },
                    { name: "Script", symbols: [ "ScriptOpen", "_", { literal: ">" }, "_", "ScriptClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [] }; } }
                ],
                ScriptOpen: [
                    { name: "ScriptOpen", symbols: [ { literal: "<" }, { literal: "script" }, "__", "XMLPlusAttributes" ], postprocess: ({data}) => { return { tag: data[1].value, attributes: data[3] }; } },
                    { name: "ScriptOpen", symbols: [ { literal: "<" }, { literal: "script" } ], postprocess: ({data}) => { return { tag: data[1].value, attributes: [] }; } }
                ],
                ScriptClose: [
                    { name: "ScriptClose", symbols: [ { literal: "</script>" } ] }
                ],
                XMLPlusAttributes: [
                    { name: "XMLPlusAttributes", symbols: [ "XMLPlusAttr" ], postprocess: ({data}) => { return { [data[0].key]: data[0].value }; } },
                    { name: "XMLPlusAttributes", symbols: [ "XMLPlusAttributes", "_", "XMLPlusAttr" ], postprocess: ({data}) => { return { ...data[0] ,[data[2].key]: data[2].value }; } }
                ],
                XMLPlusAttr: [
                    { name: "XMLPlusAttr", symbols: [ { token: "word" }, { literal: "=" }, "Json" ], postprocess: ({data}) => { return { key: data[0].value, value: data[2] }; } },
                    { name: "XMLPlusAttr", symbols: [ { token: "word" } ], postprocess: ({data}) => { return { key:data[0].value , value: '' }; } }
                ],
                Json: [
                    { name: "Json", symbols: [ "Object" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Json", symbols: [ "Array" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Json", symbols: [ "String" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Json", symbols: [ "Number" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Json", symbols: [ { literal: "true" } ], postprocess: ({data}) => { return true; } },
                    { name: "Json", symbols: [ { literal: "false" } ], postprocess: ({data}) => { return false; } },
                    { name: "Json", symbols: [ { literal: "null" } ], postprocess: ({data}) => { return null; } }
                ],
                String: [
                    { name: "String", symbols: [ { token: "dquote" }, { token: "dquote" } ], postprocess: ({data}) => { return ""; } },
                    { name: "String", symbols: [ { token: "dquote" }, "StringInner", { token: "dquote" } ], postprocess: ({data}) => { return data[1]; } }
                ],
                StringInner: [
                    { name: "StringInner", symbols: [ "StringEscape" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "StringInner", symbols: [ { token: "string" } ], postprocess: ({data}) => { return data[0].value; } },
                    { name: "StringInner", symbols: [ "StringInner", "StringEscape" ], postprocess: ({data}) => { return data[0] + data[1]; } },
                    { name: "StringInner", symbols: [ "StringInner", { token: "string" } ], postprocess: ({data}) => { return data[0] + data[1].value; } }
                ],
                StringEscape: [
                    { name: "StringEscape", symbols: [ { token: "escaped" } ], postprocess: ({data}) => { return JSON.parse('"' +data[0].value + '"'); } },
                    { name: "StringEscape", symbols: [ { token: "quoteEscape" } ], postprocess: ({data}) => { return data[0].value[1]; } }
                ],
                Object: [
                    { name: "Object", symbols: [ { literal: "{" }, "_", { literal: "}" } ], postprocess: ({data}) => { return {}; } },
                    { name: "Object", symbols: [ { literal: "{" }, "_", "JsonAttributes", "_", { literal: "}" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                Array: [
                    { name: "Array", symbols: [ { literal: "[" }, "_", { literal: "]" } ], postprocess: ({data}) => { return []; } },
                    { name: "Array", symbols: [ { literal: "[" }, "_", "Json_list", "_", { literal: "]" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                Json_list: [
                    { name: "Json_list", symbols: [ "Json" ], postprocess: ({data}) => { return [ data[0] ]; } },
                    { name: "Json_list", symbols: [ "Json_list", "_", { literal: "," }, "_", "Json" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                JsonAttributes: [
                    { name: "JsonAttributes", symbols: [ "JsonAttr" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JsonAttributes", symbols: [ "JsonAttributes", "_", { literal: "," }, "_", "JsonAttr" ], postprocess: ({data}) => { return { ...data[0], ...data[4] }; } }
                ],
                JsonAttr: [
                    { name: "JsonAttr", symbols: [ "String", "_", { literal: ":" }, "_", "Json" ], postprocess: ({data}) => { return { [data[0]]: data[4] }; } }
                ],
                Number: [
                    { name: "Number", symbols: [ { token: "number" } ], postprocess: ({data}) => { return Number(data[0].value); } }
                ],
                _$RPT01x1: [
                    { name: "_$RPT01x1", symbols: [ { token: "space" } ], postprocess: ({data}) => data[0] },
                    { name: "_$RPT01x1", symbols: [ ], postprocess: () => null }
                ],
                _: [
                    { name: "_", symbols: [ "_$RPT01x1" ] }
                ],
                __: [
                    { name: "__", symbols: [ { token: "space" } ] }
                ]
            }
        },
        lexer: {
            start: "root",
            states: {
                root: {
                    name: "root",
                    rules: [
                        { import: ["commentL"] },
                        { when: /</, tag: ["lbracket"], goto: "tagName" },
                        { when: /[^<]+/, tag: ["text"] }
                    ]
                },
                tagName: {
                    name: "tagName",
                    rules: [
                        { when: /script[a-z_A-Z\d\-:!]+/, tag: ["word"], highlight: "tag", set: "tagAttr" },
                        { when: /script(?!:[a-z])/, tag: ["word"], highlight: "tag", set: "scriptAttr" },
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "tag", set: "tagAttr" },
                        { when: "/", tag: ["slash"] }
                    ]
                },
                tagAttr: {
                    name: "tagAttr",
                    rules: [
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "attribute.name" },
                        { when: /\s+/, tag: ["space"] },
                        { when: "=", tag: ["="] },
                        { when: ">", tag: ["rbracket"], pop: 1 },
                        { when: "/", tag: ["slash"] },
                        { import: ["json"] }
                    ]
                },
                scriptAttr: {
                    name: "scriptAttr",
                    rules: [
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "attribute.name" },
                        { when: /\s+/, tag: ["space"] },
                        { when: "=", tag: ["="] },
                        { when: ">", tag: ["rbracket"], set: "scriptClose" },
                        { when: "/", tag: ["slash"] },
                        { import: ["json"] }
                    ]
                },
                scriptClose: {
                    name: "scriptClose",
                    unmatched: "text",
                    rules: [
                        { when: "</script>", tag: ["close"], pop: 1, highlight: "tag" }
                    ]
                },
                commentL: {
                    name: "commentL",
                    rules: [
                        { when: "<!--", tag: ["lcomment"], goto: "commentR" }
                    ]
                },
                commentR: {
                    name: "commentR",
                    unmatched: "text",
                    rules: [
                        { when: "-->", tag: ["rcomment"], pop: 1 }
                    ]
                },
                json: {
                    name: "json",
                    rules: [
                        { when: /\s+/, tag: ["space"] },
                        { when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/, tag: ["number"], highlight: "number" },
                        { when: /"/, tag: ["dquote"], highlight: "attribute.value", goto: "json_string" },
                        { when: "{", tag: ["{"], goto: "json" },
                        { when: "}", tag: ["}"], pop: 1 },
                        { when: "[", tag: ["["], highlight: "delimiter", goto: "json" },
                        { when: "]", tag: ["]"], pop: 1 },
                        { when: ",", tag: [","] },
                        { when: ":", tag: [":"] },
                        { when: "true", tag: ["true"], highlight: "keyword" },
                        { when: "false", tag: ["false"], highlight: "keyword" },
                        { when: "null", tag: ["null"], highlight: "keyword" }
                    ]
                },
                json_string: {
                    name: "json_string",
                    rules: [
                        { when: /\\[\/bnrft]/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\"/, tag: ["quoteEscape"] },
                        { when: /\\u[A-Fa-f\d]{4}/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\./, tag: ["badEscape"] },
                        { when: /[^"\\]+/, tag: ["string"], highlight: "string" },
                        { when: "\"", tag: ["dquote"], pop: 1, highlight: "string" }
                    ]
                }
            }
        }
    }
}

export default GWLanguage;