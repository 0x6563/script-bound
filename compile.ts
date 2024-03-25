import { CompileGrammar } from "./utils/compile";
import { Read, Write } from "./utils/file";

const grammar = Read('./src/services/xml.gwell');
const language = await CompileGrammar(grammar);
Write('./src/services/xml.js', language);
 