import React from "react";
import { getQuizDataAsync } from "../util/func";
import type { Quiz } from "../util/func";
import { QuizModeButtons } from "../components/Quiz/QuizModeButtons";
import { QuizContent } from "../components/Quiz/QuizContent";
import type { QuizModes } from "../util/const";

const marathonSet: number[] = [
  //TODO: fill with specific quiz IDs when we have a lot more
];

function QuizPage() {
  const [allQuizzes, setAllQuizzes] = React.useState<Quiz[]>([]);
  const [currentQuizSet, setCurrentQuizSet] = React.useState<Quiz[]>(allQuizzes);
  const [quizMode, setQuizMode] = React.useState<QuizModes>("");
  const [currentQuizId, setCurrentQuizId] = React.useState(0);
  const [currentQuizKeys, setCurrentQuizKeys] = React.useState<string[]>([]);
  const [quizzesCompleted, setQuizzesCompleted] = React.useState<number[]>([]);
  const [lastEndlessQuizzes, setLastEndlessQuizzes] = React.useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = React.useState<string>("");
  const [quizResult, setQuizResult] = React.useState<boolean>(false);

  React.useEffect(() => {
    getQuizDataAsync().then(data => {
      setAllQuizzes(data);
      marathonSet.push(...data.map(quiz => quiz.id));//identical to all quizzes for now
    });
  }, []);

  const renderQuizContent = () => currentQuizSet.length === 0
    ? <p className="text-lg">Loading quizzes...</p>
    : <QuizContent
        currentQuizSet={currentQuizSet}
        currentQuizId={currentQuizId}
        quizMode={quizMode}
        allQuizzes={allQuizzes}
        quizzesCompleted={quizzesCompleted}
        lastEndlessQuizzes={lastEndlessQuizzes}
        quizResult={quizResult}
        selectedAnswer={selectedAnswer}
        currentQuizKeys={currentQuizKeys}
        setCurrentQuizId={setCurrentQuizId}
        setQuizResult={setQuizResult}
        setSelectedAnswer={setSelectedAnswer}
        setQuizzesCompleted={setQuizzesCompleted}
        setCurrentQuizKeys={setCurrentQuizKeys}
        setLastEndlessQuizzes={setLastEndlessQuizzes}
        setQuizMode={setQuizMode}
      />

  return <div>
    <h1 className="text-2xl md:text-4xl font-bold mb-4">{getQuizModeTitle(quizMode)}</h1>
    {
      quizMode === ""
        ? <QuizModeButtons
          setQuizMode={setQuizMode}
          setCurrentQuizSet={setCurrentQuizSet}
          setCurrentQuizId={setCurrentQuizId}
          allQuizzes={allQuizzes}
          marathonSet={marathonSet}
        />
        : renderQuizContent()
    }
  </div>;
}

function getQuizModeTitle(mode: QuizModes): string {
  switch(mode) {
    case "marathon":
      return "Marathon Mode";
    case "endless":
      return "Endless Mode";
    default:
      return "";
  }
}

export default QuizPage;
