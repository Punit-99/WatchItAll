// RegisterForm.jsx
import React from "react";
import {
  Button,
  Divider,
  FormControl,
  TextField,
  Typography,
} from "@mui/material";
import GoogleButton from "./googleButton";

// Registration form configuration
export const registrationForm = [
  {
    name: "Full Name",
    label: "Full Name",
    placeholder: "Full Name",
    type: "text",
  },
  { name: "Email", label: "Email", placeholder: "Email", type: "text" },
  {
    name: "Password",
    label: "Password",
    placeholder: "Password",
    type: "password",
  },
  {
    name: "Confirm Password",
    label: "Confirm Password",
    placeholder: "Confirm Password",
    type: "password",
  },
];

const RegisterForm = () => {
  return (
    <div className="flex flex-col justify-center items-center mt-6">
      <Typography variant="h5" sx={{ mb: 2 }}>
        Register
      </Typography>
      <FormControl className="w-full max-w-sm">
        {registrationForm.map((field) => (
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
          Register
        </Button>
      </FormControl>

      <Divider className="w-full max-w-sm my-4">OR</Divider>

      <GoogleButton />
    </div>
  );
};

export default RegisterForm;
