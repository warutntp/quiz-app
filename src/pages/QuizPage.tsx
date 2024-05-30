import React, { useContext } from "react";
import { QuizContext } from "../context/QuizContext";
import QuizShow from "../components/QuizShow";
import LeaderBoard from "../components/LeaderBoard";
import QuizForm from "../components/QuizForm";
import QuizNavigation from "../components/QuizNavigation";

const QuizPage = () => {
  const context = useContext(QuizContext);

  if (!context) {
    throw new Error("QuizContext must be used within a QuizProvider");
  }

  const { state, dispatch } = context;
  const handleSubmitName = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({ type: "START_QUIZ" });
  };

  const handleAnswer = (answer: string) => {
    dispatch({ type: "ANSWER_QUESTION", payload: answer });
  };

  const handleNext = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleBack = () => {
    dispatch({ type: "PREVIOUS_QUESTION" });
  };

  const handleSubmitQuiz = () => {
    if (state.answers.some((answer) => answer === null)) {
      alert("Please answer all questions before submitting.");
      return;
    }
    dispatch({ type: "SUBMIT_QUIZ" });
  };

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h1 className="text-center text-2xl font-bold mb-4">Quiz App</h1>
      {!state.isQuizActive && (
        <QuizForm
          name={state.name}
          setName={(name) => dispatch({ type: "SET_NAME", payload: name })}
          handleSubmitName={handleSubmitName}
        />
      )}
      {state.isQuizActive && state.currentQuestion && (
        <>
          <p className="mt-4">
            Question {state.questionIndex + 1} of{" "}
            {state.shuffledQuestions.length}
          </p>
          <QuizShow
            question={state.currentQuestion.question}
            answers={state.currentQuestion.answers}
            handleAnswer={handleAnswer}
            selectedAnswer={state.answers[state.questionIndex]}
          />
          <QuizNavigation
            questionIndex={state.questionIndex}
            shuffledQuestions={state.shuffledQuestions.length}
            answers={state.answers}
            handleNext={handleNext}
            handleBack={handleBack}
            handleSubmitQuiz={handleSubmitQuiz}
          />
        </>
      )}
      {!state.isQuizActive && state.score > 0 && (
        <div className="mt-4 p-4 border rounded-lg shadow-md bg-white">
          <h2 className="text-lg font-bold mb-4">Your Score: {state.score}</h2>
        </div>
      )}
      <LeaderBoard scores={state.leaderBoard} />
    </div>
  );
};

export default QuizPage;
