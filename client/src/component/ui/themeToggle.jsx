import { useDispatch, useSelector } from "react-redux";
import { IconButton, Tooltip } from "@mui/material";
import { toggleTheme } from "../../store/theme/themeSlice";
import Brightness7Icon from "@mui/icons-material/Brightness7"; // Sun icon
import Brightness2Icon from "@mui/icons-material/Brightness2"; // Moon icon

export default function ModeToggle({ sx }) {
  const mode = useSelector((state) => state.theme.mode);
  const dispatch = useDispatch();

  return (
    <Tooltip title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}>
      <IconButton
        onClick={() => dispatch(toggleTheme())}
        color="inherit"
        sx={sx}
      >
        {mode === "light" ? (
          <Brightness2Icon color="primary" />
        ) : (
          <Brightness7Icon color="warning" />
        )}
      </IconButton>
    </Tooltip>
  );
}
