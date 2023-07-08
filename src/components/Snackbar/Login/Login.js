import React, { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const LoginSnackbar = (props) => {
  const { snackbarOpen, setAppState } = props;

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAppState((prevAppState) => ({
      ...prevAppState,
      firstVisit: false,
    }));
  };

  return (
    <Snackbar
      open={snackbarOpen}
      autoHideDuration={3000}
      onClose={handleSnackbarClose}
    >
      <Alert
        onClose={handleSnackbarClose}
        severity="success"
        sx={{ width: "100%" }}
      >
        Logged In!
      </Alert>
    </Snackbar>
  );
};

export default LoginSnackbar;
