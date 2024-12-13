import { CreateMonarchTokenizer } from "grammar-well/utility";
import grammar from "./xml.js";

if (!window['Monaco']) {
  window['Monaco'] = await import('monaco-editor');
}

if (window['Monaco']) {
  if (!window['Monaco'].languages.getEncodedLanguageId('xmlplus')) {
    const g = new grammar();
    const tokensProvider = await CreateMonarchTokenizer(g.artifacts.lexer);
    console.log('test', tokensProvider)
    window['Monaco'].languages.register({ id: 'xmlplus' });
    window['Monaco'].languages.setMonarchTokensProvider('xmlplus', tokensProvider);
  }
}