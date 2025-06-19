import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/poppins";

export const getTheme = (mode = "dark") => {
  let theme = createTheme({
    palette: {
      mode,
      ...(mode === "dark" && {
        background: {
          default: "#04070b", // main body background
          paper: "#0d1117", // sidebar paper background
        },
        text: {
          primary: "#ffffff", // default text
          secondary: "#aeb0b3", // non-selected text
        },
        divider: "#333b4d", // borders
      }),
    },

    // Typography
    typography: {
      fontFamily: "'Poppins', sans-serif",
      // Custom variant for sidebar menu text
      sideMenu: {
        fontSize: "0.875rem",
        fontWeight: 500,
        lineHeight: 1.43,
      },
    },

    // Component overrides
    components: {
      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: "#ffffff",
              backgroundColor: "rgb(74 78 86)",
              "&:hover": {
                backgroundColor: "rgb(74 78 86)",
              },
            },
            "&:hover": {
              backgroundColor: "#151923",
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
            color: "#aeb0b3",
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "#0d1117",
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
