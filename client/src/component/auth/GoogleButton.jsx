import { Button } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useDispatch } from "react-redux";
import { googleAuth } from "../../store/auth/authSlice";

const GoogleButton = () => {
  const dispatch = useDispatch();
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5000/api/v1/auth/google";
  };
  return (
    <Button
      onClick={() => handleGoogleLogin()}
      variant="outlined"
      color="inherit"
      sx={{
        margin: 1,
        borderRadius: "50%",
        width: 47,
        height: 47,
        minWidth: 47,
        minHeight: 47,
      }}
    >
      <GoogleIcon />
    </Button>
  );
};
export default GoogleButton;
