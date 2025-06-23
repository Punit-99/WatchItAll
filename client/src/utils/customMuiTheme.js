import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/poppins";

export const getTheme = (mode = "light") => {
  const darkTheme = {
    background: {
      default: "#05070a",
      paper: "#0c1017",
    },
    text: {
      primary: "#ffffff",
      secondary: "#94a0b8",
      disabled: "#6c757d",
    },
    divider: "#333b4d99",
    border: "#333b4d",
    icon: {
      default: "#aeb0b3",
      nonSelect: "#7a8395",
    },
    selected: {
      background: "rgb(74 78 86)",
      hover: "rgb(74 78 86)",
      listHover: "#151923",
    },
  };

  const lightTheme = {
    background: {
      default: "#fcfcfc",
      paper: "#f5f6fa",
    },
    text: {
      primary: "#000000",
      secondary: "#47536b",
      disabled: "#9e9e9e",
    },
    divider: "#c2c9d666",
    border: "#cccccc",
    icon: {
      default: "#0b0e14", // All icon (white)
      nonSelect: "#7a8395", // sidebar non select (gray)
    },
    //  sidebar
    selected: {
      background: "#e0e0e0",
      hover: "#d0d0d0",
      listHover: "#f0f0f0",
    },
  };

  const common = {
    sideMenu: {
      borderRadius: "8px",
      gap: "8px", // icon to text gap
      padding: "2px 8px", // vertical horizontal
      opacity: {
        default: "1",
        nonSelect: "0.7",
      },
      lineHeight: "1.43",
      fontSize: "0.875rem",
    },
  };

  // Pick theme based on mode
  const selectedTheme = mode === "dark" ? darkTheme : lightTheme;

  let theme = createTheme({
    palette: {
      mode,
      background: selectedTheme.background,
      text: selectedTheme.text,
      divider: selectedTheme.divider,
      border: selectedTheme.border,
      sidebarColors: {
        icon: selectedTheme.icon.default,
        nonSelect: selectedTheme.icon.nonSelect,
      },
    },

    typography: {
      fontFamily: "'Poppins', sans-serif",
    },

    components: {
      MuiSvgIcon: {
        styleOverrides: {
          root: {
            color: selectedTheme.icon.default,
            fill: selectedTheme.icon.default,
            fontSize: "1.2rem",
            // ".Mui-selected &": {
            //   color: selectedTheme.icon.onSelect,
            //   fill: selectedTheme.icon.onSelect,
            // },
          },
        },
      },

      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: selectedTheme.background.paper,
          },
        },
      },

      MuiListItem: {
        styleOverrides: {
          root: {
            "&.Mui-selected": {
              color: selectedTheme.icon.onSelect,
              backgroundColor: selectedTheme.selected.background,
              "&:hover": {
                backgroundColor: selectedTheme.selected.hover,
              },
            },
            "&:hover": {
              backgroundColor: selectedTheme.selected.listHover,
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
            marginRight: common.sideMenu.gap,
            color: selectedTheme.icon.default,

            // Add selected styles here
            ".Mui-selected &": {
              // <-- this is the key selector
              color: selectedTheme.icon.onSelect,
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          root: {
            "& .MuiTypography-root": {
              fontWeight: 400, // default
            },
            ".Mui-selected & .MuiTypography-root": {
              fontWeight: 500, // when ListItemButton selected
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
