// Generated automatically by Grammar-Well, version unknown 
// https://github.com/0x6563/grammar-well

function GWLanguage(){
    
    return {
        grammar: {
            start: "xml",
            rules: {
                xml: [
                    { name: "xml", symbols: [ "node" ], postprocess: ({data}) => { return { nodes: data[0] ?[data[0]]:[] }; } },
                    { name: "xml", symbols: [ "xml", "_", "node" ], postprocess: ({data}) => { return { nodes: data[2] ? data[0].nodes.concat(data[2]): data[0].nodes }; } }
                ],
                node: [
                    { name: "node", symbols: [ "element" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "node", symbols: [ "text" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "node", symbols: [ "comment" ], postprocess: ({data}) => { return null; } },
                    { name: "node", symbols: [ "script" ], postprocess: ({data}) => { return data[0]; } }
                ],
                text: [
                    { name: "text", symbols: [ { token: "text" } ], postprocess: ({data}) => { return { text: data[0].value }; } }
                ],
                comment: [
                    { name: "comment", symbols: [ { token: "lcomment" }, { token: "text" }, { token: "rcomment" } ], postprocess: ({data}) => { return null; } }
                ],
                element: [
                    { name: "element", symbols: [ "elementOpen", "_", { literal: ">" }, "_", "xml", "_", "elementClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: data[4].nodes}; } },
                    { name: "element", symbols: [ "elementOpen", "_", { literal: "/" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes, nodes:[] }; } },
                    { name: "element", symbols: [ "elementOpen", "_", { literal: ">" }, "_", "elementClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [] }; } }
                ],
                elementOpen: [
                    { name: "elementOpen", symbols: [ { literal: "<" }, { token: "word" }, "__", "attributes" ], postprocess: ({data}) => { return { tag: data[1].value, attributes: data[3] }; } },
                    { name: "elementOpen", symbols: [ { literal: "<" }, { token: "word" } ], postprocess: ({data}) => { return { tag: data[1].value, attributes: [] }; } }
                ],
                elementClose: [
                    { name: "elementClose", symbols: [ { literal: "<" }, { literal: "/" }, { token: "word" }, { literal: ">" } ] }
                ],
                script: [
                    { name: "script", symbols: [ "scriptOpen", "_", { literal: ">" }, "_", "text", "_", "scriptClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [data[4]]}; } },
                    { name: "script", symbols: [ "scriptOpen", "_", { literal: "/" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes, nodes:[] }; } },
                    { name: "script", symbols: [ "scriptOpen", "_", { literal: ">" }, "_", "scriptClose" ], postprocess: ({data}) => { return { tag: data[0].tag, attributes: data[0].attributes , nodes: [] }; } }
                ],
                scriptOpen: [
                    { name: "scriptOpen", symbols: [ { literal: "<" }, { literal: "script" }, "__", "attributes" ], postprocess: ({data}) => { return { tag: data[1].value, attributes: data[3] }; } },
                    { name: "scriptOpen", symbols: [ { literal: "<" }, { literal: "script" } ], postprocess: ({data}) => { return { tag: data[1].value, attributes: [] }; } }
                ],
                scriptClose: [
                    { name: "scriptClose", symbols: [ { literal: "</script>" } ] }
                ],
                attributes: [
                    { name: "attributes", symbols: [ "kv" ], postprocess: ({data}) => { return { [data[0].key]: data[0].value }; } },
                    { name: "attributes", symbols: [ "attributes", "_", "kv" ], postprocess: ({data}) => { return { ...data[0] ,[data[2].key]: data[2].value }; } }
                ],
                kv: [
                    { name: "kv", symbols: [ { token: "word" }, { literal: "=" }, "json" ], postprocess: ({data}) => { return { key: data[0].value, value: data[2] }; } },
                    { name: "kv", symbols: [ { token: "word" } ], postprocess: ({data}) => { return { key:data[0].value , value: '' }; } }
                ],
                json: [
                    { name: "json", symbols: [ "object" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "json", symbols: [ "array" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "json", symbols: [ "quoted" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "json", symbols: [ "number" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "json", symbols: [ { literal: "true" } ], postprocess: ({data}) => { return true; } },
                    { name: "json", symbols: [ { literal: "false" } ], postprocess: ({data}) => { return false; } },
                    { name: "json", symbols: [ { literal: "null" } ], postprocess: ({data}) => { return null; } }
                ],
                quoted: [
                    { name: "quoted", symbols: [ { token: "dquote" }, { token: "dquote" } ], postprocess: ({data}) => { return ""; } },
                    { name: "quoted", symbols: [ { token: "dquote" }, "string", { token: "dquote" } ], postprocess: ({data}) => { return data[1]; } }
                ],
                string: [
                    { name: "string", symbols: [ { token: "escaped" } ], postprocess: ({data}) => { return data[0].value; } },
                    { name: "string", symbols: [ { token: "string" } ], postprocess: ({data}) => { return data[0].value; } },
                    { name: "string", symbols: [ "string", { token: "escaped" } ], postprocess: ({data}) => { return data[0] + data[1].value; } },
                    { name: "string", symbols: [ "string", { token: "string" } ], postprocess: ({data}) => { return data[0] + data[1].value; } }
                ],
                object: [
                    { name: "object", symbols: [ { literal: "{" }, "_", { literal: "}" } ], postprocess: ({data}) => { return {}; } },
                    { name: "object", symbols: [ { literal: "{" }, "_", "json_pair", "_", { literal: "}" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                array: [
                    { name: "array", symbols: [ { literal: "[" }, "_", { literal: "]" } ], postprocess: ({data}) => { return []; } },
                    { name: "array", symbols: [ { literal: "[" }, "_", "json_list", "_", { literal: "]" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                json_list: [
                    { name: "json_list", symbols: [ "json" ], postprocess: ({data}) => { return [ data[0] ]; } },
                    { name: "json_list", symbols: [ "json_list", "_", { literal: "," }, "_", "json" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                json_pair: [
                    { name: "json_pair", symbols: [ "pair" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "json_pair", symbols: [ "json_pair", "_", { literal: "," }, "_", "pair" ], postprocess: ({data}) => { return { ...data[0], ...data[4] }; } }
                ],
                pair: [
                    { name: "pair", symbols: [ "quoted", "_", { literal: ":" }, "_", "json" ], postprocess: ({data}) => { return { [data[0]]: data[4] }; } }
                ],
                number: [
                    { name: "number", symbols: [ { token: "number" } ], postprocess: ({data}) => { return Number(data[0].value); } }
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
                        { when: /</, tag: ["lbracket"], highlight: "tag", goto: "tagName" },
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
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "tag" },
                        { when: /\s+/, tag: ["space"] },
                        { when: "=", tag: ["="] },
                        { when: ">", tag: ["rbracket"], pop: 1, highlight: "tag" },
                        { when: "/", tag: ["slash"] },
                        { import: ["json"] }
                    ]
                },
                scriptAttr: {
                    name: "scriptAttr",
                    rules: [
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "tag" },
                        { when: /\s+/, tag: ["space"] },
                        { when: "=", tag: ["="] },
                        { when: ">", tag: ["rbracket"], highlight: "tag", set: "scriptClose" },
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
                        { when: /"/, tag: ["dquote"], highlight: "string", goto: "string1" },
                        { when: "{", tag: ["{"], goto: "json" },
                        { when: "}", tag: ["}"], pop: 1 },
                        { when: "[", tag: ["["], goto: "json" },
                        { when: "]", tag: ["]"], pop: 1 },
                        { when: ",", tag: [","] },
                        { when: ":", tag: [":"] },
                        { when: "true", tag: ["true"], highlight: "keyword" },
                        { when: "false", tag: ["false"], highlight: "keyword" },
                        { when: "null", tag: ["null"], highlight: "keyword" }
                    ]
                },
                string1: {
                    name: "string1",
                    rules: [
                        { when: /\\./, tag: ["escaped"], highlight: "string" },
                        { when: "\"", tag: ["dquote"], pop: 1, highlight: "string" },
                        { when: /[^\\"]/, tag: ["string"], highlight: "string" }
                    ]
                }
            }
        }
    }
}

export default GWLanguage;