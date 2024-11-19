import React, { useEffect, useState } from "react";
import { DefaultTheme, ThemeProvider } from "styled-components";
import lighter from "../../settings/themes/lighter";
import darker from "../../settings/themes/darker";
import { resolveTheme, Theme as ITheme } from "./utils";

interface ThemeProps {
  children: React.ReactNode;
}
export const t = (t: DefaultTheme): ITheme => t as ITheme;

const Theme: React.FC<ThemeProps> = ({ children }) => {
  const [theme, setTheme] = useState(lighter);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      setTheme({ ...darker, darkMode: true });
    } else {
      setTheme({ ...lighter, darkMode: false });
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

  return <ThemeProvider theme={resolveTheme(theme)}>{children}</ThemeProvider>;
};

export default Theme;
