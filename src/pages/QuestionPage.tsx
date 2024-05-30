import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/QuestionType";
import { QuestionData } from "../data/QuestionData";
import Question from "../components/Question";
import LeaderBoard from "../components/LeaderBoard";
import { RandomData } from "../utils/RandomData";

const QuestionPage = () => {
  const [currentQuestion, setCurrentQuestion] = useState<QuestionType | null>(
    null
  );
  const [leaderBoard, setLeaderBoard] = useState<
    { name: string; score: number }[]
  >([]);
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuestionType[]>(
    []
  );

  useEffect(() => {
    const savedLeaderBoard = localStorage.getItem("leaderBoard");
    if (savedLeaderBoard) {
      setLeaderBoard(JSON.parse(savedLeaderBoard));
    }
  }, []);

  useEffect(() => {
    if (isQuizActive) {
      const shuffled = RandomData([...QuestionData], 20);
      setShuffledQuestions(shuffled);
      setCurrentQuestion(shuffled[0]);
      setQuestionIndex(0);
    }
  }, [isQuizActive]);

  const handleAnswer = (answer: string) => {
    if (currentQuestion) {
      if (answer === currentQuestion.correct) {
        setScore(score + 1);
      }
      if (questionIndex < 19) {
        const nextIndex = questionIndex + 1;
        setCurrentQuestion(shuffledQuestions[nextIndex]);
        setQuestionIndex(nextIndex);
      } else {
        setIsQuizActive(false);
        const newLeaderBoard = [...leaderBoard, { name, score }];
        setLeaderBoard(newLeaderBoard);
        localStorage.setItem("leaderBoard", JSON.stringify(newLeaderBoard));
        setName("");
        setScore(0);
        setQuestionIndex(0);
      }
    }
  };

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuizActive(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      {!isQuizActive && (
        <form onSubmit={handleSubmitName} className="mb-4">
          <div className="mb-2">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Enter your name:
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Start Quiz
          </button>
        </form>
      )}
      {isQuizActive && currentQuestion && (
        <Question
          question={currentQuestion.question}
          answers={currentQuestion.answers}
          handleAnswer={handleAnswer}
        />
      )}
      <LeaderBoard scores={leaderBoard} />
    </div>
  );
};

export default QuestionPage;
