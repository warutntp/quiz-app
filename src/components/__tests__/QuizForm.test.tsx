// src/components/__tests__/QuizForm.test.tsx

import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QuizForm from "../QuizForm";
import "@testing-library/jest-dom/extend-expect";

test("QuizForm", () => {
  const handleSubmitName = jest.fn();
  const setName = jest.fn();

  const { container } = render(
    <QuizForm name="" setName={setName} handleSubmitName={handleSubmitName} />
  );
  expect(container).toMatchSnapshot();
});

test("renders quiz form and submits correctly", () => {
  const handleSubmitName = jest.fn();
  const setName = jest.fn();
  render(
    <QuizForm name="" setName={setName} handleSubmitName={handleSubmitName} />
  );

  const input = screen.getByLabelText("Enter your name:");
  fireEvent.change(input, { target: { value: "John" } });
  expect(setName).toHaveBeenCalledWith("John");

  const button = screen.getByText("Start Quiz");
  fireEvent.click(button);
  expect(handleSubmitName).toHaveBeenCalled();
});
