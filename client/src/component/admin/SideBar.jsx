import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Divider,
  Paper,
  Typography,
  Box,
  Avatar,
  IconButton,
} from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AcUnitRoundedIcon from "@mui/icons-material/AcUnitRounded";
import MoreVertIcon from "@mui/icons-material/MoreVert";

const drawerWidth = 240;

const sidebarMenuItem = [
  { name: "Home", icon: <HomeRoundedIcon /> },
  { name: "Analytics", icon: <AcUnitRoundedIcon /> },
  { name: "Client", icon: <AcUnitRoundedIcon /> },
];

const SideBar = () => {
  return (
    <div className="flex bg-[#0d1016]">
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#0d1016",
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
          {/* Header */}
          <div className="flex items-center justify-center py-4">
            <Toolbar>
              <h1 className="text-xl font-bold text-white">WatchItAll</h1>
            </Toolbar>
          </div>

          <Divider sx={{ bgcolor: "#4b4e57" }} />

          {/* Menu Items */}
          <div className="px-4 py-5 flex-grow overflow-auto">
            <List>
              {sidebarMenuItem.map((menuItem) => (
                <div
                  key={menuItem.name}
                  className="mb-2 bg-[#1a1d24] rounded-lg"
                >
                  <ListItem>
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
                  </ListItem>
                </div>
              ))}
            </List>
          </div>

          <Divider sx={{ bgcolor: "#4b4e57" }} />

          {/* User Profile */}
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
                bgcolor: "#0b0f15",

                "&:hover": {
                  backgroundColor: "#04060a",
                },
              }}
            >
              <MoreVertIcon sx={{ fontSize: "1.125rem" }} />
            </IconButton>
          </Box>
        </Paper>
      </Drawer>
    </div>
  );
};

export default SideBar;
