import React, { useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { resolveTokens, mergeTheme, Tokens } from "./utils";
import { Config } from "../../modules/chat/interfaces";
import defaultTheme from "../../settings/themes/default";
interface ThemeProps {
  children: React.ReactNode;
  config: Config | null;
}
export const t = (t: DefaultTheme): Tokens => t as Tokens;

const Theme: React.FC<ThemeProps> = ({ children, config }) => {
  const defaultThemeMerged = config
    ? mergeTheme(config, defaultTheme)
    : defaultTheme;

  console.log({ defaultThemeMerged });

  const [theme, setTheme] = useState(defaultThemeMerged.light);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      setTheme({ ...defaultThemeMerged.dark, darkMode: true });
    } else {
      setTheme({ ...defaultThemeMerged.light, darkMode: false });
    }
  }, [darkMode]);

  useEffect(() => {
    const changeTheme = (event: MediaQueryListEvent) => {
      setDarkMode(event.matches);
    };

    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    setDarkMode(darkQuery.matches);

    darkQuery.addEventListener("change", changeTheme);

    return () => {
      darkQuery.removeEventListener("change", changeTheme);
    };
  }, []);

  const getTheme = () => {
    return resolveTokens(theme, darkMode);
  };

  return <ThemeProvider theme={getTheme()}>{children}</ThemeProvider>;
};

export default Theme;
