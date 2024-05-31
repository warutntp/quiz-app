export const RandomData = <T>(array: T[], numQuestions: number): T[] => {
  const shuffledArray = array.sort(() => 0.5 - Math.random());
  return shuffledArray.slice(0, numQuestions);
};
