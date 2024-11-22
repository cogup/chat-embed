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
  TRANSPARENT = "transparent",
  TRANSPARENT_COLOR_HOVER = "transparentColorHover",
}

export const getColorByType = (type: ColorType, theme: Theme) => {
  return theme.colors[type];
};

export enum ThemeType {
  Lighter,
  Darker,
}

export interface Theme {
  type: ThemeType;
  colors: Colors;
  defaultStyles: CSSStyleDeclaration;
  darkMode: boolean;
  background: string;
  elements: {
    selection: {
      background: string;
      color: string;
    };
    box: {
      boxShadow: string;
      borderRadius: string;
    };
    headerIcon: {
      borderRadius: string;
    };
    dropdown: {
      borderRadius: string;
      boxShadow: string;
    };
    pophover: {
      borderRadius: string;
      boxShadow: string;
    };
    input: {
      borderRadius: string;
      boxShadow: string;
      background: string;
      color: string;
    };
    textarea: {
      borderRadius: string;
    };
    especialInput: {
      borderRadius: string;
      boxShadow: string;
      background: string;
      color: string;
    };
    lines: string;
  };
}

export interface Colors {
  primary: Color;
  secondary: Color;
  success: Color;
  danger: Color;
  warning: Color;
  info: Color;
  light: Color;
  dark: Color;
  link: Color;
  transparent: Color;
  gray: Color;
  grayDark: Color;
  grayLight: Color;
  transparentColorHover: Color;
}

export class Color {
  public color: Colord;
  private hoverColor?: Color;
  private colorTextLight?: Color;
  private colorTextDark?: Color;
  private darkMode?: boolean;
  private transparent: boolean;

  constructor(color: string, hoverColor?: string, darkMode?: boolean) {
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

    if (hoverColor) {
      this.hoverColor = new Color(hoverColor, undefined, darkMode);
    }
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
      if (this.transparent) {
        return this.colorTextDark.value;
      }

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
  const colors = theme.colors;

  for (const color in theme.colors) {
    const upColor = theme.colors[color as keyof Colors];

    upColor.setColorTextLight(theme.colors.light);
    upColor.setColorTextDark(theme.colors.dark);
    upColor.setDarkMode(theme.darkMode);

    upColor.hover.setColorTextDark(theme.colors.dark);
    upColor.hover.setColorTextLight(theme.colors.light);
    upColor.hover.setDarkMode(theme.darkMode);

    colors[color as keyof Colors] = upColor;
  }

  return {
    ...theme,
    colors,
  };
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

export const mergeTheme = (config: Config, theme: Theme): Theme => {
  return {
    ...theme,
    colors: {
      ...theme.colors,
      primary: config.colorPrimary
        ? new Color(config.colorPrimary, config.colorPrimary)
        : theme.colors.primary,
    },
    background: theme.background,
  };
};
