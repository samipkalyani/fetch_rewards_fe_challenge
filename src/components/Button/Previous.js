import React from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";

const Previous = (props) => {
  const { handlePrev } = props;

  return (
    <IconButton onClick={handlePrev}>
      <ArrowBack color="primary"></ArrowBack>
    </IconButton>
  );
};

export default Previous;
