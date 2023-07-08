import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import "./MatchedDog.css";

const MatchedDog = (props) => {
  const { dog, open, setOpen } = props;

  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="matchedDogContainer">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {dog.name}
        </Typography>
        <Box className="matchedDogImg" component="img" src={dog.img}></Box>
        <Typography variant="body2" color="text.secondary">
          Breed: {dog.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zip cpde: {dog.zip_code}
        </Typography>
      </Box>
    </Modal>
  );
};

export default MatchedDog;
