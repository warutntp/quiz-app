import { LeaderModels } from "../types/LeaderModels";

export function saveLeaderDataToLocalStorage(
  state: LeaderModels.LeaderModel[]
) {
  localStorage.setItem("leader-board", JSON.stringify(state));
}

export function loadLeaderDataFromLocalStorage(): LeaderModels.LeaderModel[] {
  const data = localStorage.getItem("leader-board");
  if (data) {
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
  return [];
}
