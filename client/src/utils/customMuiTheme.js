import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import "@fontsource/poppins";

const basePalette = {
  primary: {
    main: "#1976d2",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#9c27b0",
    contrastText: "#ffffff",
  },
  error: {
    main: "#f44336",
  },
  warning: {
    main: "#ff9800",
  },
  info: {
    main: "#2196f3",
  },
  success: {
    main: "#4caf50",
  },
};

export const getTheme = (mode = "light") => {
  let theme = createTheme({
    palette: {
      mode,
      ...basePalette,
      ...(mode === "light"
        ? {
            background: {
              default: "#f5f5f5",
              paper: "#ffffff",
            },
          }
        : {
            background: {
              default: "#121212",
              paper: "#1e1e1e",
            },
          }),
    },
    // Typography
    typography: {
      fontFamily: "'Poppins', sans-serif",
      h1: {
        fontSize: "2.5rem",
        fontWeight: 700,
        color: mode === "light" ? "#000" : "#fff",
      },
      h2: {
        fontSize: "1.5rem",
        fontWeight: 600,
        color: mode === "light" ? "#666" : "#aaa",
      },
      dashboardHeading: {
        fontSize: "2rem",
        fontWeight: 700,
        color: mode === "light" ? "#000" : "#fff",
      },
      dashboardSubheading: {
        fontSize: "1rem",
        fontWeight: 500,
        color: mode === "light" ? "#666" : "#aaa",
      },
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "outlined",
        },
        styleOverrides: {
          root: {
            borderRadius: 8,
            padding: "8px 16px",
            textTransform: "none",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiSnackbar: {
        defaultProps: {
          autoHideDuration: 3000,
          anchorOrigin: { vertical: "top", horizontal: "center" },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
          standardSuccess: {
            backgroundColor: basePalette.success.main,
            color: "#fff",
          },
          standardError: {
            backgroundColor: basePalette.error.main,
            color: "#fff",
          },
        },
      },
      MuiPaginationItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            border: "1px solid #ddd",
            "&.Mui-selected": {
              backgroundColor: basePalette.primary.main,
              color: "#fff",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#1565c0",
              },
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
            transition: "transform 0.3s ease, box-shadow 0.3s ease",
            "&:hover": {
              boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          },
        },
      },
      MuiBreadcrumbs: {
        defaultProps: {
          separator: "›",
        },
        styleOverrides: {
          separator: {
            color: "#999",
            fontSize: "0.8rem",
          },
        },
      },
      MuiPickersPopper: {
        styleOverrides: {
          paper: {
            borderRadius: 8,
          },
        },
      },
      MuiCalendarPicker: {
        styleOverrides: {
          root: {
            borderRadius: 8,
          },
        },
      },
      MuiTableContainer: {
        styleOverrides: {
          root: {
            borderRadius: 6,
          },
        },
      },
      MuiTableHead: {
        styleOverrides: {
          root: {
            "& th": {
              color: "#fff",
              fontWeight: "bold",
              backgroundColor: basePalette.primary.main,
            },
          },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            transition: "background-color 0.3s ease",
            "&:nth-of-type(even)": {
              backgroundColor:
                mode === "light"
                  ? "rgba(25, 118, 210, 0.1)"
                  : "rgba(25, 118, 210, 0.2)",
            },
            "&:nth-of-type(odd)": {
              backgroundColor: mode === "light" ? "#fff" : "#1e1e1e",
            },
            "&:hover": {
              backgroundColor: mode === "light" ? "#e3f2fd" : "#333",
            },
          },
        },
      },
    },
  });

  return responsiveFontSizes(theme);
};
