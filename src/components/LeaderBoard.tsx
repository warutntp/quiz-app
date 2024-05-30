import React from "react";
import { LeaderModels } from "../types/LeaderModels";

interface LeaderBoardProps {
  scores: LeaderModels.LeaderModel[];
}

const LeaderBoard: React.FC<LeaderBoardProps> = ({ scores }) => {
  const sortedScores = scores.slice().sort((a, b) => b.score - a.score);

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-4 max-h-[500px] overflow-y-auto">
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
