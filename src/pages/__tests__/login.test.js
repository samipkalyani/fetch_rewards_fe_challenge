import React from "react";
import Login from "../Login/login";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import MockAdapter from "axios-mock-adapter";

const mockAxios = new MockAdapter(axios);

describe("login", () => {
  beforeEach(() => {
    mockAxios.reset();
  });

  const baseUrl = "https://frontend-take-home-service.fetch.com";
  test("renders the input elements", () => {
    const { getByLabelText } = render(<Login />);
    const nameInput = getByLabelText("Name");
    expect(nameInput).toBeInTheDocument();
    const emailInput = getByLabelText("Email");
    expect(emailInput).toBeInTheDocument();
  });

  test("input elements accepts text", () => {
    const { getByLabelText } = render(<Login />);

    const nameInput = getByLabelText("Name");
    expect(nameInput.value).toMatch("");
    fireEvent.change(nameInput, { target: { value: "test" } });
    expect(nameInput.value).toMatch("test");

    const emailInput = getByLabelText("Email");
    expect(emailInput.value).toMatch("");
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    expect(emailInput.value).toMatch("test@email.com");
  });

  test("validate empty inputs not allowed and helper text present", async () => {
    const { getByRole } = render(<Login />);
    const submitBtn = getByRole("button");
    await userEvent.click(submitBtn);
    expect(screen.getByText(/Enter a name./i)).toBeInTheDocument();
    expect(screen.getByText(/Enter an email address./i)).toBeInTheDocument();
  });

  test("validate the format of email address", async () => {
    const { getByLabelText, getByRole } = render(<Login />);
    const submitBtn = getByRole("button");
    const nameInput = getByLabelText("Name");
    const emailInput = getByLabelText("Email");
    fireEvent.change(nameInput, { target: { value: "testName" } });
    fireEvent.change(emailInput, { target: { value: "test.com" } });
    await userEvent.click(submitBtn);
    expect(
      screen.getByText(/Email address is not valid./i)
    ).toBeInTheDocument();
  });

  test("Success on POST /auth/login", async () => {
    render(<Login data-testid="login" />);

    const submitBtn = screen.getByRole("button");
    const nameInput = screen.getByLabelText("Name");
    const emailInput = screen.getByLabelText("Email");

    fireEvent.change(nameInput, { target: { value: "test" } });
    fireEvent.change(emailInput, { target: { value: "test@email.com" } });
    fireEvent.click(submitBtn);

    const mockFormData = {
      name: "test",
      email: "test@email.com",
    };

    const mockResponse = { data: "OK" };

    mockAxios
      .onPost(`${baseUrl}/auth/login`, mockFormData)
      .reply(200, mockResponse);

    expect(mockAxios.history.post[0].data).toEqual(
      JSON.stringify(mockFormData)
    );
    expect(mockAxios.history.post[0].url).toBe(`${baseUrl}/auth/login`);
  });
});
