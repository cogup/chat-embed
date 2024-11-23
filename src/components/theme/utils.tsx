import { Colord, colord } from "colord";
import { useEffect, useState } from "react";
import { Config } from "../../modules/chat/interfaces";

export enum ColorType {
  PRIMARY = "primary",
  SECONDARY = "secondary",
  SUCCESS = "success",
  DANGER = "danger",
  WARNING = "warning",
  INFO = "info",
  LIGHT = "light",
  DARK = "dark",
  LINK = "link",
}

export interface Theme {
  darkMode: boolean;
  boxShadowContainer: string;
  borderRadius: string;
  inputBorderRadius: string;
  buttonSendBorderRadius: string;
  inputBoxShadow: string;
  inputBackgroundColor: Color;
  inputColor: string;
  inputColorBorder: Color;
  ballonSystemColor: Color;
  colorLight: Color;
  colorDark: Color;
  colorNoCheck: Color;
  colorCheck: Color;
  balloonUserColor: Color;
  balloonAssistantColor: Color;
  buttonSendColor: Color;
  backgroundSiteImage: string;
  backgroundSiteColor: Color;
  backgroundChatColor: Color;
  backgroundChatImage: string;
}

export const mergeTheme = (config: Config, theme: Theme): Theme => {
  return {
    ...theme,
    balloonAssistantColor: config.balloonAssistantColor
      ? new Color(config.balloonAssistantColor)
      : theme.balloonAssistantColor,
    balloonUserColor: config.balloonUserColor
      ? new Color(config.balloonUserColor)
      : theme.balloonUserColor,
    backgroundChatImage: config.backgroundChatImage
      ? config.backgroundChatImage
      : theme.backgroundChatImage,
    backgroundChatColor: config.backgroundChatColor
      ? new Color(config.backgroundChatColor)
      : theme.backgroundChatColor,
    backgroundSiteColor: config.backgroundSiteColor
      ? new Color(config.backgroundSiteColor)
      : theme.backgroundSiteColor,
    backgroundSiteImage: config.backgroundSiteImage
      ? config.backgroundSiteImage
      : theme.backgroundSiteImage,
    buttonSendColor: config.buttonSendColor
      ? new Color(config.buttonSendColor)
      : theme.buttonSendColor,
  };
};

export class Color {
  public color: Colord;
  private hoverColor?: Color;
  private colorTextLight?: Color;
  private colorTextDark?: Color;
  private darkMode?: boolean;
  private transparent: boolean;

  constructor(color: string, darkMode?: boolean) {
    if (color === "transparent") {
      this.transparent = true;
      this.color = darkMode
        ? colord("rgba(0, 0, 0, 0)")
        : colord("rgba(255, 255, 255, 0)");
    } else {
      this.transparent = false;
      this.color = colord(color);
    }

    this.darkMode = darkMode;
  }

  get value() {
    return this.color.toRgbString();
  }

  alpha(value: number) {
    return this.color.alpha(value).toRgbString();
  }

  get hover(): Color {
    if (this.hoverColor) {
      return this.hoverColor;
    }

    return this;
  }

  setColorTextLight(color: Color) {
    this.colorTextLight = color;
  }

  setColorTextDark(color: Color) {
    this.colorTextDark = color;
  }

  setDarkMode(darkMode: boolean) {
    this.darkMode = darkMode;
  }

  get colord() {
    return this.color;
  }

  get textColord() {
    return this.color.isLight()
      ? this.colorTextDark?.colord
      : this.colorTextLight?.colord;
  }

  get text() {
    if (this.colorTextDark?.value && this.colorTextLight?.value) {
      if (this.darkMode) {
        return this.color.isLight()
          ? this.colorTextLight.value
          : this.colorTextDark.value;
      }

      return this.color.isLight()
        ? this.colorTextDark.value
        : this.colorTextLight.value;
    }
  }
}

export const resolveTheme = (theme: Theme): Theme => {
  const fixTheme = theme as Record<string, any>;

  const keys = Object.keys(theme) as (keyof Theme)[];

  for (const item in keys) {
    if (fixTheme[item] instanceof Color) {
      const upColor = fixTheme[item] as Color;

      upColor.setColorTextLight(theme.colorLight);
      upColor.setColorTextDark(theme.colorDark);
      upColor.setDarkMode(theme.darkMode);

      upColor.hover.setColorTextDark(theme.colorDark);
      upColor.hover.setColorTextLight(theme.colorLight);
      upColor.hover.setDarkMode(theme.darkMode);

      fixTheme[item] = upColor;
    }
  }

  return fixTheme as Theme;
};

/**
 * Hook to check if a media query matches
 * @param query The media query to check
 * @returns Whether the media query matches
 * @example
 * const isSmall = useMediaQuery("(max-width: 600px)");
 */
export const useMediaQuery = (query: string) => {
  const mediaQuery = window.matchMedia(query);
  const [matches, setMatches] = useState(mediaQuery.matches);

  useEffect(() => {
    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  });

  return matches;
};

export const useIsMobile = () => {
  return useMediaQuery("(max-width: 768px)");
};
