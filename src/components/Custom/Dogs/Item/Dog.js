import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardHeader, IconButton } from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useTheme } from "@mui/material/styles";
import "./Dog.css";

const Dog = (props) => {
  const { dog, favourites, favouritesHandler } = props;
  const theme = useTheme();
  const cardStyle = {
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: "10px",
  };

  return (
    <Card style={cardStyle}>
      <CardHeader
        action={
          <IconButton
            onClick={() => {
              favouritesHandler(dog.id);
            }}
          >
            {favourites.includes(dog.id) ? (
              <FavoriteIcon className="heart" />
            ) : (
              <FavoriteBorderIcon />
            )}
          </IconButton>
        }
        title={dog.name}
        subheader={dog.breed}
        className="title"
      ></CardHeader>
      <CardContent>
        <CardMedia className="itemImg" image={dog.img} title={dog.name} />
      </CardContent>
      <Typography
        sx={{ textAlign: "left", marginLeft: "4%" }}
        variant="body2"
        color="text.secondary"
      >
        Age: {dog.age}
      </Typography>
      <Typography
        sx={{ textAlign: "left", marginLeft: "4%" }}
        variant="body2"
        color="text.secondary"
      >
        Zip code: {dog.zip_code}
      </Typography>
    </Card>
  );
};

export default Dog;
