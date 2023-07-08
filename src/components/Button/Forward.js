import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowForward from "@mui/icons-material/ArrowForward";

const Forward = (props) => {
  const { handleNext } = props;

  return (
    <IconButton onClick={handleNext}>
      <ArrowForward color="primary"></ArrowForward>
    </IconButton>
  );
};

export default Forward;
