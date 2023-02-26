import React from "react";
import { render, screen } from "vitest-utils";
import App from "../App";

describe("App component", () => {
  test("renders header", () => {
    render(<App />);
    const headerElement = screen.getByTestId("header");
    expect(headerElement).toBeInTheDocument();
  });

  test("renders home page by default", () => {
    render(<App />);
    const homeElement = screen.getByTestId("home-page");
    expect(homeElement).toBeInTheDocument();
  });
});
