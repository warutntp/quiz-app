import { LeaderModels } from "../types/LeaderModels";

export function saveLeaderDataToLocalStorage(
  state: LeaderModels.LeaderModel[]
) {
  try {
    localStorage.setItem("leader-board", JSON.stringify(state));
  } catch (error) {
    console.error("Error saving leaderboard data to local storage:", error);
  }
}

export function loadLeaderDataFromLocalStorage(): LeaderModels.LeaderModel[] {
  const data = localStorage.getItem("leader-board");
  if (data) {
    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(
        "Error parsing leaderboard data from local storage:",
        error
      );
      localStorage.removeItem("leader-board");
      return [];
    }
  }
  return [];
}
