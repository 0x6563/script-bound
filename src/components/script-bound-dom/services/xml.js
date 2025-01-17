// Generated automatically by Grammar-Well, version unknown 
// https://github.com/0x6563/grammar-well


export const TYPES = {
        Operation: 'operation',
        Default: 'default',
        Logical: 'logical',
        Assignment: 'assignment',
        Declare: 'declare',
        Control: 'control',
        Conditional: 'conditional',
        Loop: 'loop',
        Literal: 'literal',
        Array: 'array',
        Object: 'object',
        Lambda: 'lambda',
        Reference: 'reference',
        Query: 'query',
        Run: 'run',
        Call: 'call',
        Match: 'match',
        Spread: 'spread',
        Cluster: 'cluster',
        Constant: 'constant',
        Wildcard: 'wildcard',
        Yield: 'yield',
        Word: 'word'
    }

function extractPair(kv, output) {
        if(kv[0]) { output[kv[0]] = kv[1]; }
    }

    function extractObject({data}) {
        let output = {};

        extractPair(data[2], output);

        for (let i in data[3]) {
            extractPair(data[3][i][3], output);
        }

        return output;
    }

    function extractArray({data}) {
        let output = [data[2]];

        for (let i in data[3]) {
            output.push(data[3][i][3]);
        }

        return output;
    }


class grammar {
    artifacts = {
        grammar: {
            rules: {
                Array: [
                    { name: "Array", postprocess: ({data}) => { return ([]); }, symbols: [ { literal: "[" }, "_", { literal: "]" } ] },
                    { name: "Array", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "[" }, "_", "JSON_list", "_", { literal: "]" } ] }
                ],
                Element: [
                    { name: "Element", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes , nodes: data[5].nodes}); }, symbols: [ { literal: "<" }, "ElementHead", "_", { literal: ">" }, "_", "XMLPlus", "_", { literal: "</" }, { token: "word" }, { literal: ">" } ] },
                    { name: "Element", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes, nodes:[] }); }, symbols: [ { literal: "<" }, "ElementHead", "_", { literal: "/>" } ] },
                    { name: "Element", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes , nodes: [] }); }, symbols: [ { literal: "<" }, "ElementHead", "_", { literal: ">" }, "_", { literal: "</" }, { token: "word" }, { literal: ">" } ] }
                ],
                ElementHead: [
                    { name: "ElementHead", postprocess: ({data}) => { return ({ tag: data[0].value, attributes: data[2] }); }, symbols: [ { token: "word" }, "__", "XMLPlusAttributes" ] },
                    { name: "ElementHead", postprocess: ({data}) => { return ({ tag: data[0].value, attributes: [] }); }, symbols: [ { token: "word" } ] }
                ],
                JSON: [
                    { name: "JSON", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Object" ] },
                    { name: "JSON", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Array" ] },
                    { name: "JSON", postprocess: ({data}) => { return (data[0]); }, symbols: [ "String" ] },
                    { name: "JSON", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Number" ] },
                    { name: "JSON", postprocess: ({data}) => { return (true); }, symbols: [ { literal: "true" } ] },
                    { name: "JSON", postprocess: ({data}) => { return (false); }, symbols: [ { literal: "false" } ] },
                    { name: "JSON", postprocess: ({data}) => { return (null); }, symbols: [ { literal: "null" } ] }
                ],
                JSONAttributes: [
                    { name: "JSONAttributes", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSONKV" ] },
                    { name: "JSONAttributes", postprocess: ({data}) => { return ({ ...data[0], ...data[4] }); }, symbols: [ "JSONAttributes", "_", { literal: "," }, "_", "JSONKV" ] }
                ],
                JSONKV: [
                    { name: "JSONKV", postprocess: ({data}) => { return ({ [data[0]]: data[4] }); }, symbols: [ "String", "_", { literal: ":" }, "_", "JSON" ] }
                ],
                JSON__: [
                    { name: "JSON__", postprocess: ({data}) => { return (null); }, symbols: [ "JSON__.RPT01x1" ] }
                ],
                "JSON__.RPT01x1": [
                    { name: "JSON__.RPT01x1", postprocess: ({data}) => data[0], symbols: [ { token: "whitespace" } ] },
                    { name: "JSON__.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                JSON___: [
                    { name: "JSON___", postprocess: ({data}) => { return (null); }, symbols: [ "JSON___.RPT1Nx1" ] }
                ],
                "JSON___.RPT1Nx1": [
                    { name: "JSON___.RPT1Nx1", symbols: [ { token: "whitespace" } ] },
                    { name: "JSON___.RPT1Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "JSON_JSON___.RPT1Nx1", { token: "whitespace" } ] }
                ],
                JSON_array: [
                    { name: "JSON_array", postprocess: ({data}) => { return ([]); }, symbols: [ { literal: "[" }, "JSON__", { literal: "]" } ] },
                    { name: "JSON_array", postprocess: extractArray, symbols: [ { literal: "[" }, "JSON__", "JSON_value", "JSON_array.RPT0Nx1", "JSON__", { literal: "]" } ] }
                ],
                "JSON_array.RPT0Nx1": [
                    { name: "JSON_array.RPT0Nx1", symbols: [ ] },
                    { name: "JSON_array.RPT0Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "JSON_JSON_array.RPT0Nx1", "JSON_array.RPT0Nx1.SUBx1" ] }
                ],
                "JSON_array.RPT0Nx1.SUBx1": [
                    { name: "JSON_array.RPT0Nx1.SUBx1", symbols: [ "JSON__", { literal: "," }, "JSON__", "JSON_value" ] }
                ],
                JSON_json: [
                    { name: "JSON_json", postprocess: ({data}) => { return (data[1][0]); }, symbols: [ "JSON__", "JSON_json.SUBx1", "JSON__" ] }
                ],
                "JSON_json.SUBx1": [
                    { name: "JSON_json.SUBx1", symbols: [ "JSON_object" ] },
                    { name: "JSON_json.SUBx1", symbols: [ "JSON_array" ] }
                ],
                JSON_key: [
                    { name: "JSON_key", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSON_string" ] }
                ],
                JSON_list: [
                    { name: "JSON_list", postprocess: ({data}) => { return ([ data[0] ]); }, symbols: [ "JSON" ] },
                    { name: "JSON_list", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "JSON_list", "_", { literal: "," }, "_", "JSON" ] }
                ],
                JSON_number: [
                    { name: "JSON_number", postprocess: ({data}) => { return (parseFloat(data[0].value)); }, symbols: [ { token: "number" } ] }
                ],
                JSON_object: [
                    { name: "JSON_object", postprocess: ({data}) => { return ({}); }, symbols: [ { literal: "{" }, "JSON__", { literal: "}" } ] },
                    { name: "JSON_object", postprocess: extractObject, symbols: [ { literal: "{" }, "JSON__", "JSON_pair", "JSON_object.RPT0Nx1", "JSON__", { literal: "}" } ] }
                ],
                "JSON_object.RPT0Nx1": [
                    { name: "JSON_object.RPT0Nx1", symbols: [ ] },
                    { name: "JSON_object.RPT0Nx1", postprocess: ({data}) => data[0].concat([data[1]]), symbols: [ "JSON_JSON_object.RPT0Nx1", "JSON_object.RPT0Nx1.SUBx1" ] }
                ],
                "JSON_object.RPT0Nx1.SUBx1": [
                    { name: "JSON_object.RPT0Nx1.SUBx1", symbols: [ "JSON__", { literal: "," }, "JSON__", "JSON_pair" ] }
                ],
                JSON_pair: [
                    { name: "JSON_pair", postprocess: ({data}) => { return ([data[0], data[4]]); }, symbols: [ "JSON_key", "JSON__", { literal: ":" }, "JSON__", "JSON_value" ] }
                ],
                JSON_string: [
                    { name: "JSON_string", postprocess: ({data}) => { return (JSON.parse(data[0].value)); }, symbols: [ { token: "string" } ] }
                ],
                JSON_value: [
                    { name: "JSON_value", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSON_object" ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSON_array" ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSON_number" ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (data[0]); }, symbols: [ "JSON_string" ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (true); }, symbols: [ { literal: "true" } ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (false); }, symbols: [ { literal: "false" } ] },
                    { name: "JSON_value", postprocess: ({data}) => { return (null); }, symbols: [ { literal: "null" } ] }
                ],
                MC_Alias: [
                    { name: "MC_Alias", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Reference" ] },
                    { name: "MC_Alias", postprocess: ({data}) => { return ({ ...data[0], alias: data[4] }); }, symbols: [ "MC_Reference", "MC___", { literal: "as" }, "MC___", "MC_Word" ] },
                    { name: "MC_Alias", postprocess: ({data}) => { return ({ ...data[0], alias: data[2] }); }, symbols: [ "MC_Reference", "MC___", "MC_Word" ] }
                ],
                MC_Alias_list: [
                    { name: "MC_Alias_list", postprocess: ({data}) => { return ([data[0]]); }, symbols: [ "MC_Alias" ] },
                    { name: "MC_Alias_list", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_Alias_list", "MC__", { literal: "," }, "MC__", "MC_Alias" ] }
                ],
                MC_Array: [
                    { name: "MC_Array", postprocess: ({data}) => { return ({ type: TYPES.Array, items: [] }); }, symbols: [ { literal: "[" }, "MC__", { literal: "]" } ] },
                    { name: "MC_Array", postprocess: ({data}) => { return ({ type: TYPES.Array, items: data[2] }); }, symbols: [ { literal: "[" }, "MC__", "MC_Exp_list", "MC__", { literal: "]" } ] }
                ],
                MC_Assignment: [
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: data[4] }); }, symbols: [ "MC_Reference", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[2],  value: data[6] }); }, symbols: [ { literal: "set" }, "MC___", "MC_Reference", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }); }, symbols: [ "MC_Reference", "MC__", { literal: "+=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }); }, symbols: [ "MC_Reference", "MC__", { literal: "-=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }); }, symbols: [ "MC_Reference", "MC__", { literal: "/=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }); }, symbols: [ "MC_Reference", "MC__", { literal: "*=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_Assignment", postprocess: ({data}) => { return ({ type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }); }, symbols: [ "MC_Reference", "MC__", { literal: "%=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] }
                ],
                MC_Atom: [
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Number" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_NegativeNumber" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_String" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Constant" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Regex" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Reference" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Group" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_FunctionCall" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Array" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_VariadicLogic" ] },
                    { name: "MC_Atom", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Match" ] }
                ],
                MC_Block: [
                    { name: "MC_Block", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "{" }, "MC__", "MC_Statements", "MC__", { literal: "}" } ] },
                    { name: "MC_Block", postprocess: ({data}) => { return ([]); }, symbols: [ { literal: "{" }, "MC__", { literal: "}" } ] }
                ],
                MC_Body: [
                    { name: "MC_Body", postprocess: ({data}) => { return ({ statements: data[1]}); }, symbols: [ "MC__", "MC_Statements", "MC__" ] },
                    { name: "MC_Body", postprocess: ({data}) => { return ({ expression: data[1]}); }, symbols: [ "MC__", "MC_Exp", "MC__" ] }
                ],
                MC_ConditionLoop: [
                    { name: "MC_ConditionLoop", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind:'while', condition: data[2], statements: data[4] }); }, symbols: [ { literal: "while" }, "MC__", "MC_Exp", "MC__", "MC_Block" ] },
                    { name: "MC_ConditionLoop", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind:'while', condition: { type: TYPES.Operation, operator: "!", operands: [data[2]] }, statements: data[4] }); }, symbols: [ { literal: "until" }, "MC__", "MC_Exp", "MC__", "MC_Block" ] },
                    { name: "MC_ConditionLoop", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind:'while', condition: data[6], statements: data[2] }); }, symbols: [ { literal: "do" }, "MC__", "MC_Block", "MC___", { literal: "while" }, "MC__", "MC_Exp" ] },
                    { name: "MC_ConditionLoop", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind:'while', condition: { type: TYPES.Operation, operator: "!", operands: [data[6]] }, statements: data[2] }); }, symbols: [ { literal: "do" }, "MC__", "MC_Block", "MC___", { literal: "until" }, "MC__", "MC_Exp" ] }
                ],
                MC_Constant: [
                    { name: "MC_Constant", postprocess: ({data}) => { return ({ type: TYPES.Constant, value: data[0].value }); }, symbols: [ { literal: "null" } ] },
                    { name: "MC_Constant", postprocess: ({data}) => { return ({ type: TYPES.Constant, value: data[0].value }); }, symbols: [ { literal: "false" } ] },
                    { name: "MC_Constant", postprocess: ({data}) => { return ({ type: TYPES.Constant, value: data[0].value }); }, symbols: [ { literal: "true" } ] }
                ],
                MC_DeclareFunction: [
                    { name: "MC_DeclareFunction", postprocess: ({data}) => { return ({ type: TYPES.Declare, kind: 'function', name: data[2], args: data[6], statements: data[10] }); }, symbols: [ { literal: "function" }, "MC__", "MC_Word", "MC__", { literal: "(" }, "MC__", "MC_FunctionArg_list", "MC__", { literal: ")" }, "MC__", "MC_Block" ] },
                    { name: "MC_DeclareFunction", postprocess: ({data}) => { return ({ type: TYPES.Declare, kind: 'function', name: data[2], args: [], statements: data[8] }); }, symbols: [ { literal: "function" }, "MC__", "MC_Word", "MC__", { literal: "(" }, "MC__", { literal: ")" }, "MC__", "MC_Block" ] }
                ],
                MC_DeclareVar: [
                    { name: "MC_DeclareVar", postprocess: ({data}) => { return ({ type: TYPES.Declare, kind: 'var', name: data[2], value: data[6] }); }, symbols: [ { literal: "var" }, "MC___", "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_DeclareVar", postprocess: ({data}) => { return ({ type: TYPES.Declare, kind: 'const', name: data[2], value: data[6] }); }, symbols: [ { literal: "const" }, "MC___", "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] }
                ],
                MC_Exp: [
                    { name: "MC_Exp", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Query" ] },
                    { name: "MC_Exp", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Lambda" ] },
                    { name: "MC_Exp", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpOr" ] },
                    { name: "MC_Exp", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Object" ] }
                ],
                MC_ExpAnd: [
                    { name: "MC_ExpAnd", postprocess: ({data}) => { return ({ type: TYPES.Logical, operator: "all", operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpAnd", "MC__", { literal: "and" }, "MC__", "MC_ExpCompare" ] },
                    { name: "MC_ExpAnd", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpCompare" ] }
                ],
                MC_ExpCompare: [
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "<" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: ">" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "<=" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: ">=" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "!=" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "==" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "like" }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4].low, data[4].high] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "within" }, "MC__", "MC_Range" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4].low, data[4].high] }); }, symbols: [ "MC_ExpCompare", "MC__", { literal: "between" }, "MC__", "MC_Range" ] },
                    { name: "MC_ExpCompare", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpConcat" ] }
                ],
                MC_ExpConcat: [
                    { name: "MC_ExpConcat", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpSum", "MC__", { literal: ".." }, "MC__", "MC_ExpConcat" ] },
                    { name: "MC_ExpConcat", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpSum" ] }
                ],
                MC_ExpOr: [
                    { name: "MC_ExpOr", postprocess: ({data}) => { return ({ type: TYPES.Logical, operator: "any", operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpOr", "MC__", { literal: "or" }, "MC__", "MC_ExpAnd" ] },
                    { name: "MC_ExpOr", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpAnd" ] }
                ],
                MC_ExpPower: [
                    { name: "MC_ExpPower", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_Atom", "MC__", { literal: "^" }, "MC__", "MC_ExpPower" ] },
                    { name: "MC_ExpPower", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Atom" ] }
                ],
                MC_ExpProduct: [
                    { name: "MC_ExpProduct", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpProduct", "MC__", { literal: "*" }, "MC__", "MC_ExpUnary" ] },
                    { name: "MC_ExpProduct", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpProduct", "MC__", { literal: "/" }, "MC__", "MC_ExpUnary" ] },
                    { name: "MC_ExpProduct", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpProduct", "MC__", { literal: "%" }, "MC__", "MC_ExpUnary" ] },
                    { name: "MC_ExpProduct", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpUnary" ] }
                ],
                MC_ExpSum: [
                    { name: "MC_ExpSum", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpSum", "MC__", { literal: "+" }, "MC__", "MC_ExpProduct" ] },
                    { name: "MC_ExpSum", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }); }, symbols: [ "MC_ExpSum", "MC__", { literal: "-" }, "MC__", "MC_ExpProduct" ] },
                    { name: "MC_ExpSum", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpProduct" ] }
                ],
                MC_ExpUnary: [
                    { name: "MC_ExpUnary", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: "!", operands: [data[2]] }); }, symbols: [ { literal: "!" }, "MC__", "MC_ExpPower" ] },
                    { name: "MC_ExpUnary", postprocess: ({data}) => { return ({ type: TYPES.Operation, operator: "!", operands: [data[2]] }); }, symbols: [ { literal: "not" }, "MC__", "MC_ExpPower" ] },
                    { name: "MC_ExpUnary", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ExpPower" ] }
                ],
                MC_Exp_list: [
                    { name: "MC_Exp_list", postprocess: ({data}) => { return ([ data[0] ]); }, symbols: [ "MC_Exp" ] },
                    { name: "MC_Exp_list", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_Exp_list", "MC__", { literal: "," }, "MC__", "MC_Exp" ] }
                ],
                MC_Exp_ss: [
                    { name: "MC_Exp_ss", postprocess: ({data}) => { return ([ data[0] ]); }, symbols: [ "MC_Exp" ] },
                    { name: "MC_Exp_ss", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_Exp_ss", "MC__", { literal: ";" }, "MC__", "MC_Exp" ] }
                ],
                MC_FunctionArg: [
                    { name: "MC_FunctionArg", postprocess: ({data}) => { return ({ name: data[0] }); }, symbols: [ "MC_Word" ] },
                    { name: "MC_FunctionArg", postprocess: ({data}) => { return ({ name: data[0], default: data[4] }); }, symbols: [ "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp" ] }
                ],
                MC_FunctionArg_list: [
                    { name: "MC_FunctionArg_list", postprocess: ({data}) => { return ([data[0]]); }, symbols: [ "MC_FunctionArg" ] },
                    { name: "MC_FunctionArg_list", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_FunctionArg_list", "MC__", { literal: "," }, "MC__", "MC_FunctionArg" ] }
                ],
                MC_FunctionCall: [
                    { name: "MC_FunctionCall", postprocess: ({data}) => { return ({ type: TYPES.Call, name: data[0], args: data[4] }); }, symbols: [ "MC_Word", "MC__", { literal: "(" }, "MC__", "MC_Exp_list", "MC__", { literal: ")" } ] },
                    { name: "MC_FunctionCall", postprocess: ({data}) => { return ({ type: TYPES.Call, name: data[0], args: [] }); }, symbols: [ "MC_Word", "MC__", { literal: "(" }, "MC__", { literal: ")" } ] }
                ],
                MC_Group: [
                    { name: "MC_Group", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "(" }, "MC__", "MC_Exp", "MC__", { literal: ")" } ] }
                ],
                MC_IfBlock: [
                    { name: "MC_IfBlock", postprocess: ({data}) => { return ([{ condition: data[2], statements: data[4] }]); }, symbols: [ { literal: "if" }, "MC__", "MC_Exp", "MC__", "MC_Block" ] },
                    { name: "MC_IfBlock", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_IfBlock", "MC__", { literal: "else" }, "MC__", "MC_IfBlock" ] }
                ],
                MC_KVInIterator: [
                    { name: "MC_KVInIterator", postprocess: ({data}) => { return ({ v: data[0], iterable: data[4] }); }, symbols: [ "MC_Word", "MC___", { literal: "in" }, "MC__", "MC_Exp" ] },
                    { name: "MC_KVInIterator", postprocess: ({data}) => { return ({ k: data[4], v: data[0], iterable: data[8] }); }, symbols: [ "MC_Word", "MC__", { literal: "," }, "MC__", "MC_Word", "MC___", { literal: "in" }, "MC__", "MC_Exp" ] }
                ],
                MC_Lambda: [
                    { name: "MC_Lambda", postprocess: ({data}) => { return ({ type: TYPES.Lambda, arguments: data[2], expression: data[8]  }); }, symbols: [ { literal: "(" }, "MC__", "MC_FunctionArg_list", "MC__", { literal: ")" }, "MC__", { literal: "=>" }, "MC__", "MC_Exp" ] },
                    { name: "MC_Lambda", postprocess: ({data}) => { return ({ type: TYPES.Lambda, arguments: data[2], expression: data[6]  }); }, symbols: [ { literal: "(" }, "MC__", { literal: ")" }, "MC__", { literal: "=>" }, "MC__", "MC_Exp" ] },
                    { name: "MC_Lambda", postprocess: ({data}) => { return ({ type: TYPES.Lambda, arguments: data[2], expression: data[4]  }); }, symbols: [ "MC_Word", "MC__", { literal: "=>" }, "MC__", "MC_Exp" ] }
                ],
                MC_LoopBlock: [
                    { name: "MC_LoopBlock", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind:'for', base: data[4], step: data[10], condition: data[6], statements: data[14] }); }, symbols: [ { literal: "for" }, "MC__", { literal: "(" }, "MC__", "MC_DeclareVar", "MC__", "MC_Exp", "MC__", { literal: ";" }, "MC__", "MC_Assignment", "MC__", { literal: ")" }, "MC__", "MC_Block" ] }
                ],
                MC_Match: [
                    { name: "MC_Match", postprocess: ({data}) => { return ({ type:TYPES.Match, statements: data[4] }); }, symbols: [ { literal: "match" }, "MC__", { literal: "{" }, "MC__", "MC_MatchStatement_list", "MC__", { literal: "}" } ] }
                ],
                MC_MatchStatement: [
                    { name: "MC_MatchStatement", postprocess: ({data}) => { return ({ condition: data[0], value: data[4] }); }, symbols: [ "MC_Exp", "MC__", { literal: ":" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] },
                    { name: "MC_MatchStatement", postprocess: ({data}) => { return ({ type: TYPES.Default , value: data[4] }); }, symbols: [ { literal: "default" }, "MC__", { literal: ":" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] }
                ],
                MC_MatchStatement_list: [
                    { name: "MC_MatchStatement_list", postprocess: ({data}) => { return (data[0].type == TYPES.Default ? ({ default: data[0], conditions: [] }) : ({ conditions: [data[0]] })); }, symbols: [ "MC_MatchStatement" ] },
                    { name: "MC_MatchStatement_list", postprocess: ({data}) => { return ((data[2].type == TYPES.Default ? data[0].default = data[2] : data[0].conditions.push(data[2])) && data[0]); }, symbols: [ "MC_MatchStatement_list", "MC__", "MC_MatchStatement" ] }
                ],
                MC_NegativeNumber: [
                    { name: "MC_NegativeNumber", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'number', value: '-' +data[2].value }); }, symbols: [ { literal: "-" }, "MC__", "MC_Number" ] }
                ],
                MC_Number: [
                    { name: "MC_Number", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'number', value: data[0].value  + "." + data[2].value }); }, symbols: [ { token: "digits" }, { literal: "." }, { token: "digits" } ] },
                    { name: "MC_Number", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'number', value: data[0].value }); }, symbols: [ { token: "digits" } ] }
                ],
                MC_Object: [
                    { name: "MC_Object", postprocess: ({data}) => { return ({ type: TYPES.Object, properties: [] }); }, symbols: [ { literal: "{" }, "MC__", { literal: "}" } ] },
                    { name: "MC_Object", postprocess: ({data}) => { return ({ type: TYPES.Object, properties: data[2] }); }, symbols: [ { literal: "{" }, "MC__", "MC_Prop_list", "MC__", { literal: "}" } ] }
                ],
                MC_Path: [
                    { name: "MC_Path", postprocess: ({data}) => { return ([{ type: TYPES.Word, value: data[0] }]); }, symbols: [ "MC_Word" ] },
                    { name: "MC_Path", postprocess: ({data}) => { return (data[0].concat({ type: TYPES.Word, value: data[4]})); }, symbols: [ "MC_Path", "MC__", { literal: "." }, "MC__", "MC_Word" ] },
                    { name: "MC_Path", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_Path", "MC__", { literal: "[" }, "MC__", "MC_Exp", "MC__", { literal: "]" } ] },
                    { name: "MC_Path", postprocess: ({data}) => { return (data[0].concat({ type: TYPES.Wildcard })); }, symbols: [ "MC_Path", "MC__", { literal: "[" }, "MC__", { literal: "?" }, "MC__", { literal: "]" } ] }
                ],
                MC_Prop: [
                    { name: "MC_Prop", postprocess: ({data}) => { return ({ key: data[0], value: data[4] }); }, symbols: [ "MC_PropName", "MC__", { literal: ":" }, "MC__", "MC_Exp" ] },
                    { name: "MC_Prop", postprocess: ({data}) => { return ({ type: TYPES.Spread, value: data[2] }); }, symbols: [ { literal: "..." }, "MC__", "MC_Exp" ] },
                    { name: "MC_Prop", postprocess: ({data}) => { return ({ key: data[0], value: { type: TYPES.Reference, path: data[0] } }); }, symbols: [ "MC_Word" ] }
                ],
                MC_PropName: [
                    { name: "MC_PropName", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_String" ] },
                    { name: "MC_PropName", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Word" ] }
                ],
                MC_Prop_list: [
                    { name: "MC_Prop_list", postprocess: ({data}) => { return ([data[0]]); }, symbols: [ "MC_Prop" ] },
                    { name: "MC_Prop_list", postprocess: ({data}) => { return (data[0].concat(data[4])); }, symbols: [ "MC_Prop_list", "MC__", { literal: "," }, "MC__", "MC_Prop" ] }
                ],
                MC_QCluster: [
                    { name: "MC_QCluster", postprocess: ({data}) => { return (data[4]); }, symbols: [ { literal: "cluster" }, "MC___", { literal: "(" }, "MC__", "MC_Exp_list", "MC__", { literal: ")" } ] }
                ],
                MC_QFilter: [
                    { name: "MC_QFilter", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "filter" }, "MC___", "MC_Exp" ] }
                ],
                MC_QQuery: [
                    { name: "MC_QQuery", postprocess: ({data}) => { return ({ kind:data[0].value, iterable: data[2] }); }, symbols: [ { literal: "query" }, "MC___", "MC_KVInIterator" ] }
                ],
                MC_QSlice: [
                    { name: "MC_QSlice", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "segment" }, "MC___", "MC_Range" ] }
                ],
                MC_QSort: [
                    { name: "MC_QSort", postprocess: ({data}) => { return ({ expression: data[2], direction: data[3]?.[1].value }); }, symbols: [ { literal: "sort" }, "MC___", "MC_Exp", "MC_QSort.RPT01x1" ] }
                ],
                "MC_QSort.RPT01x1": [
                    { name: "MC_QSort.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "MC_QSort.RPT01x1.SUBx1" ] },
                    { name: "MC_QSort.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "MC_QSort.RPT01x1.SUBx1": [
                    { name: "MC_QSort.RPT01x1.SUBx1", symbols: [ "MC___", { literal: "desc" } ] },
                    { name: "MC_QSort.RPT01x1.SUBx1", symbols: [ { literal: "asc" } ] }
                ],
                MC_QYield: [
                    { name: "MC_QYield", postprocess: ({data}) => { return ({ type: TYPES.Yield, kind: data[0].value, value: data[2] }); }, symbols: [ { literal: "list" }, "MC___", "MC_Exp" ] },
                    { name: "MC_QYield", postprocess: ({data}) => { return ({ type: TYPES.Yield, kind: data[0].value, value: data[2] }); }, symbols: [ { literal: "first" }, "MC___", "MC_Exp" ] },
                    { name: "MC_QYield", postprocess: ({data}) => { return ({ type: TYPES.Yield, kind: data[0].value, value: data[2] }); }, symbols: [ { literal: "aggregate" }, "MC__", "MC_Object" ] },
                    { name: "MC_QYield", postprocess: ({data}) => { return ({ type: TYPES.Yield, kind: data[0].value, value: data[2] }); }, symbols: [ { literal: "aggregate" }, "MC___", "MC_Lambda" ] }
                ],
                MC_Query: [
                    { name: "MC_Query", postprocess: ({data}) => { return ({ type: TYPES.Query,  source: data[0], filter: data[1]?.[1], yield: data[3], cluster: data[4]?.[1], sort: data[5]?.[1],  slice: data[6]?.[1] }); }, symbols: [ "MC_QQuery", "MC_Query.RPT01x1", "MC___", "MC_QYield", "MC_Query.RPT01x2", "MC_Query.RPT01x3", "MC_Query.RPT01x4" ] }
                ],
                "MC_Query.RPT01x1": [
                    { name: "MC_Query.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "MC_Query.RPT01x1.SUBx1" ] },
                    { name: "MC_Query.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "MC_Query.RPT01x1.SUBx1": [
                    { name: "MC_Query.RPT01x1.SUBx1", symbols: [ "MC___", "MC_QFilter" ] }
                ],
                "MC_Query.RPT01x2": [
                    { name: "MC_Query.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "MC_Query.RPT01x2.SUBx1" ] },
                    { name: "MC_Query.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "MC_Query.RPT01x2.SUBx1": [
                    { name: "MC_Query.RPT01x2.SUBx1", symbols: [ "MC___", "MC_QCluster" ] }
                ],
                "MC_Query.RPT01x3": [
                    { name: "MC_Query.RPT01x3", postprocess: ({data}) => data[0], symbols: [ "MC_Query.RPT01x3.SUBx1" ] },
                    { name: "MC_Query.RPT01x3", postprocess: () => null, symbols: [ ] }
                ],
                "MC_Query.RPT01x3.SUBx1": [
                    { name: "MC_Query.RPT01x3.SUBx1", symbols: [ "MC___", "MC_QSort" ] }
                ],
                "MC_Query.RPT01x4": [
                    { name: "MC_Query.RPT01x4", postprocess: ({data}) => data[0], symbols: [ "MC_Query.RPT01x4.SUBx1" ] },
                    { name: "MC_Query.RPT01x4", postprocess: () => null, symbols: [ ] }
                ],
                "MC_Query.RPT01x4.SUBx1": [
                    { name: "MC_Query.RPT01x4.SUBx1", symbols: [ "MC___", "MC_QSlice" ] }
                ],
                MC_Range: [
                    { name: "MC_Range", postprocess: ({data}) => { return ({ low: data[0], high: data[4] }); }, symbols: [ "MC_Exp", "MC__", { literal: "to" }, "MC__", "MC_Exp" ] }
                ],
                MC_Reference: [
                    { name: "MC_Reference", postprocess: ({data}) => { return ({ type: TYPES.Reference, path: data[0] }); }, symbols: [ "MC_Path" ] }
                ],
                MC_Return: [
                    { name: "MC_Return", postprocess: ({data}) => { return ({ type: TYPES.Control, kind: "return", value: data[2] }); }, symbols: [ { literal: "return" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ] }
                ],
                MC_ScanBlock: [
                    { name: "MC_ScanBlock", postprocess: ({data}) => { return ({ type: TYPES.Loop, kind: 'scan', ...data[2], statements: data[4] }); }, symbols: [ { literal: "scan" }, "MC___", "MC_KVInIterator", "MC__", "MC_Block" ] }
                ],
                MC_Statement: [
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Assignment" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_DeclareVar" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_DeclareFunction" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_Return" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return ({ type: TYPES.Conditional, statements: data[0] }); }, symbols: [ "MC_IfBlock" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return ({ type: TYPES.Conditional, statements: data[0].concat([{ condition: null, statements: data[4] }])}); }, symbols: [ "MC_IfBlock", "MC__", { literal: "else" }, "MC__", "MC_Block" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ScanBlock" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_ConditionLoop" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_LoopBlock" ] },
                    { name: "MC_Statement", postprocess: ({data}) => { return ({ type: TYPES.Run, expression: data[2] }); }, symbols: [ { literal: "run" }, "MC___", "MC_Exp", "MC__", { literal: ";" } ] }
                ],
                MC_Statements: [
                    { name: "MC_Statements", postprocess: ({data}) => { return ([data[0]]); }, symbols: [ "MC_Statement" ] },
                    { name: "MC_Statements", postprocess: ({data}) => { return (( data[2].type == 'declare' &&  data[2].kind =='function'? data[0].unshift(data[2]): data[0].push(data[2])) && data[0]); }, symbols: [ "MC_Statements", "MC__", "MC_Statement" ] }
                ],
                MC_String: [
                    { name: "MC_String", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'string', value: data[1] }); }, symbols: [ { token: "dquote" }, "MC_StringInner", { token: "dquote" } ] },
                    { name: "MC_String", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'string', value: data[1] }); }, symbols: [ { token: "squote" }, "MC_StringInner", { token: "squote" } ] },
                    { name: "MC_String", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'string', value: '' }); }, symbols: [ { token: "dquote" }, { token: "dquote" } ] },
                    { name: "MC_String", postprocess: ({data}) => { return ({ type: TYPES.Literal, kind: 'string', value: '' }); }, symbols: [ { token: "squote" }, { token: "squote" } ] }
                ],
                MC_StringEscape: [
                    { name: "MC_StringEscape", postprocess: ({data}) => { return (JSON.parse('"' +data[0].value + '"')); }, symbols: [ { token: "escaped" } ] },
                    { name: "MC_StringEscape", postprocess: ({data}) => { return (data[0].value[1]); }, symbols: [ { token: "quoteEscape" } ] }
                ],
                MC_StringInner: [
                    { name: "MC_StringInner", postprocess: ({data}) => { return (data[0]); }, symbols: [ "MC_StringEscape" ] },
                    { name: "MC_StringInner", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { token: "string" } ] },
                    { name: "MC_StringInner", postprocess: ({data}) => { return (data[0] + data[1]); }, symbols: [ "MC_StringInner", "MC_StringEscape" ] },
                    { name: "MC_StringInner", postprocess: ({data}) => { return (data[0] + data[1].value); }, symbols: [ "MC_StringInner", { token: "string" } ] }
                ],
                MC_VariadicLogic: [
                    { name: "MC_VariadicLogic", postprocess: ({data}) => { return ({ type: TYPES.Logical, operator: data[0].value, operands: data[4] }); }, symbols: [ { literal: "any" }, "MC__", { literal: "{" }, "MC__", "MC_Exp_ss", "MC__", "MC_VariadicLogic.RPT01x1", { literal: "}" } ] },
                    { name: "MC_VariadicLogic", postprocess: ({data}) => { return ({ type: TYPES.Logical, operator: data[0].value, operands: data[4] }); }, symbols: [ { literal: "all" }, "MC__", { literal: "{" }, "MC__", "MC_Exp_ss", "MC__", "MC_VariadicLogic.RPT01x2", { literal: "}" } ] }
                ],
                "MC_VariadicLogic.RPT01x1": [
                    { name: "MC_VariadicLogic.RPT01x1", postprocess: ({data}) => data[0], symbols: [ "MC_VariadicLogic.RPT01x1.SUBx1" ] },
                    { name: "MC_VariadicLogic.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                "MC_VariadicLogic.RPT01x1.SUBx1": [
                    { name: "MC_VariadicLogic.RPT01x1.SUBx1", symbols: [ { literal: ";" }, "MC__" ] }
                ],
                "MC_VariadicLogic.RPT01x2": [
                    { name: "MC_VariadicLogic.RPT01x2", postprocess: ({data}) => data[0], symbols: [ "MC_VariadicLogic.RPT01x2.SUBx1" ] },
                    { name: "MC_VariadicLogic.RPT01x2", postprocess: () => null, symbols: [ ] }
                ],
                "MC_VariadicLogic.RPT01x2.SUBx1": [
                    { name: "MC_VariadicLogic.RPT01x2.SUBx1", symbols: [ { literal: ";" }, "MC__" ] }
                ],
                MC_Word: [
                    { name: "MC_Word", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { token: "word" } ] }
                ],
                MC__: [
                    { name: "MC__", postprocess: ({data}) => { return (null); }, symbols: [ "MC__.RPT01x1" ] }
                ],
                "MC__.RPT01x1": [
                    { name: "MC__.RPT01x1", postprocess: ({data}) => data[0], symbols: [ { token: "ws" } ] },
                    { name: "MC__.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                MC___: [
                    { name: "MC___", postprocess: ({data}) => { return (null); }, symbols: [ { token: "ws" } ] }
                ],
                Node: [
                    { name: "Node", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Element" ] },
                    { name: "Node", postprocess: ({data}) => { return (data[0]); }, symbols: [ "Script" ] },
                    { name: "Node", postprocess: ({data}) => { return ({ text: data[0].value }); }, symbols: [ { token: "text" } ] },
                    { name: "Node", postprocess: ({data}) => { return (null); }, symbols: [ { literal: "<!--" }, { token: "text" }, { literal: "-->" } ] },
                    { name: "Node", postprocess: ({data}) => { return ({ literal: data[3] }); }, symbols: [ { literal: "<" }, { literal: "(" }, "_", "MC_Body", "_", { literal: ")" }, { literal: ">" } ] }
                ],
                Number: [
                    { name: "Number", postprocess: ({data}) => { return (Number(data[0].value)); }, symbols: [ { token: "number" } ] }
                ],
                Object: [
                    { name: "Object", postprocess: ({data}) => { return ({}); }, symbols: [ { literal: "{" }, "_", { literal: "}" } ] },
                    { name: "Object", postprocess: ({data}) => { return (data[2]); }, symbols: [ { literal: "{" }, "_", "JSONAttributes", "_", { literal: "}" } ] }
                ],
                Script: [
                    { name: "Script", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes , nodes: [data[5]]}); }, symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: ">" }, "_", "MC_Body", "_", { literal: "</" }, { literal: "script" }, { literal: ">" } ] },
                    { name: "Script", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes, nodes:[] }); }, symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: "/>" } ] },
                    { name: "Script", postprocess: ({data}) => { return ({ tag: data[1].tag, attributes: data[1].attributes , nodes: [] }); }, symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: ">" }, "_", { literal: "</" }, { literal: "script" }, { literal: ">" } ] }
                ],
                ScriptHead: [
                    { name: "ScriptHead", postprocess: ({data}) => { return ({ tag: data[0].value, attributes: [] }); }, symbols: [ { literal: "script" } ] },
                    { name: "ScriptHead", postprocess: ({data}) => { return ({ tag: data[0].value, attributes: data[2] }); }, symbols: [ { literal: "script" }, "__", "XMLPlusAttributes" ] }
                ],
                String: [
                    { name: "String", postprocess: ({data}) => { return (""); }, symbols: [ { token: "dquote" }, { token: "dquote" } ] },
                    { name: "String", postprocess: ({data}) => { return (data[1]); }, symbols: [ { token: "dquote" }, "StringInner", { token: "dquote" } ] }
                ],
                StringEscape: [
                    { name: "StringEscape", postprocess: ({data}) => { return (JSON.parse('"' +data[0].value + '"')); }, symbols: [ { token: "escaped" } ] },
                    { name: "StringEscape", postprocess: ({data}) => { return (data[0].value[1]); }, symbols: [ { token: "quoteEscape" } ] }
                ],
                StringInner: [
                    { name: "StringInner", postprocess: ({data}) => { return (data[0]); }, symbols: [ "StringEscape" ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0].value); }, symbols: [ { token: "string" } ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0] + data[1]); }, symbols: [ "StringInner", "StringEscape" ] },
                    { name: "StringInner", postprocess: ({data}) => { return (data[0] + data[1].value); }, symbols: [ "StringInner", { token: "string" } ] }
                ],
                XMLPlus: [
                    { name: "XMLPlus", postprocess: ({data}) => { return ({ nodes: data[0] ?[data[0]]:[] }); }, symbols: [ "Node" ] },
                    { name: "XMLPlus", postprocess: ({data}) => { return ({ nodes: data[2] ? data[0].nodes.concat(data[2]): data[0].nodes }); }, symbols: [ "XMLPlus", "_", "Node" ] }
                ],
                XMLPlusAttr: [
                    { name: "XMLPlusAttr", postprocess: ({data}) => { return ({ key: data[0].value, value: data[2], type: 'json' }); }, symbols: [ { token: "word" }, { literal: "=" }, "JSON" ] },
                    { name: "XMLPlusAttr", postprocess: ({data}) => { return ({ key: data[0].value , value: '', type: 'json' }); }, symbols: [ { token: "word" } ] },
                    { name: "XMLPlusAttr", postprocess: ({data}) => { return ({ key:data[0].value , value: data[4], type: 'script' }); }, symbols: [ { token: "word" }, { literal: "=" }, { literal: "(" }, "_", "MC_Body", "_", { literal: ")" } ] }
                ],
                XMLPlusAttributes: [
                    { name: "XMLPlusAttributes", postprocess: ({data}) => { return ({ [data[0].key] : data[0] }); }, symbols: [ "XMLPlusAttr" ] },
                    { name: "XMLPlusAttributes", postprocess: ({data}) => { return ({ ...data[0], [data[2].key]: data[2]  }); }, symbols: [ "XMLPlusAttributes", "_", "XMLPlusAttr" ] }
                ],
                _: [
                    { name: "_", symbols: [ "_.RPT01x1" ] }
                ],
                "_.RPT01x1": [
                    { name: "_.RPT01x1", postprocess: ({data}) => data[0], symbols: [ { token: "space" } ] },
                    { name: "_.RPT01x1", postprocess: () => null, symbols: [ ] }
                ],
                __: [
                    { name: "__", symbols: [ { token: "space" } ] }
                ]
            },
            start: "XMLPlus"
        },
        lexer: {
            start: "root",
            states: {
                MC_dqstring: {
                    regex: /(?:(?:(\\[\\\/bnrft]))|(?:(\\"))|(?:(\\u[A-Fa-f\d]{4}))|(?:(\\.))|(?:([^"\\]+))|(?:((?:"))))/ym,
                    rules: [
                        { highlight: "constant", tag: ["escaped"], when: /\\[\\\/bnrft]/ },
                        { tag: ["quoteEscape"], when: /\\"/ },
                        { highlight: "constant", tag: ["escaped"], when: /\\u[A-Fa-f\d]{4}/ },
                        { tag: ["badEscape"], when: /\\./ },
                        { highlight: "string", tag: ["string"], when: /[^"\\]+/ },
                        { highlight: "string", pop: 1, tag: ["dquote"], when: "\"" }
                    ]
                },
                MC_keywords: {
                    regex: /(?:(?:(\@))|(?:(set(?![a-zA-Z])))|(?:(var(?![a-zA-Z])))|(?:(const(?![a-zA-Z])))|(?:(asc(?![a-zA-Z])))|(?:(desc(?![a-zA-Z])))|(?:(function(?![a-zA-Z])))|(?:(true(?![a-zA-Z])))|(?:(false(?![a-zA-Z])))|(?:(null(?![a-zA-Z])))|(?:(any(?![a-zA-Z])))|(?:(all(?![a-zA-Z])))|(?:(within(?![a-zA-Z])))|(?:(between(?![a-zA-Z])))|(?:(and(?![a-zA-Z])))|(?:(or(?![a-zA-Z])))|(?:(on(?![a-zA-Z])))|(?:(if(?![a-zA-Z])))|(?:(match(?![a-zA-Z])))|(?:(default(?![a-zA-Z])))|(?:(in(?![a-zA-Z])))|(?:(else(?![a-zA-Z])))|(?:(for(?![a-zA-Z])))|(?:(like(?![a-zA-Z])))|(?:(not(?![a-zA-Z])))|(?:(while(?![a-zA-Z])))|(?:(until(?![a-zA-Z])))|(?:(to(?![a-zA-Z])))|(?:(do(?![a-zA-Z])))|(?:(run(?![a-zA-Z])))|(?:(return(?![a-zA-Z])))|(?:(query(?![a-zA-Z])))|(?:(scan(?![a-zA-Z])))|(?:(segment(?![a-zA-Z])))|(?:(filter(?![a-zA-Z])))|(?:(sort(?![a-zA-Z])))|(?:(aggregate(?![a-zA-Z])))|(?:(cluster(?![a-zA-Z])))|(?:(list(?![a-zA-Z])))|(?:(first(?![a-zA-Z]))))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["keyword"], when: /\@/ },
                        { highlight: "keyword", tag: ["keyword"], when: /set(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /var(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /const(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /asc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /desc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /any(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /all(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /within(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /between(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /on(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /match(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /default(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /like(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /do(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /query(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scan(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /segment(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /filter(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /sort(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /aggregate(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /cluster(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /list(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /first(?![a-zA-Z])/ }
                    ]
                },
                MC_root: {
                    regex: /(?:(?:(\@))|(?:(set(?![a-zA-Z])))|(?:(var(?![a-zA-Z])))|(?:(const(?![a-zA-Z])))|(?:(asc(?![a-zA-Z])))|(?:(desc(?![a-zA-Z])))|(?:(function(?![a-zA-Z])))|(?:(true(?![a-zA-Z])))|(?:(false(?![a-zA-Z])))|(?:(null(?![a-zA-Z])))|(?:(any(?![a-zA-Z])))|(?:(all(?![a-zA-Z])))|(?:(within(?![a-zA-Z])))|(?:(between(?![a-zA-Z])))|(?:(and(?![a-zA-Z])))|(?:(or(?![a-zA-Z])))|(?:(on(?![a-zA-Z])))|(?:(if(?![a-zA-Z])))|(?:(match(?![a-zA-Z])))|(?:(default(?![a-zA-Z])))|(?:(in(?![a-zA-Z])))|(?:(else(?![a-zA-Z])))|(?:(for(?![a-zA-Z])))|(?:(like(?![a-zA-Z])))|(?:(not(?![a-zA-Z])))|(?:(while(?![a-zA-Z])))|(?:(until(?![a-zA-Z])))|(?:(to(?![a-zA-Z])))|(?:(do(?![a-zA-Z])))|(?:(run(?![a-zA-Z])))|(?:(return(?![a-zA-Z])))|(?:(query(?![a-zA-Z])))|(?:(scan(?![a-zA-Z])))|(?:(segment(?![a-zA-Z])))|(?:(filter(?![a-zA-Z])))|(?:(sort(?![a-zA-Z])))|(?:(aggregate(?![a-zA-Z])))|(?:(cluster(?![a-zA-Z])))|(?:(list(?![a-zA-Z])))|(?:(first(?![a-zA-Z])))|(?:("))|(?:('))|(?:(\d+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*))|(?:((?:=>)))|(?:((?:!=)))|(?:((?:==)))|(?:((?:>=)))|(?:((?:<=)))|(?:((?:\+=)))|(?:((?:\-=)))|(?:((?:\/=)))|(?:((?:%=)))|(?:((?:\*=)))|(?:((?:\.\.\.)))|(?:((?:\.\.)))|(?:((?:=)))|(?:((?:>)))|(?:((?:<)))|(?:((?:\+)))|(?:((?:\-)))|(?:((?:\/)))|(?:((?:%)))|(?:((?:\*)))|(?:((?:\?)))|(?:((?:\^)))|(?:((?:;)))|(?:((?::)))|(?:((?:!)))|(?:((?:\.)))|(?:((?:,)))|(?:((?:\()))|(?:((?:\))))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:(\s+)))/ym,
                    rules: [
                        { highlight: "keyword", tag: ["keyword"], when: /\@/ },
                        { highlight: "keyword", tag: ["keyword"], when: /set(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /var(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /const(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /asc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /desc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /any(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /all(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /within(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /between(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /on(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /match(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /default(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /like(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /do(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /query(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scan(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /segment(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /filter(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /sort(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /aggregate(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /cluster(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /list(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /first(?![a-zA-Z])/ },
                        { goto: "MC_dqstring", highlight: "string", tag: ["dquote"], when: /"/ },
                        { goto: "MC_sqstring", highlight: "string", tag: ["squote"], when: /'/ },
                        { highlight: "number", tag: ["digits"], when: /\d+/ },
                        { tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { highlight: "keyword", tag: ["l_arrow"], when: "=>" },
                        { highlight: "keyword", tag: ["l_arrow"], when: "!=" },
                        { highlight: "keyword", tag: ["l_eqeq"], when: "==" },
                        { highlight: "keyword", tag: ["l_gteq"], when: ">=" },
                        { highlight: "keyword", tag: ["l_lteq"], when: "<=" },
                        { highlight: "keyword", tag: ["l_add"], when: "+=" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-=" },
                        { highlight: "keyword", tag: ["l_div"], when: "/=" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%=" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*=" },
                        { highlight: "keyword", tag: ["l_spread"], when: "..." },
                        { highlight: "keyword", tag: ["l_concat"], when: ".." },
                        { tag: ["l_eq"], when: "=" },
                        { highlight: "keyword", tag: ["l_gt"], when: ">" },
                        { highlight: "keyword", tag: ["l_lt"], when: "<" },
                        { highlight: "keyword", tag: ["l_add"], when: "+" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-" },
                        { highlight: "keyword", tag: ["l_div"], when: "/" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*" },
                        { highlight: "keyword", tag: ["l_qmark"], when: "?" },
                        { highlight: "keyword", tag: ["l_exp"], when: "^" },
                        { highlight: "keyword", tag: ["l_semi"], when: ";" },
                        { highlight: "keyword", tag: ["l_col"], when: ":" },
                        { highlight: "keyword", tag: ["l_exc"], when: "!" },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," },
                        { highlight: "delimiter", inset: 1, tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lcurly"], when: "{" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rcurly"], when: "}" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lbrack"], when: "[" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rbrack"], when: "]" },
                        { tag: ["ws"], when: /\s+/ }
                    ]
                },
                MC_sqstring: {
                    regex: /(?:(?:(\\[\\\/bnrft]))|(?:(\\'))|(?:(\\u[A-Fa-f\d]{4}))|(?:(\\.))|(?:([^'\\]+))|(?:((?:'))))/ym,
                    rules: [
                        { tag: ["escaped"], when: /\\[\\\/bnrft]/ },
                        { tag: ["quoteEscape"], when: /\\'/ },
                        { tag: ["escaped"], when: /\\u[A-Fa-f\d]{4}/ },
                        { tag: ["badEscape"], when: /\\./ },
                        { highlight: "string", tag: ["string"], when: /[^'\\]+/ },
                        { highlight: "string", pop: 1, tag: ["squote"], when: "'" }
                    ]
                },
                attributes: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" }
                    ]
                },
                commentEnd: {
                    regex: /(?:(?:((?:\-\->))))/gm,
                    rules: [
                        { pop: 1, tag: ["commentEnd"], when: "-->" }
                    ],
                    unmatched: { tag: ["text"] }
                },
                commentStart: {
                    regex: /(?:(?:((?:<!\-\-))))/ym,
                    rules: [
                        { goto: "commentEnd", tag: ["commentStart"], when: "<!--" }
                    ]
                },
                footTag: {
                    regex: /(?:(?:(\s+))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:>))))/ym,
                    rules: [
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "tag", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { pop: 1, when: ">" }
                    ]
                },
                headTag: {
                    regex: /(?:(?:(script(?![a-z_A-Z\d\-:!])))|(?:(style(?![a-z_A-Z\d\-:!])))|(?:(output(?![a-z_A-Z\d\-:!])))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*)))/ym,
                    rules: [
                        { highlight: "tag", set: "scriptHeadTag", when: /script(?![a-z_A-Z\d\-:!])/ },
                        { highlight: "tag", set: "styleHeadTag", tag: ["word"], when: /style(?![a-z_A-Z\d\-:!])/ },
                        { highlight: "tag", set: "outputHeadTag", tag: ["word"], when: /output(?![a-z_A-Z\d\-:!])/ },
                        { highlight: "tag", set: "stdHeadTag", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ }
                    ]
                },
                interpolate: {
                    regex: /(?:(?:((?:>)))|(?:((?:<)))|(?:((?:\())))/ym,
                    rules: [
                        { pop: 1, when: ">" },
                        { when: "<" },
                        { goto: "MC_root", when: "(" }
                    ]
                },
                json: {
                    regex: /(?:(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null))))/ym,
                    rules: [
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" }
                    ]
                },
                json_string: {
                    regex: /(?:(?:(\\[\\\/bnrft]))|(?:(\\"))|(?:(\\u[A-Fa-f\d]{4}))|(?:(\\.))|(?:([^"\\]+))|(?:(")))/ym,
                    rules: [
                        { highlight: "constant", tag: ["escaped"], when: /\\[\\\/bnrft]/ },
                        { tag: ["quoteEscape"], when: /\\"/ },
                        { highlight: "constant", tag: ["escaped"], when: /\\u[A-Fa-f\d]{4}/ },
                        { tag: ["badEscape"], when: /\\./ },
                        { highlight: "attribute.value", tag: ["string"], when: /[^"\\]+/ },
                        { highlight: "attribute.value", pop: 1, tag: ["dquote"], when: /"/ }
                    ]
                },
                outputBody: {
                    regex: /(?:(?:((?:<\/output>))))/gm,
                    rules: [
                        { before: true, pop: 1, when: "</output>" }
                    ],
                    unmatched: { tag: ["text"] }
                },
                outputEmbedBody: {
                    regex: /(?:(?:((?:<\/output>))))/gm,
                    rules: [
                        { before: true, pop: 1, when: "</output>" }
                    ],
                    unmatched: { tag: ["text"] }
                },
                outputHeadHTMLTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "outputEmbedBody", when: ">" }
                    ]
                },
                outputHeadJSONBody: {
                    regex: /(?:(?:((?:<\/output>)))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null))))/ym,
                    rules: [
                        { before: true, pop: 1, when: "</output>" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" }
                    ]
                },
                outputHeadJSONTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "outputHeadJSONBody", when: ">" }
                    ]
                },
                outputHeadScriptTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "outputScriptBody", when: ">" }
                    ]
                },
                outputHeadTag: {
                    regex: /(?:(?:(content\s*=\s*"html"))|(?:(content\s*=\s*"json"))|(?:(content\s*=\s*"xml"))|(?:(content\s*=\s*"script"))|(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { before: true, set: "outputHeadHTMLTag", when: /content\s*=\s*"html"/ },
                        { before: true, set: "outputHeadJSONTag", when: /content\s*=\s*"json"/ },
                        { before: true, set: "outputHeadXMLTag", when: /content\s*=\s*"xml"/ },
                        { before: true, set: "outputHeadScriptTag", when: /content\s*=\s*"script"/ },
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "outputBody", when: ">" }
                    ]
                },
                outputHeadXMLTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "outputEmbedBody", when: ">" }
                    ]
                },
                outputScriptBody: {
                    regex: /(?:(?:((?:<\/output>)))|(?:(\@))|(?:(set(?![a-zA-Z])))|(?:(var(?![a-zA-Z])))|(?:(const(?![a-zA-Z])))|(?:(asc(?![a-zA-Z])))|(?:(desc(?![a-zA-Z])))|(?:(function(?![a-zA-Z])))|(?:(true(?![a-zA-Z])))|(?:(false(?![a-zA-Z])))|(?:(null(?![a-zA-Z])))|(?:(any(?![a-zA-Z])))|(?:(all(?![a-zA-Z])))|(?:(within(?![a-zA-Z])))|(?:(between(?![a-zA-Z])))|(?:(and(?![a-zA-Z])))|(?:(or(?![a-zA-Z])))|(?:(on(?![a-zA-Z])))|(?:(if(?![a-zA-Z])))|(?:(match(?![a-zA-Z])))|(?:(default(?![a-zA-Z])))|(?:(in(?![a-zA-Z])))|(?:(else(?![a-zA-Z])))|(?:(for(?![a-zA-Z])))|(?:(like(?![a-zA-Z])))|(?:(not(?![a-zA-Z])))|(?:(while(?![a-zA-Z])))|(?:(until(?![a-zA-Z])))|(?:(to(?![a-zA-Z])))|(?:(do(?![a-zA-Z])))|(?:(run(?![a-zA-Z])))|(?:(return(?![a-zA-Z])))|(?:(query(?![a-zA-Z])))|(?:(scan(?![a-zA-Z])))|(?:(segment(?![a-zA-Z])))|(?:(filter(?![a-zA-Z])))|(?:(sort(?![a-zA-Z])))|(?:(aggregate(?![a-zA-Z])))|(?:(cluster(?![a-zA-Z])))|(?:(list(?![a-zA-Z])))|(?:(first(?![a-zA-Z])))|(?:("))|(?:('))|(?:(\d+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*))|(?:((?:=>)))|(?:((?:!=)))|(?:((?:==)))|(?:((?:>=)))|(?:((?:<=)))|(?:((?:\+=)))|(?:((?:\-=)))|(?:((?:\/=)))|(?:((?:%=)))|(?:((?:\*=)))|(?:((?:\.\.\.)))|(?:((?:\.\.)))|(?:((?:=)))|(?:((?:>)))|(?:((?:<)))|(?:((?:\+)))|(?:((?:\-)))|(?:((?:\/)))|(?:((?:%)))|(?:((?:\*)))|(?:((?:\?)))|(?:((?:\^)))|(?:((?:;)))|(?:((?::)))|(?:((?:!)))|(?:((?:\.)))|(?:((?:,)))|(?:((?:\()))|(?:((?:\))))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:(\s+)))/ym,
                    rules: [
                        { before: true, pop: 1, when: "</output>" },
                        { highlight: "keyword", tag: ["keyword"], when: /\@/ },
                        { highlight: "keyword", tag: ["keyword"], when: /set(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /var(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /const(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /asc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /desc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /any(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /all(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /within(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /between(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /on(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /match(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /default(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /like(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /do(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /query(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scan(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /segment(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /filter(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /sort(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /aggregate(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /cluster(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /list(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /first(?![a-zA-Z])/ },
                        { goto: "MC_dqstring", highlight: "string", tag: ["dquote"], when: /"/ },
                        { goto: "MC_sqstring", highlight: "string", tag: ["squote"], when: /'/ },
                        { highlight: "number", tag: ["digits"], when: /\d+/ },
                        { tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { highlight: "keyword", tag: ["l_arrow"], when: "=>" },
                        { highlight: "keyword", tag: ["l_arrow"], when: "!=" },
                        { highlight: "keyword", tag: ["l_eqeq"], when: "==" },
                        { highlight: "keyword", tag: ["l_gteq"], when: ">=" },
                        { highlight: "keyword", tag: ["l_lteq"], when: "<=" },
                        { highlight: "keyword", tag: ["l_add"], when: "+=" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-=" },
                        { highlight: "keyword", tag: ["l_div"], when: "/=" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%=" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*=" },
                        { highlight: "keyword", tag: ["l_spread"], when: "..." },
                        { highlight: "keyword", tag: ["l_concat"], when: ".." },
                        { tag: ["l_eq"], when: "=" },
                        { highlight: "keyword", tag: ["l_gt"], when: ">" },
                        { highlight: "keyword", tag: ["l_lt"], when: "<" },
                        { highlight: "keyword", tag: ["l_add"], when: "+" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-" },
                        { highlight: "keyword", tag: ["l_div"], when: "/" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*" },
                        { highlight: "keyword", tag: ["l_qmark"], when: "?" },
                        { highlight: "keyword", tag: ["l_exp"], when: "^" },
                        { highlight: "keyword", tag: ["l_semi"], when: ";" },
                        { highlight: "keyword", tag: ["l_col"], when: ":" },
                        { highlight: "keyword", tag: ["l_exc"], when: "!" },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," },
                        { highlight: "delimiter", inset: 1, tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lcurly"], when: "{" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rcurly"], when: "}" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lbrack"], when: "[" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rbrack"], when: "]" },
                        { tag: ["ws"], when: /\s+/ }
                    ]
                },
                root: {
                    regex: /(?:(?:((?:<!\-\-)))|(?:(<\())|(?:(<\/))|(?:(<))|(?:([^<]+)))/ym,
                    rules: [
                        { goto: "commentEnd", tag: ["commentStart"], when: "<!--" },
                        { before: true, goto: "interpolate", when: /<\(/ },
                        { goto: "footTag", when: /<\// },
                        { goto: "headTag", when: /</ },
                        { tag: ["text"], when: /[^<]+/ }
                    ]
                },
                scriptBody: {
                    regex: /(?:(?:((?:<\/script>)))|(?:(\@))|(?:(set(?![a-zA-Z])))|(?:(var(?![a-zA-Z])))|(?:(const(?![a-zA-Z])))|(?:(asc(?![a-zA-Z])))|(?:(desc(?![a-zA-Z])))|(?:(function(?![a-zA-Z])))|(?:(true(?![a-zA-Z])))|(?:(false(?![a-zA-Z])))|(?:(null(?![a-zA-Z])))|(?:(any(?![a-zA-Z])))|(?:(all(?![a-zA-Z])))|(?:(within(?![a-zA-Z])))|(?:(between(?![a-zA-Z])))|(?:(and(?![a-zA-Z])))|(?:(or(?![a-zA-Z])))|(?:(on(?![a-zA-Z])))|(?:(if(?![a-zA-Z])))|(?:(match(?![a-zA-Z])))|(?:(default(?![a-zA-Z])))|(?:(in(?![a-zA-Z])))|(?:(else(?![a-zA-Z])))|(?:(for(?![a-zA-Z])))|(?:(like(?![a-zA-Z])))|(?:(not(?![a-zA-Z])))|(?:(while(?![a-zA-Z])))|(?:(until(?![a-zA-Z])))|(?:(to(?![a-zA-Z])))|(?:(do(?![a-zA-Z])))|(?:(run(?![a-zA-Z])))|(?:(return(?![a-zA-Z])))|(?:(query(?![a-zA-Z])))|(?:(scan(?![a-zA-Z])))|(?:(segment(?![a-zA-Z])))|(?:(filter(?![a-zA-Z])))|(?:(sort(?![a-zA-Z])))|(?:(aggregate(?![a-zA-Z])))|(?:(cluster(?![a-zA-Z])))|(?:(list(?![a-zA-Z])))|(?:(first(?![a-zA-Z])))|(?:("))|(?:('))|(?:(\d+))|(?:([_a-zA-Z$][_a-zA-Z$\d]*))|(?:((?:=>)))|(?:((?:!=)))|(?:((?:==)))|(?:((?:>=)))|(?:((?:<=)))|(?:((?:\+=)))|(?:((?:\-=)))|(?:((?:\/=)))|(?:((?:%=)))|(?:((?:\*=)))|(?:((?:\.\.\.)))|(?:((?:\.\.)))|(?:((?:=)))|(?:((?:>)))|(?:((?:<)))|(?:((?:\+)))|(?:((?:\-)))|(?:((?:\/)))|(?:((?:%)))|(?:((?:\*)))|(?:((?:\?)))|(?:((?:\^)))|(?:((?:;)))|(?:((?::)))|(?:((?:!)))|(?:((?:\.)))|(?:((?:,)))|(?:((?:\()))|(?:((?:\))))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:(\s+)))/ym,
                    rules: [
                        { before: true, pop: 1, when: "</script>" },
                        { highlight: "keyword", tag: ["keyword"], when: /\@/ },
                        { highlight: "keyword", tag: ["keyword"], when: /set(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /var(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /const(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /asc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /desc(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /function(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /true(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /false(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /null(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /any(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /all(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /within(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword","word"], when: /between(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /and(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /or(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /on(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /if(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /match(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /default(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /in(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /else(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /for(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /like(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /not(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /while(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /until(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /to(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /do(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /run(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /return(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /query(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /scan(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /segment(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /filter(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /sort(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /aggregate(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /cluster(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /list(?![a-zA-Z])/ },
                        { highlight: "keyword", tag: ["keyword"], when: /first(?![a-zA-Z])/ },
                        { goto: "MC_dqstring", highlight: "string", tag: ["dquote"], when: /"/ },
                        { goto: "MC_sqstring", highlight: "string", tag: ["squote"], when: /'/ },
                        { highlight: "number", tag: ["digits"], when: /\d+/ },
                        { tag: ["word"], when: /[_a-zA-Z$][_a-zA-Z$\d]*/ },
                        { highlight: "keyword", tag: ["l_arrow"], when: "=>" },
                        { highlight: "keyword", tag: ["l_arrow"], when: "!=" },
                        { highlight: "keyword", tag: ["l_eqeq"], when: "==" },
                        { highlight: "keyword", tag: ["l_gteq"], when: ">=" },
                        { highlight: "keyword", tag: ["l_lteq"], when: "<=" },
                        { highlight: "keyword", tag: ["l_add"], when: "+=" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-=" },
                        { highlight: "keyword", tag: ["l_div"], when: "/=" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%=" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*=" },
                        { highlight: "keyword", tag: ["l_spread"], when: "..." },
                        { highlight: "keyword", tag: ["l_concat"], when: ".." },
                        { tag: ["l_eq"], when: "=" },
                        { highlight: "keyword", tag: ["l_gt"], when: ">" },
                        { highlight: "keyword", tag: ["l_lt"], when: "<" },
                        { highlight: "keyword", tag: ["l_add"], when: "+" },
                        { highlight: "keyword", tag: ["l_sub"], when: "-" },
                        { highlight: "keyword", tag: ["l_div"], when: "/" },
                        { highlight: "keyword", tag: ["l_mod"], when: "%" },
                        { highlight: "keyword", tag: ["l_mul"], when: "*" },
                        { highlight: "keyword", tag: ["l_qmark"], when: "?" },
                        { highlight: "keyword", tag: ["l_exp"], when: "^" },
                        { highlight: "keyword", tag: ["l_semi"], when: ";" },
                        { highlight: "keyword", tag: ["l_col"], when: ":" },
                        { highlight: "keyword", tag: ["l_exc"], when: "!" },
                        { tag: ["l_dot"], when: "." },
                        { highlight: "delimiter", tag: ["l_comma"], when: "," },
                        { highlight: "delimiter", inset: 1, tag: ["l_lparen"], when: "(" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rparen"], when: ")" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lcurly"], when: "{" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rcurly"], when: "}" },
                        { highlight: "delimiter", inset: 1, tag: ["l_lbrack"], when: "[" },
                        { highlight: "delimiter", pop: 1, tag: ["l_rbrack"], when: "]" },
                        { tag: ["ws"], when: /\s+/ }
                    ]
                },
                scriptHeadTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "scriptBody", when: ">" }
                    ]
                },
                stdHeadTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { pop: 1, when: ">" }
                    ]
                },
                styleBody: {
                    regex: /(?:(?:((?:<\/style>))))/gm,
                    rules: [
                        { before: true, pop: 1, when: "</style>" }
                    ],
                    unmatched: { tag: ["text"] }
                },
                styleHeadTag: {
                    regex: /(?:(?:((?:\/>)))|(?:([a-z_A-Z:!][a-z_A-Z\d\-:!]*))|(?:((?:=)))|(?:((?:\()))|(?:(\s+))|(?:(-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b))|(?:("))|(?:((?:\{)))|(?:((?:\})))|(?:((?:\[)))|(?:((?:\])))|(?:((?:,)))|(?:((?::)))|(?:((?:true)))|(?:((?:false)))|(?:((?:null)))|(?:((?:>))))/ym,
                    rules: [
                        { pop: 1, when: "/>" },
                        { highlight: "attribute.name", tag: ["word"], when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/ },
                        { when: "=" },
                        { goto: "MC_root", when: "(" },
                        { tag: ["space"], when: /\s+/ },
                        { highlight: "number", tag: ["number"], when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/ },
                        { goto: "json_string", highlight: "attribute.value", tag: ["dquote"], when: /"/ },
                        { inset: 1, when: "{" },
                        { pop: 1, when: "}" },
                        { inset: 1, when: "[" },
                        { pop: 1, when: "]" },
                        { when: "," },
                        { when: ":" },
                        { highlight: "keyword", when: "true" },
                        { highlight: "keyword", when: "false" },
                        { highlight: "keyword", when: "null" },
                        { set: "styleBody", when: ">" }
                    ]
                }
            }
        }
    }
    constructor(){}
}

export default grammar;