import React from "react";

interface QuizNavigationProps {
  questionIndex: number;
  shuffledQuestions: number;
  answers: string[];
  handleNext: () => void;
  handleBack: () => void;
  handleSubmitQuiz: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  questionIndex,
  shuffledQuestions,
  answers,
  handleNext,
  handleBack,
  handleSubmitQuiz,
}) => {
  return (
    <div
      className={`flex mt-4 ${
        questionIndex > 0 ? "justify-between" : "justify-end"
      }`}
    >
      {questionIndex > 0 && (
        <button
          onClick={handleBack}
          className="py-2 px-4 bg-gray-500 text-white rounded hover:bg-gray-700"
        >
          Back
        </button>
      )}
      {questionIndex < shuffledQuestions - 1 && (
        <button
          onClick={handleNext}
          className={`py-2 px-4 ${
            answers[questionIndex] ? "bg-blue-500" : "bg-gray-500"
          } text-white rounded hover:bg-blue-700`}
          disabled={!answers[questionIndex]}
        >
          Next
        </button>
      )}
      {questionIndex === shuffledQuestions - 1 && (
        <button
          onClick={handleSubmitQuiz}
          className={`py-2 px-4 ${
            answers.some((answer) => answer === null)
              ? "bg-gray-500"
              : "bg-green-500"
          } text-white rounded hover:bg-green-700`}
          disabled={answers.some((answer) => answer === null)}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;
