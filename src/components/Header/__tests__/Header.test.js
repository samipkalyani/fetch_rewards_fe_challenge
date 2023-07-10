import "@testing-library/jest-dom";
import React from "react";
import Header from "../header";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

const mockAxios = new MockAdapter(axios);

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Header test suite", () => {
  const baseUrl = "https://frontend-take-home-service.fetch.com";

  beforeEach(() => {
    mockAxios.reset();
  });

  test("Profile opens up logout optioon", () => {
    render(
      <MemoryRouter>
        <Header setAppState={jest.fn()} />
      </MemoryRouter>
    );
    const profileButton = screen.getByRole("button");
    expect(profileButton).toBeInTheDocument();
    fireEvent.click(profileButton);
    const menu = screen.getByRole("menu");
    expect(menu).toBeInTheDocument();
  });

  test("Successfully logs out on click", async () => {
    const mockMatchResponse = {
      data: "OK",
    };
    mockAxios.onPost(`${baseUrl}/auth/logout`).reply(200, mockMatchResponse);

    const setAppState = jest.fn();

    render(
      <MemoryRouter>
        <Header setAppState={setAppState}></Header>
      </MemoryRouter>
    );

    const profileButton = screen.getByRole("button");
    fireEvent.click(profileButton);

    const logout = screen.getByTestId("logout");
    fireEvent.click(logout);

    await waitFor(() => {
      expect(setAppState).toHaveBeenCalled();
    });
  });
});
