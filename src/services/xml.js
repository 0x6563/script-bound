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

function GWLanguage(){
    
    return {
        grammar: {
            start: "XMLPlus",
            rules: {
                MC_Body: [
                    { name: "MC_Body", symbols: [ "MC__", "MC_Statements", "MC__" ], postprocess: ({data}) => { return { statements: data[1]}; } },
                    { name: "MC_Body", symbols: [ "MC__", "MC_Exp", "MC__" ], postprocess: ({data}) => { return { expression: data[1]}; } }
                ],
                MC_Statements: [
                    { name: "MC_Statements", symbols: [ "MC_Statement" ], postprocess: ({data}) => { return [data[0]]; } },
                    { name: "MC_Statements", symbols: [ "MC_Statements", "MC__", "MC_Statement" ], postprocess: ({data}) => { return ( data[2].type == 'declare' &&  data[2].kind =='function'? data[0].unshift(data[2]): data[0].push(data[2])) && data[0]; } }
                ],
                MC_Statement: [
                    { name: "MC_Statement", symbols: [ "MC_Assignment" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_DeclareVar" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_DeclareFunction" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_Return" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_IfBlock" ], postprocess: ({data}) => { return { type: TYPES.Conditional, statements: data[0] }; } },
                    { name: "MC_Statement", symbols: [ "MC_IfBlock", "MC__", { literal: "else" }, "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Conditional, statements: data[0].concat([{ condition: null, statements: data[4] }])}; } },
                    { name: "MC_Statement", symbols: [ "MC_ScanBlock" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_ConditionLoop" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ "MC_LoopBlock" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Statement", symbols: [ { literal: "run" }, "MC___", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Run, expression: data[2] }; } }
                ],
                MC_Assignment: [
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: data[4] }; } },
                    { name: "MC_Assignment", symbols: [ { literal: "set" }, "MC___", "MC_Reference", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[2],  value: data[6] }; } },
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "+=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }; } },
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "-=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }; } },
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "/=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }; } },
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "*=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }; } },
                    { name: "MC_Assignment", symbols: [ "MC_Reference", "MC__", { literal: "%=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Assignment, reference: data[0],  value: { type: TYPES.Operation, operator: data[2].value[0], operands: [data[0], data[4]] } }; } }
                ],
                MC_DeclareVar: [
                    { name: "MC_DeclareVar", symbols: [ { literal: "var" }, "MC___", "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Declare, kind: 'var', name: data[2], value: data[6] }; } },
                    { name: "MC_DeclareVar", symbols: [ { literal: "const" }, "MC___", "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Declare, kind: 'const', name: data[2], value: data[6] }; } }
                ],
                MC_Return: [
                    { name: "MC_Return", symbols: [ { literal: "return" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Control, kind: "return", value: data[2] }; } }
                ],
                MC_DeclareFunction: [
                    { name: "MC_DeclareFunction", symbols: [ { literal: "function" }, "MC__", "MC_Word", "MC__", { literal: "(" }, "MC__", "MC_FunctionArg_list", "MC__", { literal: ")" }, "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Declare, kind: 'function', name: data[2], args: data[6], statements: data[10] }; } },
                    { name: "MC_DeclareFunction", symbols: [ { literal: "function" }, "MC__", "MC_Word", "MC__", { literal: "(" }, "MC__", { literal: ")" }, "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Declare, kind: 'function', name: data[2], args: [], statements: data[8] }; } }
                ],
                MC_IfBlock: [
                    { name: "MC_IfBlock", symbols: [ { literal: "if" }, "MC__", "MC_Exp", "MC__", "MC_Block" ], postprocess: ({data}) => { return [{ condition: data[2], statements: data[4] }]; } },
                    { name: "MC_IfBlock", symbols: [ "MC_IfBlock", "MC__", { literal: "else" }, "MC__", "MC_IfBlock" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_ScanBlock: [
                    { name: "MC_ScanBlock", symbols: [ { literal: "scan" }, "MC___", "MC_KVInIterator", "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind: 'scan', ...data[2], statements: data[4] }; } }
                ],
                MC_KVInIterator: [
                    { name: "MC_KVInIterator", symbols: [ "MC_Word", "MC___", { literal: "in" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { v: data[0], iterable: data[4] }; } },
                    { name: "MC_KVInIterator", symbols: [ "MC_Word", "MC__", { literal: "," }, "MC__", "MC_Word", "MC___", { literal: "in" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { k: data[4], v: data[0], iterable: data[8] }; } }
                ],
                MC_ConditionLoop: [
                    { name: "MC_ConditionLoop", symbols: [ { literal: "while" }, "MC__", "MC_Exp", "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind:'while', condition: data[2], statements: data[4] }; } },
                    { name: "MC_ConditionLoop", symbols: [ { literal: "until" }, "MC__", "MC_Exp", "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind:'while', condition: { type: TYPES.Operation, operator: "!", operands: [data[2]] }, statements: data[4] }; } },
                    { name: "MC_ConditionLoop", symbols: [ { literal: "do" }, "MC__", "MC_Block", "MC___", { literal: "while" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind:'while', condition: data[6], statements: data[2] }; } },
                    { name: "MC_ConditionLoop", symbols: [ { literal: "do" }, "MC__", "MC_Block", "MC___", { literal: "until" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind:'while', condition: { type: TYPES.Operation, operator: "!", operands: [data[6]] }, statements: data[2] }; } }
                ],
                MC_LoopBlock: [
                    { name: "MC_LoopBlock", symbols: [ { literal: "for" }, "MC__", { literal: "(" }, "MC__", "MC_DeclareVar", "MC__", "MC_Exp", "MC__", { literal: ";" }, "MC__", "MC_Assignment", "MC__", { literal: ")" }, "MC__", "MC_Block" ], postprocess: ({data}) => { return { type: TYPES.Loop, kind:'for', base: data[4], step: data[10], condition: data[6], statements: data[14] }; } }
                ],
                MC_Block: [
                    { name: "MC_Block", symbols: [ { literal: "{" }, "MC__", "MC_Statements", "MC__", { literal: "}" } ], postprocess: ({data}) => { return data[2]; } },
                    { name: "MC_Block", symbols: [ { literal: "{" }, "MC__", { literal: "}" } ], postprocess: ({data}) => { return []; } }
                ],
                MC_Exp_list: [
                    { name: "MC_Exp_list", symbols: [ "MC_Exp" ], postprocess: ({data}) => { return [ data[0] ]; } },
                    { name: "MC_Exp_list", symbols: [ "MC_Exp_list", "MC__", { literal: "," }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_Exp_ss: [
                    { name: "MC_Exp_ss", symbols: [ "MC_Exp" ], postprocess: ({data}) => { return [ data[0] ]; } },
                    { name: "MC_Exp_ss", symbols: [ "MC_Exp_ss", "MC__", { literal: ";" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_Exp: [
                    { name: "MC_Exp", symbols: [ "MC_Query" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Exp", symbols: [ "MC_Lambda" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Exp", symbols: [ "MC_ExpOr" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Exp", symbols: [ "MC_Object" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpOr: [
                    { name: "MC_ExpOr", symbols: [ "MC_ExpOr", "MC__", { literal: "or" }, "MC__", "MC_ExpAnd" ], postprocess: ({data}) => { return { type: TYPES.Logical, operator: "any", operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpOr", symbols: [ "MC_ExpAnd" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpAnd: [
                    { name: "MC_ExpAnd", symbols: [ "MC_ExpAnd", "MC__", { literal: "and" }, "MC__", "MC_ExpCompare" ], postprocess: ({data}) => { return { type: TYPES.Logical, operator: "all", operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpAnd", symbols: [ "MC_ExpCompare" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpCompare: [
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "<" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: ">" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "<=" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: ">=" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "!=" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "==" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "like" }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "within" }, "MC__", "MC_Range" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4].low, data[4].high] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpCompare", "MC__", { literal: "between" }, "MC__", "MC_Range" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4].low, data[4].high] }; } },
                    { name: "MC_ExpCompare", symbols: [ "MC_ExpConcat" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpConcat: [
                    { name: "MC_ExpConcat", symbols: [ "MC_ExpSum", "MC__", { literal: ".." }, "MC__", "MC_ExpConcat" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpConcat", symbols: [ "MC_ExpSum" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpSum: [
                    { name: "MC_ExpSum", symbols: [ "MC_ExpSum", "MC__", { literal: "+" }, "MC__", "MC_ExpProduct" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpSum", symbols: [ "MC_ExpSum", "MC__", { literal: "-" }, "MC__", "MC_ExpProduct" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpSum", symbols: [ "MC_ExpProduct" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpProduct: [
                    { name: "MC_ExpProduct", symbols: [ "MC_ExpProduct", "MC__", { literal: "*" }, "MC__", "MC_ExpUnary" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpProduct", symbols: [ "MC_ExpProduct", "MC__", { literal: "/" }, "MC__", "MC_ExpUnary" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpProduct", symbols: [ "MC_ExpProduct", "MC__", { literal: "%" }, "MC__", "MC_ExpUnary" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpProduct", symbols: [ "MC_ExpUnary" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpUnary: [
                    { name: "MC_ExpUnary", symbols: [ { literal: "!" }, "MC__", "MC_ExpPower" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: "!", operands: [data[2]] }; } },
                    { name: "MC_ExpUnary", symbols: [ { literal: "not" }, "MC__", "MC_ExpPower" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: "!", operands: [data[2]] }; } },
                    { name: "MC_ExpUnary", symbols: [ "MC_ExpPower" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_ExpPower: [
                    { name: "MC_ExpPower", symbols: [ "MC_Atom", "MC__", { literal: "^" }, "MC__", "MC_ExpPower" ], postprocess: ({data}) => { return { type: TYPES.Operation, operator: data[2].value, operands: [data[0], data[4]] }; } },
                    { name: "MC_ExpPower", symbols: [ "MC_Atom" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_Atom: [
                    { name: "MC_Atom", symbols: [ "MC_Number" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_NegativeNumber" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_String" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Constant" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Regex" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Reference" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Group" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_FunctionCall" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Array" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_VariadicLogic" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Atom", symbols: [ "MC_Match" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_Constant: [
                    { name: "MC_Constant", symbols: [ { literal: "null" } ], postprocess: ({data}) => { return { type: TYPES.Constant, value: data[0].value }; } },
                    { name: "MC_Constant", symbols: [ { literal: "false" } ], postprocess: ({data}) => { return { type: TYPES.Constant, value: data[0].value }; } },
                    { name: "MC_Constant", symbols: [ { literal: "true" } ], postprocess: ({data}) => { return { type: TYPES.Constant, value: data[0].value }; } }
                ],
                MC_Reference: [
                    { name: "MC_Reference", symbols: [ "MC_Path" ], postprocess: ({data}) => { return { type: TYPES.Reference, path: data[0] }; } }
                ],
                MC_Path: [
                    { name: "MC_Path", symbols: [ "MC_Word" ], postprocess: ({data}) => { return [{ type: TYPES.Word, value: data[0] }]; } },
                    { name: "MC_Path", symbols: [ "MC_Path", "MC__", { literal: "." }, "MC__", "MC_Word" ], postprocess: ({data}) => { return data[0].concat({ type: TYPES.Word, value: data[4]}); } },
                    { name: "MC_Path", symbols: [ "MC_Path", "MC__", { literal: "[" }, "MC__", "MC_Exp", "MC__", { literal: "]" } ], postprocess: ({data}) => { return data[0].concat(data[4]); } },
                    { name: "MC_Path", symbols: [ "MC_Path", "MC__", { literal: "[" }, "MC__", { literal: "?" }, "MC__", { literal: "]" } ], postprocess: ({data}) => { return data[0].concat({ type: TYPES.Wildcard }); } }
                ],
                MC_Word: [
                    { name: "MC_Word", symbols: [ { token: "word" } ], postprocess: ({data}) => { return data[0].value; } }
                ],
                MC_Group: [
                    { name: "MC_Group", symbols: [ { literal: "(" }, "MC__", "MC_Exp", "MC__", { literal: ")" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                MC_Number: [
                    { name: "MC_Number", symbols: [ { token: "digits" }, { literal: "." }, { token: "digits" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'number', value: data[0].value  + "." + data[2].value }; } },
                    { name: "MC_Number", symbols: [ { token: "digits" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'number', value: data[0].value }; } }
                ],
                MC_NegativeNumber: [
                    { name: "MC_NegativeNumber", symbols: [ { literal: "-" }, "MC__", "MC_Number" ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'number', value: '-' +data[2].value }; } }
                ],
                MC_String: [
                    { name: "MC_String", symbols: [ { token: "dquote" }, "MC_StringInner", { token: "dquote" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'string', value: data[1] }; } },
                    { name: "MC_String", symbols: [ { token: "squote" }, "MC_StringInner", { token: "squote" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'string', value: data[1] }; } },
                    { name: "MC_String", symbols: [ { token: "dquote" }, { token: "dquote" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'string', value: '' }; } },
                    { name: "MC_String", symbols: [ { token: "squote" }, { token: "squote" } ], postprocess: ({data}) => { return { type: TYPES.Literal, kind: 'string', value: '' }; } }
                ],
                MC_StringInner: [
                    { name: "MC_StringInner", symbols: [ "MC_StringEscape" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_StringInner", symbols: [ { token: "string" } ], postprocess: ({data}) => { return data[0].value; } },
                    { name: "MC_StringInner", symbols: [ "MC_StringInner", "MC_StringEscape" ], postprocess: ({data}) => { return data[0] + data[1]; } },
                    { name: "MC_StringInner", symbols: [ "MC_StringInner", { token: "string" } ], postprocess: ({data}) => { return data[0] + data[1].value; } }
                ],
                MC_StringEscape: [
                    { name: "MC_StringEscape", symbols: [ { token: "escaped" } ], postprocess: ({data}) => { return JSON.parse('"' +data[0].value + '"'); } },
                    { name: "MC_StringEscape", symbols: [ { token: "quoteEscape" } ], postprocess: ({data}) => { return data[0].value[1]; } }
                ],
                MC_Array: [
                    { name: "MC_Array", symbols: [ { literal: "[" }, "MC__", { literal: "]" } ], postprocess: ({data}) => { return { type: TYPES.Array, items: [] }; } },
                    { name: "MC_Array", symbols: [ { literal: "[" }, "MC__", "MC_Exp_list", "MC__", { literal: "]" } ], postprocess: ({data}) => { return { type: TYPES.Array, items: data[2] }; } }
                ],
                MC_Object: [
                    { name: "MC_Object", symbols: [ { literal: "{" }, "MC__", { literal: "}" } ], postprocess: ({data}) => { return { type: TYPES.Object, properties: [] }; } },
                    { name: "MC_Object", symbols: [ { literal: "{" }, "MC__", "MC_Prop_list", "MC__", { literal: "}" } ], postprocess: ({data}) => { return { type: TYPES.Object, properties: data[2] }; } }
                ],
                MC_Prop_list: [
                    { name: "MC_Prop_list", symbols: [ "MC_Prop" ], postprocess: ({data}) => { return [data[0]]; } },
                    { name: "MC_Prop_list", symbols: [ "MC_Prop_list", "MC__", { literal: "," }, "MC__", "MC_Prop" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_Prop: [
                    { name: "MC_Prop", symbols: [ "MC_PropName", "MC__", { literal: ":" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { key: data[0], value: data[4] }; } },
                    { name: "MC_Prop", symbols: [ { literal: "..." }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Spread, value: data[2] }; } },
                    { name: "MC_Prop", symbols: [ "MC_Word" ], postprocess: ({data}) => { return { key: data[0], value: { type: TYPES.Reference, path: data[0] } }; } }
                ],
                MC_Query$RPT01x1$SUBx1: [
                    { name: "MC_Query$RPT01x1$SUBx1", symbols: [ "MC___", "MC_QFilter" ] }
                ],
                MC_Query$RPT01x1: [
                    { name: "MC_Query$RPT01x1", symbols: [ "MC_Query$RPT01x1$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_Query$RPT01x1", symbols: [ ], postprocess: () => null }
                ],
                MC_Query$RPT01x2$SUBx1: [
                    { name: "MC_Query$RPT01x2$SUBx1", symbols: [ "MC___", "MC_QCluster" ] }
                ],
                MC_Query$RPT01x2: [
                    { name: "MC_Query$RPT01x2", symbols: [ "MC_Query$RPT01x2$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_Query$RPT01x2", symbols: [ ], postprocess: () => null }
                ],
                MC_Query$RPT01x3$SUBx1: [
                    { name: "MC_Query$RPT01x3$SUBx1", symbols: [ "MC___", "MC_QSort" ] }
                ],
                MC_Query$RPT01x3: [
                    { name: "MC_Query$RPT01x3", symbols: [ "MC_Query$RPT01x3$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_Query$RPT01x3", symbols: [ ], postprocess: () => null }
                ],
                MC_Query$RPT01x4$SUBx1: [
                    { name: "MC_Query$RPT01x4$SUBx1", symbols: [ "MC___", "MC_QSlice" ] }
                ],
                MC_Query$RPT01x4: [
                    { name: "MC_Query$RPT01x4", symbols: [ "MC_Query$RPT01x4$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_Query$RPT01x4", symbols: [ ], postprocess: () => null }
                ],
                MC_Query: [
                    { name: "MC_Query", symbols: [ "MC_QQuery", "MC_Query$RPT01x1", "MC___", "MC_QYield", "MC_Query$RPT01x2", "MC_Query$RPT01x3", "MC_Query$RPT01x4" ], postprocess: ({data}) => { return { type: TYPES.Query,  source: data[0], filter: data[1]?.[1], yield: data[3], cluster: data[4]?.[1], sort: data[5]?.[1],  slice: data[6]?.[1] }; } }
                ],
                MC_QQuery: [
                    { name: "MC_QQuery", symbols: [ { literal: "query" }, "MC___", "MC_KVInIterator" ], postprocess: ({data}) => { return { kind:data[0].value, iterable: data[2] }; } }
                ],
                MC_QSort$RPT01x1$SUBx1: [
                    { name: "MC_QSort$RPT01x1$SUBx1", symbols: [ "MC___", { literal: "desc" } ] },
                    { name: "MC_QSort$RPT01x1$SUBx1", symbols: [ { literal: "asc" } ] }
                ],
                MC_QSort$RPT01x1: [
                    { name: "MC_QSort$RPT01x1", symbols: [ "MC_QSort$RPT01x1$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_QSort$RPT01x1", symbols: [ ], postprocess: () => null }
                ],
                MC_QSort: [
                    { name: "MC_QSort", symbols: [ { literal: "sort" }, "MC___", "MC_Exp", "MC_QSort$RPT01x1" ], postprocess: ({data}) => { return { expression: data[2], direction: data[3]?.[1].value }; } }
                ],
                MC_QFilter: [
                    { name: "MC_QFilter", symbols: [ { literal: "filter" }, "MC___", "MC_Exp" ], postprocess: ({data}) => { return data[2]; } }
                ],
                MC_QYield: [
                    { name: "MC_QYield", symbols: [ { literal: "list" }, "MC___", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Yield, kind: data[0].value, value: data[2] }; } },
                    { name: "MC_QYield", symbols: [ { literal: "first" }, "MC___", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Yield, kind: data[0].value, value: data[2] }; } },
                    { name: "MC_QYield", symbols: [ { literal: "aggregate" }, "MC__", "MC_Object" ], postprocess: ({data}) => { return { type: TYPES.Yield, kind: data[0].value, value: data[2] }; } },
                    { name: "MC_QYield", symbols: [ { literal: "aggregate" }, "MC___", "MC_Lambda" ], postprocess: ({data}) => { return { type: TYPES.Yield, kind: data[0].value, value: data[2] }; } }
                ],
                MC_QCluster: [
                    { name: "MC_QCluster", symbols: [ { literal: "cluster" }, "MC___", { literal: "(" }, "MC__", "MC_Exp_list", "MC__", { literal: ")" } ], postprocess: ({data}) => { return data[4]; } }
                ],
                MC_QSlice: [
                    { name: "MC_QSlice", symbols: [ { literal: "segment" }, "MC___", "MC_Range" ], postprocess: ({data}) => { return data[2]; } }
                ],
                MC_Range: [
                    { name: "MC_Range", symbols: [ "MC_Exp", "MC__", { literal: "to" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { low: data[0], high: data[4] }; } }
                ],
                MC_Alias: [
                    { name: "MC_Alias", symbols: [ "MC_Reference" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_Alias", symbols: [ "MC_Reference", "MC___", { literal: "as" }, "MC___", "MC_Word" ], postprocess: ({data}) => { return { ...data[0], alias: data[4] }; } },
                    { name: "MC_Alias", symbols: [ "MC_Reference", "MC___", "MC_Word" ], postprocess: ({data}) => { return { ...data[0], alias: data[2] }; } }
                ],
                MC_Alias_list: [
                    { name: "MC_Alias_list", symbols: [ "MC_Alias" ], postprocess: ({data}) => { return [data[0]]; } },
                    { name: "MC_Alias_list", symbols: [ "MC_Alias_list", "MC__", { literal: "," }, "MC__", "MC_Alias" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_Lambda: [
                    { name: "MC_Lambda", symbols: [ { literal: "(" }, "MC__", "MC_FunctionArg_list", "MC__", { literal: ")" }, "MC__", { literal: "=>" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Lambda, arguments: data[2], expression: data[8]  }; } },
                    { name: "MC_Lambda", symbols: [ { literal: "(" }, "MC__", { literal: ")" }, "MC__", { literal: "=>" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Lambda, arguments: data[2], expression: data[6]  }; } },
                    { name: "MC_Lambda", symbols: [ "MC_Word", "MC__", { literal: "=>" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { type: TYPES.Lambda, arguments: data[2], expression: data[4]  }; } }
                ],
                MC_FunctionArg: [
                    { name: "MC_FunctionArg", symbols: [ "MC_Word" ], postprocess: ({data}) => { return { name: data[0] }; } },
                    { name: "MC_FunctionArg", symbols: [ "MC_Word", "MC__", { literal: "=" }, "MC__", "MC_Exp" ], postprocess: ({data}) => { return { name: data[0], default: data[4] }; } }
                ],
                MC_FunctionArg_list: [
                    { name: "MC_FunctionArg_list", symbols: [ "MC_FunctionArg" ], postprocess: ({data}) => { return [data[0]]; } },
                    { name: "MC_FunctionArg_list", symbols: [ "MC_FunctionArg_list", "MC__", { literal: "," }, "MC__", "MC_FunctionArg" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                MC_PropName: [
                    { name: "MC_PropName", symbols: [ "MC_String" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "MC_PropName", symbols: [ "MC_Word" ], postprocess: ({data}) => { return data[0]; } }
                ],
                MC_FunctionCall: [
                    { name: "MC_FunctionCall", symbols: [ "MC_Word", "MC__", { literal: "(" }, "MC__", "MC_Exp_list", "MC__", { literal: ")" } ], postprocess: ({data}) => { return { type: TYPES.Call, name: data[0], args: data[4] }; } },
                    { name: "MC_FunctionCall", symbols: [ "MC_Word", "MC__", { literal: "(" }, "MC__", { literal: ")" } ], postprocess: ({data}) => { return { type: TYPES.Call, name: data[0], args: [] }; } }
                ],
                MC_VariadicLogic$RPT01x1$SUBx1: [
                    { name: "MC_VariadicLogic$RPT01x1$SUBx1", symbols: [ { literal: ";" }, "MC__" ] }
                ],
                MC_VariadicLogic$RPT01x1: [
                    { name: "MC_VariadicLogic$RPT01x1", symbols: [ "MC_VariadicLogic$RPT01x1$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_VariadicLogic$RPT01x1", symbols: [ ], postprocess: () => null }
                ],
                MC_VariadicLogic: [
                    { name: "MC_VariadicLogic", symbols: [ { literal: "any" }, "MC__", { literal: "{" }, "MC__", "MC_Exp_ss", "MC__", "MC_VariadicLogic$RPT01x1", { literal: "}" } ], postprocess: ({data}) => { return { type: TYPES.Logical, operator: data[0].value, operands: data[4] }; } },
                    { name: "MC_VariadicLogic", symbols: [ { literal: "all" }, "MC__", { literal: "{" }, "MC__", "MC_Exp_ss", "MC__", "MC_VariadicLogic$RPT01x2", { literal: "}" } ], postprocess: ({data}) => { return { type: TYPES.Logical, operator: data[0].value, operands: data[4] }; } }
                ],
                MC_VariadicLogic$RPT01x2$SUBx1: [
                    { name: "MC_VariadicLogic$RPT01x2$SUBx1", symbols: [ { literal: ";" }, "MC__" ] }
                ],
                MC_VariadicLogic$RPT01x2: [
                    { name: "MC_VariadicLogic$RPT01x2", symbols: [ "MC_VariadicLogic$RPT01x2$SUBx1" ], postprocess: ({data}) => data[0] },
                    { name: "MC_VariadicLogic$RPT01x2", symbols: [ ], postprocess: () => null }
                ],
                MC_Match: [
                    { name: "MC_Match", symbols: [ { literal: "match" }, "MC__", { literal: "{" }, "MC__", "MC_MatchStatement_list", "MC__", { literal: "}" } ], postprocess: ({data}) => { return { type:TYPES.Match, statements: data[4] }; } }
                ],
                MC_MatchStatement: [
                    { name: "MC_MatchStatement", symbols: [ "MC_Exp", "MC__", { literal: ":" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { condition: data[0], value: data[4] }; } },
                    { name: "MC_MatchStatement", symbols: [ { literal: "default" }, "MC__", { literal: ":" }, "MC__", "MC_Exp", "MC__", { literal: ";" } ], postprocess: ({data}) => { return { type: TYPES.Default , value: data[4] }; } }
                ],
                MC_MatchStatement_list: [
                    { name: "MC_MatchStatement_list", symbols: [ "MC_MatchStatement" ], postprocess: ({data}) => { return data[0].type == TYPES.Default ? ({ default: data[0], conditions: [] }) : ({ conditions: [data[0]] }); } },
                    { name: "MC_MatchStatement_list", symbols: [ "MC_MatchStatement_list", "MC__", "MC_MatchStatement" ], postprocess: ({data}) => { return (data[2].type == TYPES.Default ? data[0].default = data[2] : data[0].conditions.push(data[2])) && data[0]; } }
                ],
                MC__$RPT01x1: [
                    { name: "MC__$RPT01x1", symbols: [ { token: "ws" } ], postprocess: ({data}) => data[0] },
                    { name: "MC__$RPT01x1", symbols: [ ], postprocess: () => null }
                ],
                MC__: [
                    { name: "MC__", symbols: [ "MC__$RPT01x1" ], postprocess: ({data}) => { return null; } }
                ],
                MC___: [
                    { name: "MC___", symbols: [ { token: "ws" } ], postprocess: ({data}) => { return null; } }
                ],
                JSON__$RPT0Nx1: [
                    { name: "JSON__$RPT0Nx1", symbols: [ ] },
                    { name: "JSON__$RPT0Nx1", symbols: [ "JSON_JSON__$RPT0Nx1", { token: "whitespace" } ], postprocess: ({data}) => data[0].concat([data[1]]) }
                ],
                JSON__: [
                    { name: "JSON__", symbols: [ "JSON__$RPT0Nx1" ], postprocess: ({data}) => { return null; } }
                ],
                JSON___$RPT1Nx1: [
                    { name: "JSON___$RPT1Nx1", symbols: [ { token: "whitespace" } ] },
                    { name: "JSON___$RPT1Nx1", symbols: [ "JSON_JSON___$RPT1Nx1", { token: "whitespace" } ], postprocess: ({data}) => data[0].concat([data[1]]) }
                ],
                JSON___: [
                    { name: "JSON___", symbols: [ "JSON___$RPT1Nx1" ], postprocess: ({data}) => { return null; } }
                ],
                JSON_json$SUBx1: [
                    { name: "JSON_json$SUBx1", symbols: [ "JSON_object" ] },
                    { name: "JSON_json$SUBx1", symbols: [ "JSON_array" ] }
                ],
                JSON_json: [
                    { name: "JSON_json", symbols: [ "JSON__", "JSON_json$SUBx1", "JSON__" ], postprocess: ({data}) => { return data[1][0]; } }
                ],
                JSON_object: [
                    { name: "JSON_object", symbols: [ { literal: "{" }, "JSON__", { literal: "}" } ], postprocess: ({data}) => { return {}; } },
                    { name: "JSON_object", symbols: [ { literal: "{" }, "JSON__", "JSON_pair", "JSON_object$RPT0Nx1", "JSON__", { literal: "}" } ], postprocess:  extractObject  }
                ],
                JSON_object$RPT0Nx1: [
                    { name: "JSON_object$RPT0Nx1", symbols: [ ] },
                    { name: "JSON_object$RPT0Nx1", symbols: [ "JSON_JSON_object$RPT0Nx1", "JSON_object$RPT0Nx1$SUBx1" ], postprocess: ({data}) => data[0].concat([data[1]]) }
                ],
                JSON_object$RPT0Nx1$SUBx1: [
                    { name: "JSON_object$RPT0Nx1$SUBx1", symbols: [ "JSON__", { literal: "," }, "JSON__", "JSON_pair" ] }
                ],
                JSON_array: [
                    { name: "JSON_array", symbols: [ { literal: "[" }, "JSON__", { literal: "]" } ], postprocess: ({data}) => { return []; } },
                    { name: "JSON_array", symbols: [ { literal: "[" }, "JSON__", "JSON_value", "JSON_array$RPT0Nx1", "JSON__", { literal: "]" } ], postprocess:  extractArray  }
                ],
                JSON_array$RPT0Nx1: [
                    { name: "JSON_array$RPT0Nx1", symbols: [ ] },
                    { name: "JSON_array$RPT0Nx1", symbols: [ "JSON_JSON_array$RPT0Nx1", "JSON_array$RPT0Nx1$SUBx1" ], postprocess: ({data}) => data[0].concat([data[1]]) }
                ],
                JSON_array$RPT0Nx1$SUBx1: [
                    { name: "JSON_array$RPT0Nx1$SUBx1", symbols: [ "JSON__", { literal: "," }, "JSON__", "JSON_value" ] }
                ],
                JSON_value: [
                    { name: "JSON_value", symbols: [ "JSON_object" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON_value", symbols: [ "JSON_array" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON_value", symbols: [ "JSON_number" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON_value", symbols: [ "JSON_string" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON_value", symbols: [ { literal: "true" } ], postprocess: ({data}) => { return true; } },
                    { name: "JSON_value", symbols: [ { literal: "false" } ], postprocess: ({data}) => { return false; } },
                    { name: "JSON_value", symbols: [ { literal: "null" } ], postprocess: ({data}) => { return null; } }
                ],
                JSON_number: [
                    { name: "JSON_number", symbols: [ { token: "number" } ], postprocess: ({data}) => { return parseFloat(data[0].value); } }
                ],
                JSON_string: [
                    { name: "JSON_string", symbols: [ { token: "string" } ], postprocess: ({data}) => { return JSON.parse(data[0].value); } }
                ],
                JSON_pair: [
                    { name: "JSON_pair", symbols: [ "JSON_key", "JSON__", { literal: ":" }, "JSON__", "JSON_value" ], postprocess: ({data}) => { return [data[0], data[4]]; } }
                ],
                JSON_key: [
                    { name: "JSON_key", symbols: [ "JSON_string" ], postprocess: ({data}) => { return data[0]; } }
                ],
                XMLPlus: [
                    { name: "XMLPlus", symbols: [ "Node" ], postprocess: ({data}) => { return { nodes: data[0] ?[data[0]]:[] }; } },
                    { name: "XMLPlus", symbols: [ "XMLPlus", "_", "Node" ], postprocess: ({data}) => { return { nodes: data[2] ? data[0].nodes.concat(data[2]): data[0].nodes }; } }
                ],
                Node: [
                    { name: "Node", symbols: [ "Element" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Node", symbols: [ "Script" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "Node", symbols: [ { token: "text" } ], postprocess: ({data}) => { return { text: data[0].value }; } },
                    { name: "Node", symbols: [ { literal: "<!--" }, { token: "text" }, { literal: "-->" } ], postprocess: ({data}) => { return null; } }
                ],
                Element: [
                    { name: "Element", symbols: [ { literal: "<" }, "ElementHead", "_", { literal: ">" }, "_", "XMLPlus", "_", { literal: "</" }, { token: "word" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes , nodes: data[5].nodes}; } },
                    { name: "Element", symbols: [ { literal: "<" }, "ElementHead", "_", { literal: "/>" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes, nodes:[] }; } },
                    { name: "Element", symbols: [ { literal: "<" }, "ElementHead", "_", { literal: ">" }, "_", { literal: "</" }, { token: "word" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes , nodes: [] }; } }
                ],
                ElementHead: [
                    { name: "ElementHead", symbols: [ { token: "word" }, "__", "XMLPlusAttributes" ], postprocess: ({data}) => { return { tag: data[0].value, attributes: data[2] }; } },
                    { name: "ElementHead", symbols: [ { token: "word" } ], postprocess: ({data}) => { return { tag: data[0].value, attributes: [] }; } }
                ],
                Script: [
                    { name: "Script", symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: ">" }, "_", "MC_Body", "_", { literal: "</" }, { literal: "script" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes , nodes: [data[5]]}; } },
                    { name: "Script", symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: "/>" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes, nodes:[] }; } },
                    { name: "Script", symbols: [ { literal: "<" }, "ScriptHead", "_", { literal: ">" }, "_", { literal: "</" }, { literal: "script" }, { literal: ">" } ], postprocess: ({data}) => { return { tag: data[1].tag, attributes: data[1].attributes , nodes: [] }; } }
                ],
                ScriptHead: [
                    { name: "ScriptHead", symbols: [ { literal: "script" } ], postprocess: ({data}) => { return { tag: data[0].value, attributes: [] }; } },
                    { name: "ScriptHead", symbols: [ { literal: "script" }, "__", "XMLPlusAttributes" ], postprocess: ({data}) => { return { tag: data[0].value, attributes: data[2] }; } }
                ],
                XMLPlusAttributes: [
                    { name: "XMLPlusAttributes", symbols: [ "XMLPlusAttr" ], postprocess: ({data}) => { return { [data[0].key] : data[0] }; } },
                    { name: "XMLPlusAttributes", symbols: [ "XMLPlusAttributes", "_", "XMLPlusAttr" ], postprocess: ({data}) => { return { ...data[0], [data[2].key]: data[2]  }; } }
                ],
                XMLPlusAttr: [
                    { name: "XMLPlusAttr", symbols: [ { token: "word" }, { literal: "=" }, "JSON" ], postprocess: ({data}) => { return { key: data[0].value, value: data[2], type: 'json' }; } },
                    { name: "XMLPlusAttr", symbols: [ { token: "word" } ], postprocess: ({data}) => { return { key: data[0].value , value: '', type: 'json' }; } },
                    { name: "XMLPlusAttr", symbols: [ { token: "word" }, { literal: "=" }, { literal: "(" }, "_", "MC_Body", "_", { literal: ")" } ], postprocess: ({data}) => { return { key:data[0].value , value: data[4], type: 'script' }; } }
                ],
                JSON: [
                    { name: "JSON", symbols: [ "Object" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON", symbols: [ "Array" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON", symbols: [ "String" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON", symbols: [ "Number" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSON", symbols: [ { literal: "true" } ], postprocess: ({data}) => { return true; } },
                    { name: "JSON", symbols: [ { literal: "false" } ], postprocess: ({data}) => { return false; } },
                    { name: "JSON", symbols: [ { literal: "null" } ], postprocess: ({data}) => { return null; } }
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
                    { name: "Object", symbols: [ { literal: "{" }, "_", "JSONAttributes", "_", { literal: "}" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                Array: [
                    { name: "Array", symbols: [ { literal: "[" }, "_", { literal: "]" } ], postprocess: ({data}) => { return []; } },
                    { name: "Array", symbols: [ { literal: "[" }, "_", "JSON_list", "_", { literal: "]" } ], postprocess: ({data}) => { return data[2]; } }
                ],
                JSON_list: [
                    { name: "JSON_list", symbols: [ "JSON" ], postprocess: ({data}) => { return [ data[0] ]; } },
                    { name: "JSON_list", symbols: [ "JSON_list", "_", { literal: "," }, "_", "JSON" ], postprocess: ({data}) => { return data[0].concat(data[4]); } }
                ],
                JSONAttributes: [
                    { name: "JSONAttributes", symbols: [ "JSONKV" ], postprocess: ({data}) => { return data[0]; } },
                    { name: "JSONAttributes", symbols: [ "JSONAttributes", "_", { literal: "," }, "_", "JSONKV" ], postprocess: ({data}) => { return { ...data[0], ...data[4] }; } }
                ],
                JSONKV: [
                    { name: "JSONKV", symbols: [ "String", "_", { literal: ":" }, "_", "JSON" ], postprocess: ({data}) => { return { [data[0]]: data[4] }; } }
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
                MC_root: {
                    name: "MC_root",
                    rules: [
                        { import: ["MC_keywords"] },
                        { when: /"/, tag: ["dquote"], highlight: "string", goto: "MC_dqstring" },
                        { when: /'/, tag: ["squote"], highlight: "string", goto: "MC_sqstring" },
                        { when: /\d+/, tag: ["digits"], highlight: "number" },
                        { when: /[_a-zA-Z$][_a-zA-Z$\d]*/, tag: ["word"] },
                        { when: "=>", tag: ["l_arrow"], highlight: "keyword" },
                        { when: "!=", tag: ["l_arrow"], highlight: "keyword" },
                        { when: "==", tag: ["l_eqeq"], highlight: "keyword" },
                        { when: ">=", tag: ["l_gteq"], highlight: "keyword" },
                        { when: "<=", tag: ["l_lteq"], highlight: "keyword" },
                        { when: "+=", tag: ["l_add"], highlight: "keyword" },
                        { when: "-=", tag: ["l_sub"], highlight: "keyword" },
                        { when: "/=", tag: ["l_div"], highlight: "keyword" },
                        { when: "%=", tag: ["l_mod"], highlight: "keyword" },
                        { when: "*=", tag: ["l_mul"], highlight: "keyword" },
                        { when: "...", tag: ["l_spread"], highlight: "keyword" },
                        { when: "..", tag: ["l_concat"], highlight: "keyword" },
                        { when: "=", tag: ["l_eq"] },
                        { when: ">", tag: ["l_gt"], highlight: "keyword" },
                        { when: "<", tag: ["l_lt"], highlight: "keyword" },
                        { when: "+", tag: ["l_add"], highlight: "keyword" },
                        { when: "-", tag: ["l_sub"], highlight: "keyword" },
                        { when: "/", tag: ["l_div"], highlight: "keyword" },
                        { when: "%", tag: ["l_mod"], highlight: "keyword" },
                        { when: "*", tag: ["l_mul"], highlight: "keyword" },
                        { when: "?", tag: ["l_qmark"], highlight: "keyword" },
                        { when: "^", tag: ["l_exp"], highlight: "keyword" },
                        { when: ";", tag: ["l_semi"], highlight: "keyword" },
                        { when: ":", tag: ["l_col"], highlight: "keyword" },
                        { when: "!", tag: ["l_exc"], highlight: "keyword" },
                        { when: ".", tag: ["l_dot"] },
                        { when: ",", tag: ["l_comma"], highlight: "delimiter" },
                        { when: "(", tag: ["l_lparen"], highlight: "delimiter", inset: 1 },
                        { when: ")", tag: ["l_rparen"], pop: 1, highlight: "delimiter" },
                        { when: "{", tag: ["l_lcurly"], highlight: "delimiter", inset: 1 },
                        { when: "}", tag: ["l_rcurly"], pop: 1, highlight: "delimiter" },
                        { when: "[", tag: ["l_lbrack"], highlight: "delimiter", inset: 1 },
                        { when: "]", tag: ["l_rbrack"], pop: 1, highlight: "delimiter" },
                        { when: /\s+/, tag: ["ws"] }
                    ]
                },
                MC_keywords: {
                    name: "MC_keywords",
                    rules: [
                        { when: /\@/, tag: ["keyword"], highlight: "keyword" },
                        { when: /set(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /var(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /const(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /asc(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /desc(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /function(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /true(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /false(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /null(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /any(?![a-zA-Z])/, tag: ["keyword","word"], highlight: "keyword" },
                        { when: /all(?![a-zA-Z])/, tag: ["keyword","word"], highlight: "keyword" },
                        { when: /within(?![a-zA-Z])/, tag: ["keyword","word"], highlight: "keyword" },
                        { when: /between(?![a-zA-Z])/, tag: ["keyword","word"], highlight: "keyword" },
                        { when: /and(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /or(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /on(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /if(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /match(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /default(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /in(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /else(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /for(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /like(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /not(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /while(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /until(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /to(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /do(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /run(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /return(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /query(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /scan(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /segment(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /filter(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /sort(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /aggregate(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /cluster(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /list(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" },
                        { when: /first(?![a-zA-Z])/, tag: ["keyword"], highlight: "keyword" }
                    ]
                },
                MC_dqstring: {
                    name: "MC_dqstring",
                    rules: [
                        { when: /\\[\/bnrft]/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\"/, tag: ["quoteEscape"] },
                        { when: /\\u[A-Fa-f\d]{4}/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\./, tag: ["badEscape"] },
                        { when: /[^"\\]+/, tag: ["string"], highlight: "string" },
                        { when: "\"", tag: ["dquote"], pop: 1, highlight: "string" }
                    ]
                },
                MC_sqstring: {
                    name: "MC_sqstring",
                    rules: [
                        { when: /\\[\/bnrft]/, tag: ["escaped"] },
                        { when: /\\'/, tag: ["quoteEscape"] },
                        { when: /\\u[A-Fa-f\d]{4}/, tag: ["escaped"] },
                        { when: /\\./, tag: ["badEscape"] },
                        { when: /[^'\\]+/, tag: ["string"], highlight: "string" },
                        { when: "'", tag: ["squote"], pop: 1, highlight: "string" }
                    ]
                },
                JSON_whitespace: {
                    name: "JSON_whitespace",
                    rules: [
                        { when: /\s+/, tag: ["whitespace"] }
                    ]
                },
                JSON_json: {
                    name: "JSON_json",
                    rules: [
                        { import: ["JSON_whitespace"] },
                        { when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/, tag: ["number"] },
                        { when: /"(?:\\["bfnrt\/\\]|\\u[a-fA-F0-9]{4}|[^"\\])*"/, tag: ["string"] },
                        { when: "{", tag: ["{"] },
                        { when: "}", tag: ["}"] },
                        { when: "[", tag: ["["] },
                        { when: "]", tag: ["]"] },
                        { when: ",", tag: [","] },
                        { when: ":", tag: [":"] },
                        { when: "true", tag: ["true"] },
                        { when: "false", tag: ["false"] },
                        { when: "null", tag: ["null"] }
                    ]
                },
                root: {
                    name: "root",
                    rules: [
                        { import: ["commentStart"] },
                        { when: /<\//, goto: "footTag" },
                        { when: /</, goto: "headTag" },
                        { when: /[^<]+/, tag: ["text"] }
                    ]
                },
                headTag: {
                    name: "headTag",
                    rules: [
                        { when: /script(?![a-z_A-Z\d\-:!])/, highlight: "tag", set: "scriptHeadTag" },
                        { when: /style(?![a-z_A-Z\d\-:!])/, tag: ["word"], highlight: "tag", set: "styleHeadTag" },
                        { when: /output(?![a-z_A-Z\d\-:!])/, tag: ["word"], highlight: "tag", set: "outputHeadTag" },
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "tag", set: "stdHeadTag" }
                    ]
                },
                footTag: {
                    name: "footTag",
                    rules: [
                        { when: /\s+/, tag: ["space"] },
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "tag" },
                        { when: ">", pop: 1 }
                    ]
                },
                attributes: {
                    name: "attributes",
                    rules: [
                        { when: "/>", pop: 1 },
                        { when: /[a-z_A-Z:!][a-z_A-Z\d\-:!]*/, tag: ["word"], highlight: "attribute.name" },
                        { when: "=" },
                        { when: "(", goto: "MC_root" },
                        { import: ["json"] }
                    ]
                },
                stdHeadTag: {
                    name: "stdHeadTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", pop: 1 }
                    ]
                },
                scriptHeadTag: {
                    name: "scriptHeadTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "scriptBody" }
                    ]
                },
                scriptBody: {
                    name: "scriptBody",
                    rules: [
                        { when: "</script>", pop: 1, before: true },
                        { import: ["MC_root"] }
                    ]
                },
                styleHeadTag: {
                    name: "styleHeadTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "styleBody" }
                    ]
                },
                styleBody: {
                    name: "styleBody",
                    unmatched: "text",
                    rules: [
                        { when: "</style>", pop: 1, before: true }
                    ]
                },
                outputHeadTag: {
                    name: "outputHeadTag",
                    rules: [
                        { when: /content\s*=\s*"html"/, before: true, set: "outputHeadHTMLTag" },
                        { when: /content\s*=\s*"json"/, before: true, set: "outputHeadJSONTag" },
                        { when: /content\s*=\s*"xml"/, before: true, set: "outputHeadXMLTag" },
                        { when: /content\s*=\s*"script"/, before: true, set: "outputHeadScriptTag" },
                        { import: ["attributes"] },
                        { when: ">", set: "outputBody" }
                    ]
                },
                outputHeadScriptTag: {
                    name: "outputHeadScriptTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "outputScriptBody" }
                    ]
                },
                outputScriptBody: {
                    name: "outputScriptBody",
                    rules: [
                        { when: "</output>", pop: 1, before: true },
                        { import: ["MC_root"] }
                    ]
                },
                outputHeadHTMLTag: {
                    name: "outputHeadHTMLTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "outputEmbedBody" }
                    ]
                },
                outputHeadXMLTag: {
                    name: "outputHeadXMLTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "outputEmbedBody" }
                    ]
                },
                outputHeadJSONTag: {
                    name: "outputHeadJSONTag",
                    rules: [
                        { import: ["attributes"] },
                        { when: ">", set: "outputHeadJSONBody" }
                    ]
                },
                outputHeadJSONBody: {
                    name: "outputHeadJSONBody",
                    rules: [
                        { when: "</output>", pop: 1, before: true },
                        { import: ["json"] }
                    ]
                },
                outputBody: {
                    name: "outputBody",
                    unmatched: "text",
                    rules: [
                        { when: "</output>", pop: 1, before: true }
                    ]
                },
                outputEmbedBody: {
                    name: "outputEmbedBody",
                    unmatched: "text",
                    rules: [
                        { when: "</output>", pop: 1, before: true }
                    ]
                },
                commentStart: {
                    name: "commentStart",
                    rules: [
                        { when: "<!--", tag: ["commentStart"], goto: "commentEnd" }
                    ]
                },
                commentEnd: {
                    name: "commentEnd",
                    unmatched: "text",
                    rules: [
                        { when: "-->", tag: ["commentEnd"], pop: 1 }
                    ]
                },
                json: {
                    name: "json",
                    rules: [
                        { when: /\s+/, tag: ["space"] },
                        { when: /-?(?:[0-9]|[1-9][0-9]+)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?\b/, tag: ["number"], highlight: "number" },
                        { when: /"/, tag: ["dquote"], highlight: "attribute.value", goto: "json_string" },
                        { when: "{", inset: 1 },
                        { when: "}", pop: 1 },
                        { when: "[", inset: 1 },
                        { when: "]", pop: 1 },
                        { when: "," },
                        { when: ":" },
                        { when: "true", highlight: "keyword" },
                        { when: "false", highlight: "keyword" },
                        { when: "null", highlight: "keyword" }
                    ]
                },
                json_string: {
                    name: "json_string",
                    rules: [
                        { when: /\\[\/bnrft]/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\"/, tag: ["quoteEscape"] },
                        { when: /\\u[A-Fa-f\d]{4}/, tag: ["escaped"], highlight: "constant" },
                        { when: /\\./, tag: ["badEscape"] },
                        { when: /[^"\\]+/, tag: ["string"], highlight: "attribute.value" },
                        { when: /"/, tag: ["dquote"], pop: 1, highlight: "attribute.value" }
                    ]
                }
            }
        }
    }
}

export default GWLanguage;