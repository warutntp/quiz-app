import React from "react";

interface LeaderboardProps {
  scores: { name: string; score: number }[];
}

const Leaderboard: React.FC<LeaderboardProps> = ({ scores }) => {
  return (
    <div className="p-4 border rounded-lg shadow-md bg-white mt-4">
      <h2 className="text-lg font-bold mb-4">Leaderboard</h2>
      <ul>
        {scores.map((entry, index) => (
          <li key={index} className="flex justify-between p-2 border-b">
            <span>{entry.name}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
