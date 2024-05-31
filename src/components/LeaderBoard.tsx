import React, { useContext, useMemo } from "react";
import { LeaderModels } from "../types/LeaderModels";
import { QuizContext } from "../context/QuizContext";

interface LeaderBoardProps {
  scores: LeaderModels.LeaderModel[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ scores }) => {
  const context = useContext(QuizContext);
  const { state } = context;

  const sortedScores = useMemo(
    () => scores.slice().sort((a, b) => b.score - a.score),
    [scores]
  );

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
          <li key={entry.name} className="flex justify-between p-2 border-b">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LeaderBoard;
