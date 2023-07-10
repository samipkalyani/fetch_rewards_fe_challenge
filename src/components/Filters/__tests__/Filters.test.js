import "@testing-library/jest-dom";
import React from "react";
import Filter from "../Filters";
import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import userEvent from "@testing-library/user-event";

const mockAxios = new MockAdapter(axios);

describe("Filters Test", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  const baseUrl = "https://frontend-take-home-service.fetch.com";

  test("Expect 3 buttons to be present in the document", () => {
    // Mock Props
    const mockBreeds = [];
    const mockSortOrder = true;
    const mockSetSortOrder = jest.fn();
    const mockSetMatchedDog = jest.fn();
    const mockSetMatchedDogModalOpen = jest.fn();
    const mockFavourites = [];
    const mockSetFavourites = jest.fn();
    const mockSetAppState = jest.fn();

    render(
      <Filter
        breeds={mockBreeds}
        sortOrder={mockSortOrder}
        setSortOrder={mockSetSortOrder}
        setMatchedDog={mockSetMatchedDog}
        setMatchedDogModalOpen={mockSetMatchedDogModalOpen}
        favourites={mockFavourites}
        setFavourites={mockSetFavourites}
        setAppState={mockSetAppState}
      />
    );
    const buttons = screen.getAllByRole("button");
    expect(buttons.length).toBe(3);

    const findMatchButton = buttons[0];
    const sortButton = buttons[1];
    const deleteButton = buttons[2];

    expect(findMatchButton).toBeInTheDocument();
    expect(sortButton).toBeInTheDocument();
    expect(deleteButton).toBeInTheDocument();

    expect(findMatchButton).toBeDisabled();
    expect(sortButton).toBeDisabled();
    expect(deleteButton).toBeDisabled();
  });

  test("Finds a match for dogs if selected", async () => {
    // Mock Props
    const mockBreeds = [];
    const mockSortOrder = true;
    const mockSetSortOrder = jest.fn();
    const mockSetMatchedDog = jest.fn();
    const mockSetMatchedDogModalOpen = jest.fn();
    const mockFavourites = ["nHGFTIcBOvEgQ5OCx5Yf", "oXGFTIcBOvEgQ5OCx5Yf"];
    const mockSetFavourites = jest.fn();
    const mockSetAppState = jest.fn();

    // Set up the mock responses for the Axios requests
    const mockMatchResponse = {
      data: { match: "nHGFTIcBOvEgQ5OCx5Yf" },
    };
    const mockDogsResponse = {
      data: [
        {
          img: "https://frontend-take-home.fetch.com/dog-images/n02088632-bluetick/n02088632_101.jpg",
          name: "Blake",
          age: 5,
          breed: "Bluetick",
          zip_code: "18452",
          id: "nHGFTIcBOvEgQ5OCx5Yf",
        },
      ],
    };

    mockAxios.onPost(`${baseUrl}/dogs/match`).reply(200, mockMatchResponse);

    mockAxios.onPost(`${baseUrl}/dogs`).reply(200, mockDogsResponse);

    render(
      <Filter
        breeds={mockBreeds}
        sortOrder={mockSortOrder}
        setSortOrder={mockSetSortOrder}
        setMatchedDog={mockSetMatchedDog}
        setMatchedDogModalOpen={mockSetMatchedDogModalOpen}
        favourites={mockFavourites}
        setFavourites={mockSetFavourites}
        setAppState={mockSetAppState}
      />
    );
    const buttons = screen.getAllByRole("button");
    const findMatchButton = buttons[0];
    expect(findMatchButton).toBeEnabled();
    userEvent.click(findMatchButton);
    await waitFor(() => {
      expect(mockSetMatchedDog).toHaveBeenCalled();
      expect(mockSetMatchedDogModalOpen).toHaveBeenCalled();
    });
    expect(mockAxios.history.post.length).toBe(2);
    expect(mockAxios.history.post[0].url).toBe(`${baseUrl}/dogs/match`);
    expect(mockAxios.history.post[1].url).toBe(`${baseUrl}/dogs`);
  });

  test("Sort button", async () => {
    // Mock Props
    const mockBreeds = ["breed1", "breed2"];
    const mockSortOrder = true;
    const mockSetSortOrder = jest.fn();
    const mockSetMatchedDog = jest.fn();
    const mockSetMatchedDogModalOpen = jest.fn();
    const mockFavourites = ["nHGFTIcBOvEgQ5OCx5Yf", "oXGFTIcBOvEgQ5OCx5Yf"];
    const mockSetFavourites = jest.fn();
    const mockSetAppState = jest.fn();

    render(
      <Filter
        breeds={mockBreeds}
        sortOrder={mockSortOrder}
        setSortOrder={mockSetSortOrder}
        setMatchedDog={mockSetMatchedDog}
        setMatchedDogModalOpen={mockSetMatchedDogModalOpen}
        favourites={mockFavourites}
        setFavourites={mockSetFavourites}
        setAppState={mockSetAppState}
      />
    );
    const buttons = screen.getAllByRole("button");
    const sortButton = buttons[1];
    expect(sortButton).toBeEnabled();
    userEvent.click(sortButton);
    await waitFor(() => {
      expect(mockSetSortOrder).toBeCalled();
    });
  });

  test("Sort button", async () => {
    // Mock Props
    const mockBreeds = [];
    const mockSortOrder = true;
    const mockSetSortOrder = jest.fn();
    const mockSetMatchedDog = jest.fn();
    const mockSetMatchedDogModalOpen = jest.fn();
    const mockFavourites = ["nHGFTIcBOvEgQ5OCx5Yf", "oXGFTIcBOvEgQ5OCx5Yf"];
    const mockSetFavourites = jest.fn();
    const mockSetAppState = jest.fn();

    render(
      <Filter
        breeds={mockBreeds}
        sortOrder={mockSortOrder}
        setSortOrder={mockSetSortOrder}
        setMatchedDog={mockSetMatchedDog}
        setMatchedDogModalOpen={mockSetMatchedDogModalOpen}
        favourites={mockFavourites}
        setFavourites={mockSetFavourites}
        setAppState={mockSetAppState}
      />
    );
    const buttons = screen.getAllByRole("button");
    const deleteFavouritesButton = buttons[2];
    expect(deleteFavouritesButton).toBeEnabled();
    userEvent.click(deleteFavouritesButton);
    await waitFor(() => {
      expect(mockSetFavourites).toBeCalled();
    });
  });
});
