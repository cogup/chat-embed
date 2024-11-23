import { Color, Theme, ThemeType } from "../../components/theme/utils";

const theme = {
  type: ThemeType.Darker,
  colorNoCheck: new Color("#c1cfd8", "#d6e0e9"),
  colorCheck: new Color("#349e85", "#287c69"),
  inputColorBorder: new Color("#2e2e2e", "#252525"),
  ballonSystemColor: new Color("#2e2e2e", "#252525"),
  colorDark: new Color("#fff", "#e8e8e8"),
  colorLight: new Color("#171717", "#131313"),
  balloonUserColor: new Color("#FCB86F", "#dd9445"),
  balloonAssistantColor: new Color("#349e85", "#287c69"),
  buttonSendColor: new Color("#c1cfd8", "#d6e0e9"),
  borderRadius: "12px",
  boxShadowContainer: "0 0 2px 0 rgba(255, 255, 255, 0.5)",
  inputBackgroundColor: "#2e2e2e",
  inputColor: "#fff",
  inputBorderRadius: "30px",
  buttonSendBorderRadius: "10px",
  inputBoxShadow: "0px 2px 5px 0 rgba(0, 0, 0, 0.15)",
  backgroundSiteImage: "",
  backgroundSiteColor: new Color("#171717", "#131313"),
  backgroundChatColor: new Color("#2e2e2e", "#252525"),
  backgroundChatImage: "",
} as Theme;

export default theme;
