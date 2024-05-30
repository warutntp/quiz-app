import React, { useEffect, useState } from "react";
import { QuestionModels } from "../types/QuestionModels";
import { QuestionData } from "../data/QuestionData";
import Question from "../components/Question";
import LeaderBoard from "../components/LeaderBoard";
import { RandomData } from "../utils/RandomData";
import {
  loadLeaderDataFromLocalStorage,
  saveLeaderDataToLocalStorage,
} from "../utils/localStorage";
import { LeaderModels } from "../types/LeaderModels";

const QuestionPage = () => {
  const [currentQuestion, setCurrentQuestion] =
    useState<QuestionModels.QuestionModel | null>(null);
  const [leaderBoard, setLeaderBoard] = useState<LeaderModels.LeaderModel[]>(
    []
  );
  const [name, setName] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [isQuizActive, setIsQuizActive] = useState<boolean>(false);
  const [questionIndex, setQuestionIndex] = useState<number>(0);
  const [shuffledQuestions, setShuffledQuestions] = useState<
    QuestionModels.QuestionModel[]
  >([]);
  const [answers, setAnswers] = useState<string[]>([]);

  useEffect(() => {
    const savedLeaderBoard = loadLeaderDataFromLocalStorage();
    if (savedLeaderBoard) {
      setLeaderBoard(savedLeaderBoard);
    }
  }, []);

  useEffect(() => {
    if (isQuizActive) {
      const shuffled = RandomData([...QuestionData], 20);
      setShuffledQuestions(shuffled);
      setCurrentQuestion(shuffled[0]);
      setQuestionIndex(0);
      setAnswers(Array(shuffled.length).fill(null));
    }
  }, [isQuizActive]);

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleNext = () => {
    if (questionIndex < shuffledQuestions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(shuffledQuestions[questionIndex + 1]);
    }
  };

  const handleBack = () => {
    if (questionIndex > 0) {
      setQuestionIndex(questionIndex - 1);
      setCurrentQuestion(shuffledQuestions[questionIndex - 1]);
    }
  };

  const handleSubmitQuiz = () => {
    if (answers.some((answer) => answer === null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    const newScore = answers.reduce((acc, answer, idx) => {
      if (answer === shuffledQuestions[idx].correct) {
        return acc + 1;
      }
      return acc;
    }, 0);

    setScore(newScore);
    setIsQuizActive(false);
    const newLeaderBoard = [...leaderBoard, { name, score: newScore }];
    setLeaderBoard(newLeaderBoard);
    saveLeaderDataToLocalStorage(newLeaderBoard);
  };

  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault();
    setIsQuizActive(true);
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Quiz App</h1>
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
        <div>
          <p className="mt-4">
            Question {questionIndex + 1} of {shuffledQuestions.length}
          </p>
          <Question
            question={currentQuestion.question}
            answers={currentQuestion.answers}
            handleAnswer={handleAnswer}
            selectedAnswer={answers[questionIndex]}
          />
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
            {questionIndex < shuffledQuestions.length - 1 && (
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
            {questionIndex === shuffledQuestions.length - 1 && (
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
        </div>
      )}
      {!isQuizActive && score > 0 && (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold mb-4">Your Score: {score}</h2>
        </div>
      )}
      <LeaderBoard scores={leaderBoard} />
    </div>
  );
};

export default QuestionPage;
