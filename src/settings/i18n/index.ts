import { Index, PT_BR, EN_US, ES } from "./texts";

export { PT_BR, EN_US, ES, Index };
  
export enum Language { 
  EN_US = "en-US",
  PT_BR = "pt-BR",
  ES = "es",
}

function resolveProps(text: string, props?: Record<string, string>): string {
  if (!props) {
    return text;
  }

  let result = text;

  Object.keys(props).forEach((key) => {
    const value = props[key];
    result = result.replace(`{${key}}`, value);
  });

  return result;
}


const getLanguage = () => {
  const lang = localStorage.getItem('settings.lang');

  if (!lang || lang === "system") {
    if (navigator.language === Language.PT_BR) return Language.PT_BR;
    if (navigator.language === Language.ES) return Language.ES;
    return
  }

  return lang as Language;
}

export default function __(textKey: Index, props?: Record<string, string>): string {
  const key = textKey.toString();

  switch (getLanguage()) {
    case Language.PT_BR:
      return resolveProps(PT_BR[key] ?? EN_US[key], props);
    case Language.ES:
      return resolveProps(ES[key] ?? EN_US[key], props);
    default:
      return resolveProps(EN_US[key], props);
  }
}