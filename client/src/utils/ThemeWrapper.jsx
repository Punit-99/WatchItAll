import { useSelector } from "react-redux";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { getTheme } from "./customMuiTheme";

export default function ThemeWrapper({ children }) {
  const mode = useSelector((state) => state.theme.mode);
  const theme = getTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}
