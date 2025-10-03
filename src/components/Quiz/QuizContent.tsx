import React from "react";
import { globalBackgroundStyle, type QuizModes } from "../../util/const";
import type { Quiz } from "../../util/func";

interface IProps {
  currentQuizSet: Quiz[];
  currentQuizId: number;
  quizMode: QuizModes;
  allQuizzes: Quiz[];
  quizzesCompleted: number[];
  lastEndlessQuizzes: number[];
  quizResult: boolean;
  selectedAnswer: string;
  currentQuizKeys: string[];
  setCurrentQuizId: (id: number) => void;
  setQuizResult: (result: boolean) => void;
  setSelectedAnswer: (answer: string) => void;
  setQuizzesCompleted: (completed: number[]) => void;
  setLastEndlessQuizzes: (list: number[]) => void;
  setCurrentQuizKeys: (keys: string[]) => void;
  setQuizMode: (mode: "" | "marathon" | "endless") => void;
}

export function QuizContent({
  currentQuizSet,
  currentQuizId,
  quizMode,
  allQuizzes,
  quizzesCompleted,
  lastEndlessQuizzes,
  quizResult,
  selectedAnswer,
  currentQuizKeys,
  setCurrentQuizId,
  setQuizResult,
  setSelectedAnswer,
  setQuizzesCompleted,
  setCurrentQuizKeys,
  setLastEndlessQuizzes,
  setQuizMode
}: IProps) {
  const [showModal, setShowModal] = React.useState(false);
  const renderChoices = () => {
    if(allQuizzes.length === 0) return null;
    if(!currentQuizKeys || currentQuizKeys.length === 0) {
      const choiceKeys = Object.keys(allQuizzes[currentQuizId].choices);
      for (let i = choiceKeys.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [choiceKeys[i], choiceKeys[j]] = [choiceKeys[j], choiceKeys[i]];
      }
      setCurrentQuizKeys(choiceKeys);
    }

    const highlighted = (index: number) => {
      if(!quizResult) return "";
      return allQuizzes[currentQuizId].answer === currentQuizKeys[index]
        ? "bg-green-800/50 px-4 py-1 rounded"
        : selectedAnswer === currentQuizKeys[index]
          ? "bg-red-800/50 px-4 py-1 rounded"
          : "";
    }

    const divs = currentQuizKeys.map((_, index) => <div key={index} className={"mb-2.5 " + highlighted(index)}>
        <label className="text-md md:text-lg">
          <input
            type="radio"
            name="quiz-choice"
            value={currentQuizKeys[index]}
            className="mr-2.5 md:scale-110"
            checked={selectedAnswer === currentQuizKeys[index]}
            onChange={() => setSelectedAnswer(currentQuizKeys[index])}
            disabled={quizResult}
          />
          {allQuizzes[currentQuizId].choices[currentQuizKeys[index]]}
        </label>
      </div>
    );

    return divs;
  }

  return <div>
  {
    quizzesCompleted.length === currentQuizSet.length && <div className="text-center m-[35%_10%] lg:m-[15%_10%]">
      <p className="text-2xl md:text-4xl font-bold mb-4 h-32">You've correctly answered every question!</p>
      <button className="btn btn-primary text-lg p-4" onClick={() => {
        setQuizzesCompleted([]);
        setCurrentQuizId(Math.floor(Math.random() * currentQuizSet.length));
        setQuizResult(false);
        setSelectedAnswer("");
        setQuizMode("");
      }}>Go Back to Quiz Menu</button>
    </div>
  }
  {
      quizzesCompleted.length < currentQuizSet.length && currentQuizSet[currentQuizId] && <div className={`grid ${globalBackgroundStyle} shadow-md md:grid-cols-[40%_60%] border p-8 rounded shadow-md gap-4`}>
      {/* Question and choices */}
      <div>
        <p className="mb-2.5 text-lg md:text-xl">{currentQuizSet[currentQuizId].question}</p>
        <form onSubmit={(e) => {
          e.preventDefault();
          const form = e.target as HTMLFormElement;
          const quizChoice = form.elements.namedItem('quiz-choice') as HTMLInputElement;
          onSubmitAnswer(quizChoice.value, setQuizResult);
        }}>
        {renderChoices()}
        {!quizResult && <button type="submit" className="btn btn-primary mt-4 text-lg p-4">Submit Answer</button>}
        {
          quizResult && quizzesCompleted.length < currentQuizSet.length
            ? <button className="btn btn-secondary mt-4 text-lg p-4" onClick={() =>
                  onNextQuestion(quizMode, selectedAnswer, currentQuizId, currentQuizSet[currentQuizId].answer.toString(),
                    currentQuizSet, quizzesCompleted, lastEndlessQuizzes,
                    setQuizzesCompleted, setCurrentQuizId, setQuizResult, setSelectedAnswer, setLastEndlessQuizzes)}>
                Next Question
              </button>
            : null
        }
        </form>
      </div>
      {/* Images */}
      <div className="flex-1 flex flex-[0_0_50%] flex-wrap items-center justify-center">
      {
        allQuizzes[currentQuizId].relevantCards && allQuizzes[currentQuizId].relevantCards.length > 0 && <div>
          <div className="text-xl mb-2.5 mr-2">Relevant Cards</div>
          <div className="text-sm"><u onClick={() => setShowModal(true)}>(Click here to see enlarged images)</u></div>
          <div className="flex flex-wrap justify-center">
            {
              allQuizzes[currentQuizId].relevantCards.map((cardName: string, index: number) => <div key={index} className="w-fit h-72 m-2.5">
                <img src={`https://swudb.com/cdn-cgi/image/quality=40/images/cards/${cardName}.png`} alt={`card ${cardName}`} className="max-h-full object-contain" />
              </div>)
            }
          </div>
        </div>
      }
      </div>
      {/* Relevant rule */}
      {
        quizResult && allQuizzes[currentQuizId].relevantRule != " " && <div className="md:col-span-2 mt-4">
          <p className="text-xl mb-2.5">Relevant Rules:</p>
          <p className="whitespace-pre-wrap">{allQuizzes[currentQuizId].relevantRule}</p>
        </div>
      }
      {/*Relevant Cards Modal*/}
      {
        allQuizzes[currentQuizId].relevantCards &&
        allQuizzes[currentQuizId].relevantCards.length > 0 &&
        showModal && <div className="overflow-y-scroll fixed inset-0 bg-black bg-opacity-70 flex flex-wrap" onClick={() => setShowModal(false)}>
          <p className="absolute top-2 md:top-4 right-4 md:right-8 text-gray-400 md:text-4xl" onClick={() => setShowModal(false)}>X</p>
          <div className="flex flex-wrap justify-center py-8 md:px-24">
          {
            allQuizzes[currentQuizId].relevantCards.map((cardName: string, index: number) => <div key={index} className="w-fit h-100 md:h-120 m-2.5">
              <img src={`https://swudb.com/cdn-cgi/image/quality=40/images/cards/${cardName}.png`} alt={`card ${cardName}`} className="max-h-full object-contain" />
            </div>)
          }
          </div>
        </div>
      }
    </div>
  }
</div>
}

function onSubmitAnswer(selectedIndex: string, setQuizResult: (result: boolean) => void) {
  if (selectedIndex) {
    setQuizResult(true);
  }
}

function onNextQuestion(
  quizMode: QuizModes,
  selectedAnswer: string,
  currentQuizId: number,
  currentQuizAnswer: string,
  allQuizzes: Quiz[],
  quizzesCompleted: number[],
  lastEndlessQuizzes: number[],
  setQuizzesCompleted: (completed: number[]) => void,
  setCurrentQuizId: (id: number) => void,
  setQuizResult: (result: boolean) => void,
  setSelectedAnswer: (answer: string) => void,
  setLastEndlessQuizzes: (list: number[]) => void
)
{
  const endlessThreshold = 10; // Number of recent quizzes to track in endless mode

  if(selectedAnswer === currentQuizAnswer) {
    if(quizMode === "marathon") {
      const updatedCompleted = [...quizzesCompleted, currentQuizId];
      setQuizzesCompleted(updatedCompleted);
      if(updatedCompleted.length !== allQuizzes.length) {
        let nextQuiz = currentQuizId;
        while(updatedCompleted.includes(nextQuiz)) {
          nextQuiz = Math.floor(Math.random() * allQuizzes.length);
        }
        setCurrentQuizId(nextQuiz);
        setQuizResult(false);
        setSelectedAnswer("");
      }
    } else if(quizMode === "endless") {
      const updatedLastEndless = [...lastEndlessQuizzes, currentQuizId];
      if(updatedLastEndless.length > endlessThreshold) {
        updatedLastEndless.shift();
      }
      setLastEndlessQuizzes(updatedLastEndless);
      let nextQuiz = Math.floor(Math.random() * allQuizzes.length);
      while(updatedLastEndless.includes(nextQuiz)) {
          nextQuiz = Math.floor(Math.random() * allQuizzes.length);
      }
      setCurrentQuizId(nextQuiz);
      setQuizResult(false);
      setSelectedAnswer("");
    }
  } else {
    let nextQuiz = Math.floor(Math.random() * allQuizzes.length);
    while(quizzesCompleted.includes(nextQuiz)) {
        nextQuiz = Math.floor(Math.random() * allQuizzes.length);
    }
    setCurrentQuizId(nextQuiz);
    setQuizResult(false);
    setSelectedAnswer("");
  }
}