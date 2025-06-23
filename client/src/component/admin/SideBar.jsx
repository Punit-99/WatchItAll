import {
  Drawer,
  List,
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
  useTheme,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";

import { closeSidebar } from "../../store/navbar/navbar";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

const drawerWidth = 240;

const sidebarMenuItem = [
  { name: "Home", icon: <HomeRoundedIcon />, path: "/" },
  { name: "Shows", icon: <AcUnitRoundedIcon />, path: "/shows" },
  { name: "Create Show", icon: <AcUnitRoundedIcon />, path: "/new-show" },
  { name: "Users", icon: <AcUnitRoundedIcon />, path: "/users" },
];

const SideBar = ({ setActivePage }) => {
  const isMobile = useMediaQuery("(max-width:640px)");
  const isOpen = useSelector((state) => state.sidebar.isOpen);
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const location = useLocation();
  const theme = useTheme();

  return (
    <div className="flex">
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
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Paper
          elevation={0}
          sx={{ height: "100%", display: "flex", flexDirection: "column" }}
        >
          {!isMobile && (
            <Box className="flex items-center justify-center py-4">
              <Typography variant="h4" sx={{ fontWeight: "bold" }}>
                WatchItAll
              </Typography>
            </Box>
          )}

          <Divider />

          <Box className="px-4 py-5 flex-grow overflow-auto">
            <List>
              {sidebarMenuItem.map((menuItem) => {
                const isActive = location.pathname === menuItem.path;
                return (
                  <Box key={menuItem.name} mb={2} borderRadius="8px">
                    <ListItemButton
                      component={Link}
                      to={menuItem.path}
                      selected={isActive}
                      sx={{
                        borderRadius: "9px",
                        paddingY: 1,
                      }}
                      onClick={() => setActivePage(menuItem.name)}
                    >
                      <ListItemIcon
                        sx={{
                          minWidth: 30,
                          color: isActive
                            ? theme.palette.sidebarColors.icon
                            : theme.palette.sidebarColors.icon.nonSelect,
                        }}
                      >
                        {menuItem.icon}
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography
                            variant="body1"
                            sx={{ fontSize: "0.875rem" }}
                            selected={isActive}
                          >
                            {menuItem.name}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </Box>
                );
              })}
            </List>
          </Box>

          <Divider />

          <Box display="flex" alignItems="center" gap={2} className="px-6 py-4">
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
            <MenuItem onClick={() => setAnchorEl(null)}>My account</MenuItem>
            <MenuItem onClick={() => setAnchorEl(null)}>Logout</MenuItem>
          </Menu>
        </Paper>
      </Drawer>
    </div>
  );
};

export default SideBar;
