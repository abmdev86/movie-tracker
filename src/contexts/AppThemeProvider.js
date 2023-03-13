import { createContext, useMemo, useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import { createTheme } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";

export const AppLightThemeOptions = {
  palette: {
    mode: "light",
    primary: {
      main: "#c78283",
      dark: "#160c04",
    },
    secondary: {
      main: "#85756e",
    },
    text: {
      primary: "#191516",
    },
    error: {
      main: "#d81159",
    },
    background: {
      default: "#e5ecf4",
      paper: "#cdc5b4",
    },
  },
};
export const AppDarkTheme = {
  palette: {
    mode: "dark",
    primary: {
      main: "#c78283",
      dark: "#160c04",
    },
    secondary: {
      main: "#85756e",
    },
    text: {
      primary: "#191516",
    },
    error: {
      main: "#d81159",
    },
    background: {
      default: "#040F0F",
      paper: "#cdc5b4",
    },
  },
};

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === "light"
      ? {
          primary: {
            main: "#c78283",
            dark: "#160c04",
          },
          secondary: {
            main: "#85756e",
          },
          text: {
            primary: "#191516",
          },
          error: {
            main: "#d81159",
          },
          background: {
            default: "#e5ecf4",
            paper: "#cdc5b4",
          },
        }
      : {
          primary: {
            main: "#c78283",
            dark: "#160c04",
          },
          secondary: {
            main: "#85756e",
          },
          text: {
            primary: "#191516",
          },
          error: {
            main: "#d81159",
          },
          background: {
            default: "#040F0F",
            paper: "#cdc5b4",
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
  console.log("getDesignTokens", getDesignTokens(themeMode));
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
