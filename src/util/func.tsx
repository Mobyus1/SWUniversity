export type Quiz = {
  id: number;
  question: string;
  choices: string[];
  answer: number;
  relevantCards: string[];
  relevantRule: string;
  tags: string[];
}

const includedPhases = [
  '2025-09-28',
]

export async function getQuizDataAsync() : Promise<Quiz[]> {
  const allQuizzes: Quiz[] = [];
  for (const phase of includedPhases) {
    const quizzes = await fetch(`/quizzes/${phase}.json`)
      .then(response => response.json())
      .then(data => data);
    allQuizzes.push(...quizzes);
  }

  return allQuizzes;
}