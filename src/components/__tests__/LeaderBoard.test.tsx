import { render, screen } from "@testing-library/react";
import LeaderBoard from "../LeaderBoard";
import "@testing-library/jest-dom/extend-expect";
import { LeaderModels } from "../../types/LeaderModels";
import { QuizProvider } from "../../context/QuizContext";
const mockScores: LeaderModels.LeaderModel[] = [
  { name: "John", score: 100 },
  { name: "Jane", score: 90 },
  { name: "Doe", score: 80 },
];

test("LeaderBoard", () => {
  const { container } = render(
    <QuizProvider>
      <LeaderBoard scores={mockScores} />
    </QuizProvider>
  );
  expect(container).toMatchSnapshot();
});

test("renders leaderboard correctly", () => {
  render(
    <QuizProvider>
      <LeaderBoard scores={mockScores} />
    </QuizProvider>
  );

  expect(screen.getByText("LeaderBoard")).toBeInTheDocument();
  expect(screen.getByText("John")).toBeInTheDocument();
  expect(screen.getByText("100")).toBeInTheDocument();
  expect(screen.getByText("Jane")).toBeInTheDocument();
  expect(screen.getByText("90")).toBeInTheDocument();
  expect(screen.getByText("Doe")).toBeInTheDocument();
  expect(screen.getByText("80")).toBeInTheDocument();
});
