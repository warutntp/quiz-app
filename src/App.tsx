import React from "react";
import QuizPage from "./pages/QuizPage";
import { QuizProvider } from "./context/QuizContext";

const App: React.FC = () => {
  return (
    <QuizProvider>
      <QuizPage />
    </QuizProvider>
  );
};

export default App;
