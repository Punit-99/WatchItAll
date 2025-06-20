import {
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  TextField,
  InputAdornment,
  Box,
  useMediaQuery,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ModeToggle from "../ui/themeToggle";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import DateComponent from "../ui/Date";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { useDispatch } from "react-redux";
import { toggleSidebar } from "../../store/navbar/navbar";

const NavBar = () => {
  const isMobile = useMediaQuery("(max-width:426px)");
  const dispatch = useDispatch();
  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          padding: "4px",
        }}
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center gap-2 ">
            <IconButton
              sx={{
                display: isMobile ? "flex" : "none",
              }}
              onClick={() => dispatch(toggleSidebar())}
            >
              <MenuRoundedIcon />
            </IconButton>

            <div className="hidden sm:block">
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
            </div>
          </div>

          {/* Right Side */}
          <Box
            className="flex items-center gap-4"
            sx={{ display: isMobile ? "none" : "flex" }}
          >
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

            <Box sx={{ border: 1, borderRadius: "8px", boxShadow: 4 }}>
              <ModeToggle />
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <Divider />
    </>
  );
};

export default NavBar;
