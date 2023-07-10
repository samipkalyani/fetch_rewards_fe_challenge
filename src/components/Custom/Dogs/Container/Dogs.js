import React from "react";
import { Grid } from "@mui/material";
import Dog from "../Item/Dog";

const Dogs = (props) => {
  const { dogs, favourites, favouritesHandler } = props;
  return (
    <>
      <Grid
        data-testid="dogs-container"
        container
        spacing={3}
        style={{ padding: "20px" }}
      >
        {dogs &&
          dogs.map((dog, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Dog
                dog={dog}
                favourites={favourites}
                favouritesHandler={favouritesHandler}
              ></Dog>
            </Grid>
          ))}
      </Grid>
    </>
  );
};

export default Dogs;
