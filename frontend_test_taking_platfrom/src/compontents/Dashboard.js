import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoutIcon from "@mui/icons-material/Logout";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import HistoryIcon from "@mui/icons-material/History";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Leaderboard from "../Pages/LeaderBoard";
import TestHistory from "../Pages/TestHistroy";
import Test from "../Pages/Test";
import { logoutUser } from "../services/api";

const theme = createTheme({
  palette: {
    primary: {
      main: "#004d4b",
    },
    secondary: {
      main: "#e9f9ed",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    try {
      await logoutUser({ refresh: refreshToken });
      localStorage.clear();
      navigate("/login");
    } catch (error) {
      console.log("Logout Fail");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppBar position="fixed" color="secondary" sx={{ width: "100%", zIndex: 1201 }}>
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <DashboardIcon sx={{ marginRight: 1, color: theme.palette.primary.main }} />
              <Typography variant="h6" color="primary">
                Test Hub
              </Typography>
            </Box>
            <IconButton color="primary" onClick={handleLogout}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Box sx={{ display: "flex", flexDirection: "column", flexGrow: 1, marginTop: "64px" }}>
          <Box sx={{ width: "100%", p: 2 }}>
            <Tabs
              value={selectedTab}
              onChange={handleTabChange}
              centered
              TabIndicatorProps={{
                style: { backgroundColor: theme.palette.primary.main },
              }}
              textColor="primary"
            >
              <Tab icon={<LeaderboardIcon />} label="Leaderboard" />
              <Tab icon={<HistoryIcon />} label="Test History" />
              <Tab icon={<AddBoxIcon />} label="New Test" />
            </Tabs>

            <Box sx={{ mt: 2 }}>
              {selectedTab === 0 && <Leaderboard />}
              {selectedTab === 1 && <TestHistory />}
              {selectedTab === 2 && <Test />}
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;
