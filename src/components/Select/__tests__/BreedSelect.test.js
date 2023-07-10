import "@testing-library/jest-dom";
import React from "react";
import BreedSelect from "../Breed/BreedSelect";
import { render, screen } from "@testing-library/react";

describe("Breeds test suite", () => {
  test("Matched dog renders successfully ", () => {
    render(
      <BreedSelect
        breeds={[]}
        BreedSetter={jest.fn()}
        setAppState={jest.fn()}
      ></BreedSelect>
    );

    const breedSelect = screen.getByTestId("breed-select");
    expect(breedSelect).toBeInTheDocument();
    const clearBreedsButton = screen.getByRole("button", {
      name: "Clear selection",
    });
    expect(clearBreedsButton).toBeInTheDocument();
    expect(clearBreedsButton).toBeDisabled();
  });
});
