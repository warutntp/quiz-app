import React, { useState, useEffect } from "react";
import Question from "./components/Question";
import Leaderboard from "./components/LeaderBoard";

interface QuestionType {
  question: string;
  answers: string[];
}

const questions: QuestionType[] = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Rome"],
  },
  { question: "What is 2 + 2?", answers: ["3", "4", "5", "6"] },
  // Add more questions here
];

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const App: React.FC = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );
  const [leaderboard, setLeaderboard] = useState<
    { name: string; score: number }[]
  >([]);

  useEffect(() => {
    const shuffledQuestions = shuffleArray([...questions]);
    const selectedQuestion = shuffledQuestions[0];
    selectedQuestion.answers = shuffleArray([...selectedQuestion.answers]);
    setCurrentQuestion(selectedQuestion);
  }, []);

  const handleAnswer = (answer: string) => {
    // Handle answer logic here
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {currentQuestion && (
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          handleAnswer={handleAnswer}
        />
      )}
      <Leaderboard scores={leaderboard} />
    </div>
  );
};

export default App;
