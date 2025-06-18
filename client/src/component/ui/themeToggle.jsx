import { useDispatch, useSelector } from "react-redux";
import { Switch, FormControlLabel, Box } from "@mui/material";
import { toggleTheme } from "../../store/theme/themeSlice";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import Brightness2Icon from "@mui/icons-material/Brightness2"; // Moon icon

export default function ModeToggle() {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();
  // console.log(mode);
  return (
    <Box display="flex" alignItems="center">
      <Brightness7Icon color={mode === "light" ? "warning" : "disabled"} />
      <Switch
        checked={mode === "dark"}
        onChange={() => dispatch(toggleTheme())}
        color="primary"
      />
      <Brightness2Icon color={mode === "dark" ? "primary" : "disabled"} />
    </Box>
  );
}
