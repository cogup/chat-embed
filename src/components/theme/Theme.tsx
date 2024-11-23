import React, { useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import { resolveTheme, Theme as ITheme, mergeTheme } from "./utils";
import { Config } from "../../modules/chat/interfaces";
import defaultTheme from "../../settings/themes/default";
interface ThemeProps {
  children: React.ReactNode;
  config: Config | null;
}
export const t = (t: DefaultTheme): ITheme => t as ITheme;

const Theme: React.FC<ThemeProps> = ({ children, config }) => {
  const [theme, setTheme] = useState(
    config ? mergeTheme(config, defaultTheme) : defaultTheme
  );
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (config && config.darkMode && darkMode) {
      setTheme({ ...defaultTheme, darkMode: true });
    } else {
      setTheme({ ...defaultTheme, darkMode: false });
    }
  }, [config, config?.darkMode, darkMode]);

  useEffect(() => {
    if (config && config.darkMode) {
      const changeTheme = (event: MediaQueryListEvent) => {
        setDarkMode(event.matches);
      };

      const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

      setDarkMode(darkQuery.matches);

      darkQuery.addEventListener("change", changeTheme);

      return () => {
        darkQuery.removeEventListener("change", changeTheme);
      };
    }
  }, []);

  return <ThemeProvider theme={resolveTheme(theme)}>{children}</ThemeProvider>;
};

export default Theme;
