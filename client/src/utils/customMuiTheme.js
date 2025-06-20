import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/poppins";

export const getTheme = (mode = "light") => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? // darkmode
          {
            background: {
              default: "#04070b",
              paper: "#0d1117",
            },
            text: {
              primary: "#ffffff", // white text in dark mode
              secondary: "#aeb0b3",
            },
            divider: "#333b4d",
          }
        : // light mode
          {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
            text: {
              primary: "#000000", // black text in light mode
              secondary: "#555555",
            },
            divider: "#dddddd",
          }),
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
    },

    components: {
      MuiIcon: {
        styleOverrides: {
          root: {
            color: mode === "dark" ? "white" : "black",
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: mode === "dark" ? "#0d1117" : "white",
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: mode === "dark" ? "#ffffff" : "#000000",
              backgroundColor: mode === "dark" ? "rgb(74 78 86)" : "#e0e0e0",
              "&:hover": {
                backgroundColor: mode === "dark" ? "rgb(74 78 86)" : "#d0d0d0",
              },
            },
            "&:hover": {
              backgroundColor: mode === "dark" ? "#151923" : "#f0f0f0",
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            minWidth: "unset",
            width: "1rem",
            height: "1rem",
            marginRight: "8px",
            color: mode === "dark" ? "#aeb0b3" : "#555555",
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
