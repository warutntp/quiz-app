import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import QuizNavigation from "../QuizNavigation";
import "@testing-library/jest-dom/extend-expect";

test("QuizNavigation", () => {
  const handleNext = jest.fn();
  const handleBack = jest.fn();
  const handleSubmitQuiz = jest.fn();

  const { container } = render(
    <QuizNavigation
      questionIndex={0}
      shuffledQuestions={10}
      answers={["Answer"]}
      handleNext={handleNext}
      handleBack={handleBack}
      handleSubmitQuiz={handleSubmitQuiz}
    />
  );
  expect(container).toMatchSnapshot();
});

test("renders navigation buttons and handles clicks correctly", () => {
  const handleNext = jest.fn();
  const handleBack = jest.fn();
  const handleSubmitQuiz = jest.fn();

  render(
    <QuizNavigation
      questionIndex={0}
      shuffledQuestions={10}
      answers={["Answer"]}
      handleNext={handleNext}
      handleBack={handleBack}
      handleSubmitQuiz={handleSubmitQuiz}
    />
  );

  const nextButton = screen.getByText("Next");
  fireEvent.click(nextButton);
  expect(handleNext).toHaveBeenCalled();
});
