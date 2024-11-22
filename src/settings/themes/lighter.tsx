import { Color, Theme, ThemeType } from "../../components/theme/utils";

const theme = {
  type: ThemeType.Lighter,
  colors: {
    primary: new Color("#0e67aa", "#0a588a"),
    secondary: new Color("#D3FACC", "#8cf57d"),
    success: new Color("#53d9b7", "#06928a"),
    danger: new Color("#ff0043", "#b62153"),
    warning: new Color("#ed725c", "#e85f58"),
    info: new Color("#FDC17B", "#a57d4f"),
    light: new Color("#fff", "#F4F4F4"),
    dark: new Color("#171717", "#111111"),
    link: new Color("#002033", "#0a588a"),
    transparent: new Color("transparent"),
    grayLight: new Color("#F4F4F4", "#e7e7e7"),
    gray: new Color("#dddddd", "#e7e7e7"),
    grayDark: new Color("#bbb", "#a7a7a7"),
    transparentColorHover: new Color("transparent", "#0B72B4"),
  },
  background: "#fff 20%,  #b4bbc0 100%",
  defaultStyles: {
    borderRadius: "12px",
    boxShadow: "0 0 1px 0 rgba(0, 0, 0, 0.4)",
  },
  elements: {
    selection: {
      background: "#0a588a",
      color: "#fff",
    },
    headerIcon: {
      borderRadius: "6px",
    },
    dropdown: {
      boxShadow: "0px 5px 5px 0 rgba(0, 0, 0, 0.2)",
      borderRadius: "10px",
    },
    pophover: {
      boxShadow: "0px 2px 10px 0 rgba(0, 0, 0, 0.4)",
      borderRadius: "10px",
    },
    especialInput: {
      borderRadius: "12px",
      boxShadow: "0px 2px 5px 0 rgba(0, 0, 0, 0.2)",
      background: "rgba(255, 255, 255, 0.8)",
      color: "#002033",
    },
    input: {
      borderRadius: "12px",
      background: "#F4F4F4",
      color: "#002033",
    },
    textarea: {
      borderRadius: "6px",
    },
    lines: "1px solid rgba(0, 0, 0, 0.1)",
  },
} as Theme;

export default theme;
