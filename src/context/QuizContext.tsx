import React, {
  createContext,
  useReducer,
  ReactNode,
  Dispatch,
  useEffect,
  useMemo,
} from "react";
import { QuizModels } from "../types/QuizModels";
import { LeaderModels } from "../types/LeaderModels";
import { RandomData } from "../utils/RandomData";
import { QuizData } from "../data/QuizData";
import {
  loadLeaderDataFromLocalStorage,
  saveLeaderDataToLocalStorage,
} from "../utils/LocalStorage";

type State = {
  currentQuestion: QuizModels.QuizModel | null;
  leaderBoard: LeaderModels.LeaderModel[];
  name: string;
  score: number;
  isQuizActive: boolean;
  questionIndex: number;
  totalQuestions: QuizModels.QuizModel[];
  answers: string[];
};

const initialState: State = {
  currentQuestion: null,
  leaderBoard: [],
  name: "",
  score: 0,
  isQuizActive: false,
  questionIndex: 0,
  totalQuestions: [],
  answers: [],
};

type Action =
  | { type: "SET_NAME"; payload: string }
  | { type: "START_QUIZ" }
  | { type: "ANSWER_QUESTION"; payload: string }
  | { type: "NEXT_QUESTION" }
  | { type: "PREVIOUS_QUESTION" }
  | { type: "SUBMIT_QUIZ" }
  | { type: "LOAD_LEADERBOARD"; payload: LeaderModels.LeaderModel[] };

const quizReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_NAME":
      return { ...state, name: action.payload };
    case "START_QUIZ": {
      const shuffled = RandomData([...QuizData], 20);
      return {
        ...state,
        isQuizActive: true,
        totalQuestions: shuffled,
        currentQuestion: shuffled[0],
        questionIndex: 0,
        answers: Array(shuffled.length).fill(null),
      };
    }
    case "ANSWER_QUESTION": {
      const newAnswers = [...state.answers];
      newAnswers[state.questionIndex] = action.payload;
      return { ...state, answers: newAnswers };
    }
    case "NEXT_QUESTION":
      if (state.questionIndex < state.totalQuestions.length - 1) {
        return {
          ...state,
          questionIndex: state.questionIndex + 1,
          currentQuestion: state.totalQuestions[state.questionIndex + 1],
        };
      }
      return state;
    case "PREVIOUS_QUESTION":
      if (state.questionIndex > 0) {
        return {
          ...state,
          questionIndex: state.questionIndex - 1,
          currentQuestion: state.totalQuestions[state.questionIndex - 1],
        };
      }
      return state;
    case "SUBMIT_QUIZ": {
      const newScore = state.answers.reduce((acc, answer, idx) => {
        if (answer === state.totalQuestions[idx].correct) {
          return acc + 1;
        }
        return acc;
      }, 0);

      const newLeaderBoard = [
        ...state.leaderBoard,
        { name: state.name, score: newScore },
      ];
      saveLeaderDataToLocalStorage(newLeaderBoard);

      return {
        ...state,
        score: newScore,
        isQuizActive: false,
        leaderBoard: newLeaderBoard,
      };
    }
    case "LOAD_LEADERBOARD":
      return { ...state, leaderBoard: action.payload };
    default:
      return state;
  }
};

interface QuizContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

const QuizContext = createContext<QuizContextProps>(undefined as any);

const QuizProvider: React.FC<{ children?: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  useEffect(() => {
    const savedLeaderBoard = loadLeaderDataFromLocalStorage();
    dispatch({ type: "LOAD_LEADERBOARD", payload: savedLeaderBoard });
  }, [dispatch]);

  const contextValue = useMemo(() => ({ state, dispatch }), [state, dispatch]);

  return (
    <QuizContext.Provider value={contextValue}>{children}</QuizContext.Provider>
  );
};

export { QuizContext, QuizProvider };
