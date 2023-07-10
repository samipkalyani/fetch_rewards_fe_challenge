import "@testing-library/jest-dom";
import React from "react";
import Dog from "../Item/Dog";
import { fireEvent, render, screen } from "@testing-library/react";

describe("Individual dog item.", () => {
  const dog = {
    img: "https://frontend-take-home.fetch.com/dog-images/n02088632-bluetick/n02088632_101.jpg",
    name: "Blake",
    age: 5,
    breed: "Bluetick",
    zip_code: "18452",
    id: "nHGFTIcBOvEgQ5OCx5Yf",
  };
  test("Dog Item renders successfully ", async () => {
    const favourites = [];
    const favouritesHandler = jest.fn();
    render(
      <Dog
        dog={dog}
        favourites={favourites}
        favouritesHandler={favouritesHandler}
      ></Dog>
    );
    const nameElement = screen.getByText("Blake");
    expect(nameElement).toBeInTheDocument();
    const ageElement = screen.getByText("Age: 5");
    expect(ageElement).toBeInTheDocument();
    const breedElement = screen.getByText("Bluetick");
    expect(breedElement).toBeInTheDocument();
    const zipCode = screen.getByText("Zip code: 18452");
    expect(zipCode).toBeInTheDocument();
    const favIcon = screen.getByTestId("FavoriteBorderIcon");
    expect(favIcon).toBeInTheDocument();

    const favButton = screen.getByRole("button");

    fireEvent.click(favButton);

    expect(favouritesHandler).toHaveBeenCalledWith(dog.id);
  });
  test("Favourite Icon ", async () => {
    const favourites = ["nHGFTIcBOvEgQ5OCx5Yf"];
    const favouritesHandler = jest.fn();
    render(
      <Dog
        dog={dog}
        favourites={favourites}
        favouritesHandler={favouritesHandler}
      ></Dog>
    );
    const favIcon = screen.getByTestId("FavoriteIcon");
    expect(favIcon).toBeInTheDocument();
  });
});
