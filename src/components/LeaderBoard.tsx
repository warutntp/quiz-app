import React, { useContext } from "react";
import { LeaderModels } from "../types/LeaderModels";
import { QuizContext } from "../context/QuizContext";

interface LeaderBoardProps {
  scores: LeaderModels.LeaderModel[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ scores }) => {
  const sortedScores = scores.slice().sort((a, b) => b.score - a.score);
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error("QuizContext must be used within a QuizProvider");
  }
  const { state } = context;

  return (
    <div
      className={`p-4 border rounded-lg shadow-md bg-white mt-4 overflow-y-auto ${
        state.isQuizActive && state.currentQuestion
          ? "max-h-[400px]"
          : "max-h-[600px]"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">LeaderBoard</h2>
      <ul>
        {sortedScores.map((entry, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
