import React, { useMemo } from "react";

interface QuizShowProps {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
  selectedAnswer: string | null;
}

const QuizShow: React.FC<QuizShowProps> = ({
  question,
  answers,
  handleAnswer,
  selectedAnswer,
}) => {
  const renderedAnswers = useMemo(() => {
    return answers.map((answer, index) => (
      <div
        key={answer}
        className="px-2 mb-4 border rounded-lg shadow bg-blue-100 hover:bg-blue-300"
      >
        <label
          key={answer}
          className="block my-2"
          aria-label={`Answer ${index + 1}`}
        >
          <input
            type="radio"
            name="answer"
            value={answer}
            checked={selectedAnswer === answer}
            onChange={() => handleAnswer(answer)}
            className="mr-2"
          />
          {answer}
        </label>
      </div>
    ));
  }, [answers, handleAnswer, selectedAnswer]);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      {renderedAnswers}
    </div>
  );
};

export default QuizShow;
