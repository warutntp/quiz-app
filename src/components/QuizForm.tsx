import React from "react";

interface QuizFormProps {
  name: string;
  setName: (name: string) => void;
  handleSubmitName: (e: React.FormEvent) => void;
}

const QuizForm: React.FC<QuizFormProps> = ({
  name,
  setName,
  handleSubmitName,
}) => {
  return (
    <form onSubmit={handleSubmitName} className="mb-4">
      <div className="mb-2">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-700"
        >
          Enter your name:
        </label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
          required
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-700"
      >
        Start Quiz
      </button>
    </form>
  );
};

export default QuizForm;
