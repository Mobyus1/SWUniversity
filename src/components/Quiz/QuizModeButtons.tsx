import type { Quiz } from "../../util/func";
import { globalBackgroundStyle } from "../../util/const";

interface IProps {
  setQuizMode: (mode: "marathon" | "endless") => void;
  setCurrentQuizSet: (set: Quiz[]) => void;
  setCurrentQuizId: (id: number) => void;
  allQuizzes: Quiz[];
  marathonSet: number[];
}

export function QuizModeButtons({setQuizMode, setCurrentQuizSet, setCurrentQuizId, allQuizzes, marathonSet}: IProps) {
  return <div className="flex flex-col md:flex-row gap-2 mb-8 h-full">
    <div className={`${globalBackgroundStyle} border p-4 rounded flex flex-col items-center justify-center flex-1`}>
      <h3 className="text-xl mb-4">DESCRIPTION TEXT</h3>
      <button
        className="btn btn-primary text-lg p-4 w-1/2"
        onClick={() => {
          setQuizMode("marathon");
          const filteredSet = allQuizzes.filter(quiz => marathonSet.includes(quiz.id));
          setCurrentQuizSet(filteredSet);
          setCurrentQuizId(Math.floor(Math.random() * filteredSet.length));
        }}
      >
        Marathon Mode
      </button>
    </div>

    <div className={`${globalBackgroundStyle} border p-4 rounded flex flex-col items-center justify-center flex-1`}>
      <h3 className="text-xl mb-4">DESCRIPTION TEXT</h3>
      <button
        className="btn btn-primary text-lg p-4 w-1/2"
        onClick={() => {
          setQuizMode("endless");
          setCurrentQuizSet(allQuizzes);
          setCurrentQuizId(Math.floor(Math.random() * allQuizzes.length));
        }}
      >
        Endless Mode
      </button>
    </div>
  </div>
}