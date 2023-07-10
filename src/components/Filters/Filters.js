import React from "react";
import { Grid } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";

const Filters = (props) => {
  const {
    breeds,
    sortOrder,
    setSortOrder,
    setMatchedDog,
    setMatchedDogModalOpen,
    favourites,
    setFavourites,
    setAppState,
  } = props;

  const deleteFavourites = () => setFavourites([]);

  const changeOrder = () => {
    setSortOrder(!sortOrder);
  };

  const findAMatch = () => {
    const findMatch = async () => {
      try {
        const res = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs/match",
          favourites,
          {
            withCredentials: true,
          }
        );
        const res2 = await axios.post(
          "https://frontend-take-home-service.fetch.com/dogs",
          [res.data.match],
          {
            withCredentials: true,
          }
        );
        setMatchedDog(res2.data[0]);
        setMatchedDogModalOpen(true);
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to find a match and an error occured.`,
        }));
        console.error(err);
      }
    };
    findMatch();
  };

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>
        <Button
          variant="contained"
          disabled={favourites.length === 0}
          name="findAMatch"
          onClick={() => findAMatch()}
        >
          Find a match!
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="contained"
          disabled={breeds.length <= 1}
          onClick={() => changeOrder()}
        >
          Sort {sortOrder === true ? "descending" : "ascending"}
        </Button>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          disabled={favourites.length === 0}
          onClick={deleteFavourites}
          color="error"
        >
          Delete favourites
        </Button>
      </Grid>
    </Grid>
  );
};

export default Filters;
