import React from "react";

interface QuizNavigationProps {
  questionIndex: number;
  totalQuestions: number;
  answers: string[];
  handleNext: () => void;
  handleBack: () => void;
  handleSubmitQuiz: () => void;
}

const QuizNavigation: React.FC<QuizNavigationProps> = ({
  questionIndex,
  totalQuestions,
  answers,
  handleNext,
  handleBack,
  handleSubmitQuiz,
}) => {
  const isNextDisabled = !answers[questionIndex];
  const isSubmitDisabled = answers.some((answer) => answer === null);

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
      {questionIndex < totalQuestions - 1 && (
        <button
          onClick={handleNext}
          className={`py-2 px-4 ${
            isNextDisabled ? "bg-gray-500" : "bg-blue-500"
          } text-white rounded hover:bg-blue-700`}
          disabled={isNextDisabled}
        >
          Next
        </button>
      )}
      {questionIndex === totalQuestions - 1 && (
        <button
          onClick={handleSubmitQuiz}
          className={`py-2 px-4 ${
            isSubmitDisabled ? "bg-gray-500" : "bg-green-500"
          } text-white rounded hover:bg-green-700`}
          disabled={isSubmitDisabled}
        >
          Submit
        </button>
      )}
    </div>
  );
};

export default QuizNavigation;
