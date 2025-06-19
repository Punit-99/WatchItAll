// LoginForm.jsx
import React from "react";
import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import GoogleButton from "./googleButton";

// Login form configuration
export const loginForm = [
  { name: "Email", label: "Email", placeholder: "Email", type: "text" },
  {
    name: "Password",
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
];

const LoginForm = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Login
      </Typography>
      <FormControl className="w-full max-w-sm">
        {loginForm.map((field) => (
          <div key={field.name} className="mb-4">
            <TextField
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              variant="outlined"
              fullWidth
            />
          </div>
        ))}
        <Button variant="contained" color="primary" fullWidth>
          Sign In
        </Button>
      </FormControl>

      <Divider className="w-full max-w-sm my-4">OR</Divider>

      <GoogleButton />
    </div>
  );
};

export default LoginForm;
