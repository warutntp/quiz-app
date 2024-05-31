import { render, screen, fireEvent } from "@testing-library/react";
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

  const answer1 = screen.getByLabelText(/Answer 1/i, { selector: "input" });
  fireEvent.click(answer1);
  expect(handleAnswer).toHaveBeenCalledWith("Answer 1");
});

test("renders question and answers with ARIA labels", () => {
  const handleAnswer = jest.fn();
  render(
    <QuizShow
      question="Sample Question?"
      answers={["Answer 1", "Answer 2"]}
      handleAnswer={handleAnswer}
      selectedAnswer={null}
    />
  );

  const answer1 = screen.getByLabelText(/Answer 1/i, { selector: "input" });
  expect(answer1).toBeInTheDocument();

  fireEvent.click(answer1);
  expect(handleAnswer).toHaveBeenCalledWith("Answer 1");
});
