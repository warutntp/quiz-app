# Quiz App

This project is a simple quiz application built with React and TypeScript. The app allows users to take a quiz, answer multiple-choice questions, and view a leaderboard with high scores.

## Features

- User can enter their name to start the quiz.
- Quiz contains multiple-choice questions.
- Users can navigate between questions using "Next" and "Back" buttons.
- Users can submit their quiz to see their score.
- A leaderboard displays the top scores.
- The leaderboard data is persisted in the local storage.

## Installation

To run this project locally, follow these steps:

1. Clone the repository:

```bash
git clone git@github.com:warutntp/quiz-app.git
cd quiz-app
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Open your browser and navigate to <http://localhost:3000>.

4. To run the tests, use the following command:

```bash
npm test
```

## Usage

1. On the homepage, enter your name and click "Start Quiz" to begin.
2. Answer the multiple-choice questions by selecting the appropriate radio button.
3. Use the "Next" and "Back" buttons to navigate between questions.
4. Once all questions are answered, click "Submit" to see your score.
5. View the leaderboard to see your score compared to others.

## Project Structure

- **`src/components`**: Contains all the React components used in the app.
  - **`LeaderBoard.tsx`**: Component to display the leaderboard.
  - **`QuizForm.tsx`**: Component for the quiz start form where users enter their name.
  - **`QuizNavigation.tsx`**: Component with navigation buttons for the quiz.
  - **`QuizShow.tsx`**: Component to display the quiz questions and answers.
- **`src/context`**: Contains the context and provider for managing quiz state.
  - **`QuizContext.tsx`**: Context and reducer for quiz state management.
- **`src/data`**: Contains the quiz data.
  - **`QuizData.ts`**: Array of quiz questions and answers.
- **`src/pages`**: Contains the main page component.
  - **`QuizPage.tsx`**: Main page component that uses all other components.
- **`src/types`**: Type definitions for the project.
  - **`LeaderModels.d.ts`**:Type definitions for the leaderboard models.
  - **`QuizModels.d.ts`**: Type definitions for the quiz models.
- **`src/utils`**: Utility functions for the project.
  - **`LocalStorage.ts`**: Functions to load and save leaderboard data from/to local storage.
  - **`RandomData.ts`**: Function to shuffle and select a subset of quiz questions.
- **`src/App.tsx`**: Root component of the application.
- **`src/index.tsx`**: Entry point of the application.
- **`package.json`**: Project dependencies and scripts.
