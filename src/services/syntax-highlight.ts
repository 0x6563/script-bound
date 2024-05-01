import { CreateMonarchTokenizer } from "grammar-well/utility";
import lexer from "./lexer.json";

if (!window['Monaco']) {
  window['Monaco'] = await import('monaco-editor');
}

if (window['Monaco']) {
  if (!window['Monaco'].languages.getEncodedLanguageId('xmlplus')) {
    const tokensProvider = await CreateMonarchTokenizer(lexer as any);
    console.log('test', tokensProvider)
    window['Monaco'].languages.register({ id: 'xmlplus' });
    window['Monaco'].languages.setMonarchTokensProvider('xmlplus', tokensProvider);
  }
}