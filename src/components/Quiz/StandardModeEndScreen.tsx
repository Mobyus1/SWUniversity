import { globalBackgroundStyle, type QuizModes } from "../../util/const";
import type { Quiz } from "../../util/func";

interface IProps {
  userResponses: {[key: number]: {selected: string; correct: string}};
  setUserResponses: (responses: {[key: number]: {selected: string; correct: string}}) => void;
  currentQuizSet: Quiz[];
  standardQuizLength: number;
  setQuizMode: (mode: QuizModes) => void;
  setCurrentQuizId: (id: number) => void;
  setStandardQuizLength: (length: number) => void;
  setQuizzesCompleted: (completed: number[]) => void;
  setQuizResult: (result: boolean) => void;
  setSelectedAnswer: (answer: string) => void;
}

export function StandardModeEndScreen({
  userResponses,
  setUserResponses,
  currentQuizSet,
  standardQuizLength,
  setQuizMode,
  setCurrentQuizId,
  setStandardQuizLength,
  setQuizzesCompleted,
  setQuizResult,
  setSelectedAnswer
}: IProps) {
  return <div className="text-center m-[35%_10%] lg:m-[15%_10%]">
    <p className="text-2xl md:text-4xl font-bold mb-4 h-32">Quiz Complete! You answered {Object.values(userResponses).filter(response => response.selected === response.correct).length} out of {standardQuizLength} questions correctly.</p>
    <button className="btn btn-primary text-lg p-4" onClick={() => {
      setQuizzesCompleted([]);
      setUserResponses({});
      setCurrentQuizId(0);
      setQuizResult(false);
      setSelectedAnswer("");
      setQuizMode("");
      setStandardQuizLength(0);
    }}>Go Back to Quiz Menu</button>
    <div className={"mt-8 text-left p-8 " + globalBackgroundStyle}>
      <details>
        <summary className="text-xl font-bold mb-4 cursor-pointer">Review Your Answers</summary>
        <div className="mt-4">
          {
            Object.keys(userResponses).map((quizId, index) => {
              const response = userResponses[parseInt(quizId)];
              const quiz = currentQuizSet[index];

              return <div key={quizId} className="mb-6 p-4 border rounded">
                <p className="font-bold">Q: {quiz.question}</p>
                <p>Your answer: <span className={response.selected === response.correct ? "text-green-500 font-bold" : "text-red-500 font-bold"}>{quiz.choices[response.selected]}</span></p>
                {response.selected !== response.correct && <p>Correct answer: <span className="text-green-500 font-bold">{quiz.choices[response.correct]}</span></p>}
              </div>;
            })
          }
        </div>
      </details>
    </div>
  </div>;
}