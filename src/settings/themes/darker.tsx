import { Color, Theme, ThemeType } from "../../components/theme/utils";

const theme = {
  type: ThemeType.Darker,
  colors: {
    primary: new Color("#09588a", "#022a4e"),
    secondary: new Color("#349e85", "#287c69"),
    success: new Color("#53d9b7", "#06928a"),
    danger: new Color("#ff0043", "#b62153"),
    warning: new Color("#ed725c", "#e85f58"),
    info: new Color("#FCB86F", "#dd9445"),
    light: new Color("#171717", "#131313"),
    dark: new Color("#fff", "#e8e8e8"),
    link: new Color("#fff", "#0B72B4"),
    transparent: new Color("transparent"),
    grayLight: new Color("#2e2e2e", "#252525"),
    gray: new Color("#222222", "#4e4e4e"),
    grayDark: new Color("#242424", "#242424"),
    transparentColorHover: new Color("transparent", "#525252"),
  },
  background: "#0c0c0c 0%, #111111 50%, #141414 100%",
  defaultStyles: {
    borderRadius: "12px",
    boxShadow: "0 0 2px 0 rgba(255, 255, 255, 0.5)",
  },
  elements: {
    selection: {
      background: "#ffffff",
      color: "#011c36",
    },
    input: {
      borderRadius: "12px",
      boxShadow: "0px 2px 5px 0 rgba(0, 0, 0, 0.15)",
      background: "#252525",
      color: "#fff",
    },
  },
} as Theme;

export default theme;
