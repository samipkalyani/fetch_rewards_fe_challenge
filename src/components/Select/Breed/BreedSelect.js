import React, { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import axios from "axios";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name, breeds, theme) {
  return {
    fontWeight:
      breeds.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const BreedSelect = (props) => {
  const { breeds, BreedSetter, setAppState } = props;
  const [allBreeds, setAllBreeds] = useState([]);
  const theme = useTheme();

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    BreedSetter(typeof value === "string" ? value.split(",") : value);
  };

  useEffect(() => {
    const getAllBreeds = async () => {
      const url = "https://frontend-take-home-service.fetch.com/dogs/breeds";
      try {
        const res = await axios.get(url, {
          withCredentials: true,
        });
        setAllBreeds(res.data);
      } catch (err) {
        setAppState((prevAppState) => ({
          ...prevAppState,
          error: true,
          message: `Tried to GET ${url} and an error occured.`,
        }));
        console.error(err);
      }
    };
    getAllBreeds();
  }, []);

  const deleteSelectedBreeds = () => {
    BreedSetter([]);
  };

  return (
    <Grid
      container
      sx={{ margin: "20px auto 20px" }}
      spacing={2}
      alignItems="center"
      justifyContent="center"
    >
      <Grid item>
        <FormControl sx={{ m: 1, width: 300 }}>
          <InputLabel id="demo-multiple-name-label">Breed</InputLabel>
          <Select
            data-testid="breed-select"
            multiple
            value={breeds}
            onChange={handleChange}
            input={<OutlinedInput label="Breed" />}
            MenuProps={MenuProps}
            renderValue={(selected) => selected.join(", ")}
          >
            {allBreeds.map((name) => (
              <MenuItem
                key={name}
                value={name}
                style={getStyles(name, breeds, theme)}
              >
                <Checkbox checked={breeds.indexOf(name) > -1} />
                <ListItemText primary={name} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item>
        <Button
          variant="outlined"
          disabled={breeds.length === 0}
          onClick={() => deleteSelectedBreeds()}
          color="error"
        >
          Clear selection
        </Button>
      </Grid>
    </Grid>
  );
};

export default BreedSelect;
