import { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#177e89",
          },
          secondary: {
            main: "#f4d35e",
          },
          text: {
            primary: "#191516",
          },
          error: {
            main: "#d81159",
          },
          background: {
            default: "#E0E2DB",
            paper: "#D2D4C8",
          },
        }
      : {
          primary: {
            main: "#c78283",
            dark: "#160c04",
          },
          secondary: {
            main: "#021A1E",
          },
          text: {
            primary: "#fff",
          },
          error: {
            main: "#d81159",
          },
          background: {
            default: "#040F0F",
            paper: "#2E3532",
          },
        }),
  },
});

export const AppModeContext = createContext({ toggleColorMode: () => {} });
export default function AppThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState("light");
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setThemeMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const currentAppTheme = useMemo(
    () => createTheme(getDesignTokens(themeMode)),
    [themeMode]
  );

  return (
    <AppModeContext.Provider value={colorMode}>
      <ThemeProvider theme={currentAppTheme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </AppModeContext.Provider>
  );
}
