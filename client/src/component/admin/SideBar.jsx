import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
  Button,
  useMediaQuery,
  Menu,
  MenuItem,
  ListItemButton,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { closeSidebar } from "../../store/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link } from "react-router-dom";

const drawerWidth = 240;

const sidebarMenuItem = [
  { name: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { name: "Analytics", icon: <AcUnitRoundedIcon />, path: "/shows" },
  { name: "Client", icon: <AcUnitRoundedIcon />, path: "/newshows" },
];

const SideBar = ({ setActivePage }) => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

  return (
    <div className="flex ">
      <Drawer
        open={isMobile ? isOpen : true}
        anchor={isMobile ? "right" : undefined}
        onClose={() => dispatch(closeSidebar())}
        variant={isMobile ? "temporary" : "permanent"}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",

            color: "white",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{
            bgcolor: "transparent",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
            className={`${
              isMobile ? "hidden" : "flex items-center justify-center py-4"
            }`}
          >
            <Typography variant="h4" sx={{ fontWeight: "bold" }}>
              WatchItAll
            </Typography>
          </div>

          {isMobile ? (
            // Mobile Layout
            <>
              {/* Profile Section on top */}
              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="px-6 py-4"
              >
                <Avatar sx={{ height: "36px", width: "36px" }} />
                <Box>
                  <Typography sx={{ fontSize: "0.875rem" }}>Email</Typography>
                  <Typography sx={{ fontSize: "0.875rem" }}>Name</Typography>
                </Box>
                <IconButton
                  sx={{
                    border: 2,
                    borderRadius: "8px",
                    marginLeft: "auto",
                    bgcolor: "#0b0f15",
                    "&:hover": {
                      backgroundColor: "#04060a",
                    },
                  }}
                >
                  <MoreVertIcon sx={{ fontSize: "1.125rem" }} />
                </IconButton>
              </Box>

              <Divider sx={{ bgcolor: "#4b4e57" }} />

              {/* Menu Items */}
              <div className="px-4 py-5 flex-grow overflow-auto">
                <List>
                  {sidebarMenuItem.map((menuItem) => (
                    <div key={menuItem.name} className="mb-2  rounded-lg">
                      <ListItemButton
                        component={Link}
                        to={menuItem.path}
                        sx={{ borderRadius: "9px" }}
                      >
                        <ListItemIcon sx={{ minWidth: 30, color: "white" }}>
                          {menuItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "0.875rem" }}
                            >
                              {menuItem.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </div>
                  ))}
                </List>
              </div>

              <Divider sx={{ bgcolor: "#4b4e57" }} />

              {/* Logout Button */}
              <Box className="px-6 py-4">
                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<LogoutRoundedIcon />}
                >
                  Logout
                </Button>
              </Box>
            </>
          ) : (
            // Desktop Layout (keep as it was)
            <>
              <Divider sx={{ bgcolor: "#4b4e57" }} />

              <div className="px-4 py-5 flex-grow overflow-auto">
                <List>
                  {sidebarMenuItem.map((menuItem) => (
                    <div key={menuItem.name} className="mb-2  rounded-lg">
                      <ListItemButton
                        component={Link}
                        to={menuItem.path}
                        sx={{ borderRadius: "9px", paddingY: 1 }}
                        onClick={() => setActivePage(menuItem.name)}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 30,
                            color: "white",
                          }}
                        >
                          {menuItem.icon}
                        </ListItemIcon>
                        <ListItemText
                          primary={
                            <Typography
                              variant="body1"
                              sx={{ fontSize: "0.875rem" }}
                            >
                              {menuItem.name}
                            </Typography>
                          }
                        />
                      </ListItemButton>
                    </div>
                  ))}
                </List>
              </div>

              <Divider sx={{ bgcolor: "#4b4e57" }} />

              <Box
                display="flex"
                alignItems="center"
                gap={2}
                className="px-6 py-4"
              >
                <Avatar sx={{ height: "36px", width: "36px" }} />
                <Box>
                  <Typography sx={{ fontSize: "0.875rem" }}>Email</Typography>
                  <Typography sx={{ fontSize: "0.875rem" }}>Name</Typography>
                </Box>
                <IconButton
                  sx={{
                    border: 2,
                    borderRadius: "8px",
                    marginLeft: "auto",
                    bgcolor: "#0b0f15",
                    "&:hover": {
                      backgroundColor: "#04060a",
                    },
                  }}
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <MoreVertIcon sx={{ fontSize: "1.125rem" }} />
                </IconButton>
              </Box>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <MenuItem onClick={() => setAnchorEl(null)}>Profile</MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>
                  My account
                </MenuItem>
                <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
              </Menu>
            </>
          )}
        </Paper>
      </Drawer>
    </div>
  );
};

export default SideBar;
