import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom/extend-expect";

test("App", () => {
  const { container } = render(<App />);
  expect(container).toMatchSnapshot();
});

test("renders Quiz App heading", () => {
  render(<App />);
  const headingElement = screen.getByText(/Quiz App/i);
  expect(headingElement).toBeInTheDocument();
});
