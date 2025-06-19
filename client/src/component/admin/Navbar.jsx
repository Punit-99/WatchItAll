import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Box,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ModeToggle from "../ui/themeToggle";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DateComponent from "../ui/Date";

const NavBar = () => {
  return (
    <AppBar position="static" elevation={0}>
      <Toolbar className="flex justify-between">
        {/* Left Side - Search */}

        <TextField
          placeholder="Search..."
          id="outlined-start-adornment"
          size="small"
          sx={{
            width: "20rem",
            borderRadius: "12px",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px",
            },
          }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchRoundedIcon />
                </InputAdornment>
              ),
            },
          }}
        />

        {/* Right Side */}
        <Box className="flex items-center gap-4">
          <DateComponent />

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderRightWidth: 2 }}
          />

          <IconButton
            color="inherit"
            sx={{ border: 1, borderRadius: "8px", boxShadow: 4 }}
          >
            <NotificationsIcon />
          </IconButton>

          {/* ModeToggle wrapped with Box to apply sx */}
          <Box sx={{ border: 1, borderRadius: "8px", boxShadow: 4 }}>
            <ModeToggle />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
