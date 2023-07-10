import "@testing-library/jest-dom";
import React from "react";
import MatchedDog from "../MatchedDog/MatchedDog";
import { render, screen } from "@testing-library/react";

describe("Individual dog item.", () => {
  const dog = {
    img: "https://frontend-take-home.fetch.com/dog-images/n02088632-bluetick/n02088632_101.jpg",
    name: "Blake",
    age: 5,
    breed: "Bluetick",
    zip_code: "18452",
    id: "nHGFTIcBOvEgQ5OCx5Yf",
  };
  test("Matched dog renders successfully ", async () => {
    const modalOpen = true;
    const setModalOpen = jest.fn();
    render(
      <MatchedDog
        dog={dog}
        open={modalOpen}
        setOpen={setModalOpen}
      ></MatchedDog>
    );
    const nameElement = screen.getByText("Blake");
    expect(nameElement).toBeInTheDocument();
    const ageElement = screen.getByText("Age: 5");
    expect(ageElement).toBeInTheDocument();
    const breedElement = screen.getByText("Breed: Bluetick");
    expect(breedElement).toBeInTheDocument();
    const zipCode = screen.getByText("Zip code: 18452");
    expect(zipCode).toBeInTheDocument();
  });
});
