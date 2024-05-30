import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { act } from "react";
import QuizShow from "../QuizShow";
import "@testing-library/jest-dom/extend-expect";

test("QuizShow", () => {
  const handleAnswer = jest.fn();
  const { container } = render(
    <QuizShow
      question="Sample Question?"
      answers={["Answer 1", "Answer 2"]}
      handleAnswer={handleAnswer}
      selectedAnswer={null}
    />
  );
  expect(container).toMatchSnapshot();
});

test("renders question and answers, selects answer correctly", () => {
  const handleAnswer = jest.fn();
  render(
    <QuizShow
      question="Sample Question?"
      answers={["Answer 1", "Answer 2"]}
      handleAnswer={handleAnswer}
      selectedAnswer={null}
    />
  );

  const answer1 = screen.getByLabelText("Answer 1");
  fireEvent.click(answer1);
  expect(handleAnswer).toHaveBeenCalledWith("Answer 1");
});
