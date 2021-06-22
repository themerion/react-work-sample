import { render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";

test("renders search label", () => {
  render(<App />);
  const linkElement = screen.getAllByText(/Search/i);
  expect(linkElement).toBeTruthy();
});

/* TODO: Test search behaviour - in the fictional universe where this app will be further developed */
