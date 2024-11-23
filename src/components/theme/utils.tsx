import { Colord, colord } from "colord";
import { useEffect, useState } from "react";
import { Config, ConfigTokens } from "../../modules/chat/interfaces";

export interface Tokens {
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

export interface Themes {
  light: Tokens;
  dark: Tokens;
}

export const mergeTheme = (config: Config, themes: Themes): Themes => {
  console.log({ config, themes });
  return {
    light: {
      ...themes.light,
      ...tokensToColor(config.themes?.light),
    },
    dark: {
      ...themes.dark,
      ...tokensToColor(config.themes?.dark),
    },
  };
};

const tokensToColor = (tokens?: ConfigTokens): Record<string, any> => {
  const newObject: Record<string, any> = {};

  if (!tokens) {
    return newObject;
  }

  const object = tokens as Record<string, any>;

  Object.keys(object).forEach((key) => {
    if (
      typeof object[key] === "string" &&
      (object[key].startsWith("#") || object[key].startsWith("rgb"))
    ) {
      newObject[key] = new Color(object[key]);
    } else {
      newObject[key] = object[key];
    }
  });

  return newObject;
};

export class Color {
  public color: Colord;
  private colorTextLight?: Color;
  private colorTextDark?: Color;
  private darkMode?: boolean;

  constructor(color: string) {
    this.color = colord(color);
  }

  get value() {
    return this.color.toRgbString();
  }

  alpha(value: number) {
    return this.color.alpha(value).toRgbString();
  }

  get hover(): Color {
    return new Color(this.color.darken(0.5).toHex());
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
      return this.color.isLight()
        ? this.colorTextDark.value
        : this.colorTextLight.value;
    }
  }
}

export const resolveTokens = (tokens: Tokens, darkMode: boolean): Tokens => {
  const fixTokens = tokens as Record<string, any>;

  Object.keys(tokens).forEach((key) => {
    if (fixTokens[key] instanceof Color) {
      const upColor = fixTokens[key] as Color;

      upColor.setColorTextLight(fixTokens.colorLight);
      upColor.setColorTextDark(fixTokens.colorDark);

      upColor.hover.setColorTextLight(fixTokens.colorLight);
      upColor.hover.setColorTextDark(fixTokens.colorDark);

      fixTokens[key] = upColor;
    }
  });

  return fixTokens as Tokens;
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
