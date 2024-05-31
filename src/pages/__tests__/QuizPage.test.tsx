import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import QuizPage from "../QuizPage";
import { QuizProvider } from "../../context/QuizContext";
import "@testing-library/jest-dom/extend-expect";

test("QuizPage", () => {
  const { container } = render(
    <QuizProvider>
      <QuizPage />
    </QuizProvider>
  );
  expect(container).toMatchSnapshot();
});

test("renders QuizPage and starts quiz correctly", async () => {
  render(
    <QuizProvider>
      <QuizPage />
    </QuizProvider>
  );

  const input = screen.getByLabelText("Enter your name:");
  fireEvent.change(input, { target: { value: "John" } });

  const button = screen.getByText("Start Quiz");
  fireEvent.click(button);

  expect(
    screen.getByText((content, element) => content.startsWith("Question 1 of"))
  ).toBeInTheDocument();
});
