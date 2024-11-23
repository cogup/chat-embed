import { Color, Theme, Tokens } from "../../components/theme/utils";

const light = {
  colorDark: new Color("#171717"),
  colorLight: new Color("#fff"),
  backgroundSiteColor: new Color("#fff"),
  backgroundChatColor: new Color("#ccc"),
  inputBackgroundColor: new Color("#fff"),
  inputColorBorder: new Color("#fff"),
  colorNoCheck: new Color("#afafaf"),
  colorCheck: new Color("#171717"),
  ballonSystemColor: new Color("#2e2e2e"),
  balloonUserColor: new Color("#ffffff"),
  balloonAssistantColor: new Color("#02498b"),
  buttonSendColor: new Color("#02498b"),
  boxShadowContainer: "0 0 2px 0 rgba(0, 0, 0, 0.5)",
  buttonSendBorderRadius: "50%",
  borderRadius: "12px",
  inputColor: "#171717",
  inputBorderRadius: "30px",
  inputBoxShadow: "0px 2px 5px 0 rgba(0, 0, 0, 0.15)",
  backgroundSiteImage: "",
  backgroundChatImage: "",
  darkMode: false,
} as Tokens;

const dark = {
  colorDark: new Color("#171717"),
  colorLight: new Color("#fff"),
  backgroundSiteColor: new Color("#0a0a0a"),
  backgroundChatColor: new Color("#141414"),
  inputBackgroundColor: new Color("#202020"),
  inputColorBorder: new Color("#171717"),
  colorNoCheck: new Color("#afafaf"),
  colorCheck: new Color("#171717"),
  ballonSystemColor: new Color("#2e2e2e"),
  balloonUserColor: new Color("#202020"),
  balloonAssistantColor: new Color("#002a52"),
  buttonSendColor: new Color("#002a52"),
  boxShadowContainer: "0 0 2px 0 rgba(0, 0, 0, 0.5)",
  buttonSendBorderRadius: "50%",
  borderRadius: "12px",
  inputColor: "#fff",
  inputBorderRadius: "30px",
  inputBoxShadow: "0px 2px 5px 0 rgba(0, 0, 0, 0.15)",
  backgroundSiteImage: "",
  backgroundChatImage: "",
  darkMode: false,
} as Tokens;

export default {
  light,
  dark,
} as Theme;
