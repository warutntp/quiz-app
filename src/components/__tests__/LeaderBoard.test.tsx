import React from "react";
import { render, screen } from "@testing-library/react";
import LeaderBoard from "../LeaderBoard";
import "@testing-library/jest-dom/extend-expect";
import { LeaderModels } from "../../types/LeaderModels";

const mockScores: LeaderModels.LeaderModel[] = [
  { name: "John", score: 100 },
  { name: "Jane", score: 90 },
  { name: "Doe", score: 80 },
];

test("LeaderBoard", () => {
  const { container } = render(<LeaderBoard scores={mockScores} />);
  expect(container).toMatchSnapshot();
});

test("renders leaderboard correctly", () => {
  render(<LeaderBoard scores={mockScores} />);

  expect(screen.getByText("LeaderBoard")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByText("Jane")).toBeInTheDocument();
  expect(screen.getByText("90")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(screen.getByText("80")).toBeInTheDocument();
});
