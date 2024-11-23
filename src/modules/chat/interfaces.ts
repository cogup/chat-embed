export interface ConfigTokens {
  darkMode?: boolean;
  boxShadowContainer?: string;
  borderRadius?: string;
  inputBorderRadius?: string;
  buttonSendBorderRadius?: string;
  inputBoxShadow?: string;
  inputBackgroundColor?: string;
  inputColor?: string;
  inputColorBorder?: string;
  ballonSystemColor?: string;
  colorLight?: string;
  colorDark?: string;
  colorNoCheck?: string;
  colorCheck?: string;
  balloonUserColor?: string;
  balloonAssistantColor?: string;
  buttonSendColor?: string;
  backgroundSiteImage?: string;
  backgroundSiteColor?: string;
  backgroundChatColor?: string;
  backgroundChatImage?: string;
}

export interface ConfigThemes {
  light?: ConfigTokens;
  dark?: ConfigTokens;
}
export type Config = {
  themes?: ConfigThemes;
  token: string;
};
