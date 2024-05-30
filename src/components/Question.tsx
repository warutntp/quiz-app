import React from "react";

interface QuestionProps {
  question: string;
  answers: string[];
  handleAnswer: (answer: string) => void;
}

const Question: React.FC<QuestionProps> = ({
  question,
  answers,
  handleAnswer,
}) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-bold mb-4">{question}</h2>
      {answers.map((answer, index) => (
        <button
          key={index}
          className="block w-full p-2 my-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          onClick={() => handleAnswer(answer)}
        >
          {answer}
        </button>
      ))}
    </div>
  );
};

export default Question;
