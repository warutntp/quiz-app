import React from "react";

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
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      {answers.map((answer, index) => (
        <label key={index} className="block my-2">
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
      ))}
    </div>
  );
};

export default QuizShow;
