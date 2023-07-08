import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid red",
  boxShadow: 24,
  p: 4,
  borderRadius: 5,
};

const Error = (props) => {
  const { appState, setAppState } = props;
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setAppState((prevAppState) => ({
      ...prevAppState,
      error: false,
      message: "",
    }));
    setOpen(false);
  };
  return (
    <div>
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{ color: "red" }}
          >
            Oops!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {appState.message}
          </Typography>
          <Grid container justifyContent="flex-end">
            <Button variant="contained" onClick={handleClose}>
              Try Again
            </Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default Error;
