import "@testing-library/jest-dom";
import React from "react";
import Dogs from "../Container/Dogs";
import { render } from "@testing-library/react";
import { screen } from "@testing-library/react";

describe("Dogs container.", () => {
  const dogs = [
    {
      img: "https://frontend-take-home.fetch.com/dog-images/n02088632-bluetick/n02088632_101.jpg",
      name: "Blake",
      age: 5,
      breed: "Bluetick",
      zip_code: "18452",
      id: "nHGFTIcBOvEgQ5OCx5Yf",
    },
  ];
  test("Dog Item renders successfully ", async () => {
    const favourites = [];
    const favouritesHandler = jest.fn();
    render(
      <Dogs
        dogs={dogs}
        favourites={favourites}
        favouritesHandler={favouritesHandler}
      ></Dogs>
    );
    const dogsContainerElement = screen.getByTestId("dogs-container");
    expect(dogsContainerElement).toBeInTheDocument();
  });
});
