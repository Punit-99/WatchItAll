import { useDispatch, useSelector } from "react-redux";
import { Alert, Snackbar } from "@mui/material";
import { hideSnackbar } from "../../store/toast/snackbarSlice";

const SnackbarAlert = () => {
  const dispatch = useDispatch();
  const { open, message, severity } = useSelector(
    (state) => state.snackbarToast
  );

  const handleClose = (_, reason) => {
    if (reason === "clickaway") return;
    dispatch(hideSnackbar());
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={2000} // 1.5 sec
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={handleClose}
        severity={severity}
        sx={{
          width: "100%",
          borderRadius: "12px",
          border: "1px solid",
          borderColor: "divider",
          backgroundColor: "background.paper",
          color: "text.primary",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarAlert;
