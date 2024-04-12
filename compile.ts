import { CompileGrammar } from "./utils/compile";
import { Read, Write } from "./utils/file";

const grammar = Read('./src/services/xml.gwell');

const language = await CompileGrammar(grammar);
Write('./src/services/xml.js', language);

const json = await CompileGrammar(grammar, 'json' as any);
const { state } = JSON.parse(json as string);
Write('./src/services/lexer.json', JSON.stringify(state.lexer));
