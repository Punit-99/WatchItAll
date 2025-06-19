// Auth.jsx
import React, { useState } from "react";
import { Paper, Tab, Tabs, Typography } from "@mui/material";
import LoginForm from "../Login";
import RegisterForm from "../Registration";

const Auth = () => {
  const [tab, setTab] = useState(0);
  const handleChange = (event, newValue) => setTab(newValue);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Paper
        elevation={3}
        className="flex w-[1000px] h-[600px]"
        sx={{ borderRadius: 4 }}
      >
        {/* Left Side */}
        <div className="w-1/2 bg-gradient-to-b from-blue-500 to-blue-700 text-white flex flex-col justify-center items-center p-8 rounded-l-md">
          <Typography variant="h4" className="mb-4">
            Welcome!
          </Typography>
          <Typography variant="body1" className="text-center">
            Access your account or create a new one.
          </Typography>
        </div>

        {/* Right Side */}
        <div className="w-1/2 flex flex-col p-8">
          <Tabs value={tab} onChange={handleChange} centered>
            <Tab label="Login" />
            <Tab label="Register" />
          </Tabs>

          {tab === 0 && <LoginForm />}
          {tab === 1 && <RegisterForm />}
        </div>
      </Paper>
    </div>
  );
};

export default Auth;
