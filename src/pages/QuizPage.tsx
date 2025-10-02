  import React from "react";
  import { getQuizDataAsync } from "../util/func";
  import type { Quiz } from "../util/func";

  function QuizPage() {
    const [allQuizzes, setAllQuizzes] = React.useState<Quiz[]>([]);
    const [currentQuiz, setCurrentQuiz] = React.useState(0);
    const [quizzesCompleted, setQuizzesCompleted] = React.useState<number[]>([]);
    const [selectedAnswer, setSelectedAnswer] = React.useState<string>("");
    const [quizResult, setQuizResult] = React.useState<string>("");
    const [showModal, setShowModal] = React.useState(false);

    React.useEffect(() => {
      getQuizDataAsync().then(data => {
        setAllQuizzes(data);
        setCurrentQuiz(Math.floor(Math.random() * data.length));
      });
    }, []);

    const renderChoices = () => {
      if(allQuizzes.length === 0) return null;
      const choiceKeys = Object.keys(allQuizzes[currentQuiz].choices);
      const divs = choiceKeys.map((key, index) => <div key={index} className="mb-2.5">
          <label className="text-md md:text-lg">
            <input
              type="radio"
              name="quiz-choice"
              value={choiceKeys[index]}
              className="mr-2.5 md:scale-110"
              checked={selectedAnswer === choiceKeys[index]}
              onChange={() => setSelectedAnswer(choiceKeys[index])}
              disabled={quizResult !== ""}
            />
            {allQuizzes[currentQuiz].choices[key]}
          </label>
        </div>
      );

      return divs;
    }

    return <div>
      <h1 className="text-2xl md:text-4xl font-bold mb-4">Endless Mode</h1>
      {
        allQuizzes.length === 0
          ? <p className="text-lg">Loading quizzes...</p>
          : <div>
            {
                allQuizzes[currentQuiz] && <div className="grid md:grid-cols-[40%_60%] border p-8 rounded shadow-md gap-4">
                {/* Question and choices */}
                <div>
                  <p className="mb-2.5 text-lg md:text-xl">{allQuizzes[currentQuiz].question}</p>
                  <form onSubmit={(e) => {
                    e.preventDefault();
                    const form = e.target as HTMLFormElement;
                    const quizChoice = form.elements.namedItem('quiz-choice') as HTMLInputElement;
                    onSubmitAnswer(quizChoice.value, allQuizzes, currentQuiz, setQuizResult);
                  }}>
                  {renderChoices()}
                  {!quizResult && <button type="submit" className="btn btn-primary mt-4 text-lg p-4">Submit Answer</button>}
                  {
                    quizResult && quizzesCompleted.length < allQuizzes.length
                      ? <button className="btn btn-secondary mt-4 text-lg p-4" onClick={() => {
                          if(selectedAnswer === allQuizzes[currentQuiz].answer.toString()) {
                            const updatedCompleted = [...quizzesCompleted, currentQuiz];
                            setQuizzesCompleted(updatedCompleted);
                            if(updatedCompleted.length === allQuizzes.length) {
                              alert("You've correctly answered every question!");
                            } else {
                              let nextQuiz = currentQuiz;
                              while(updatedCompleted.includes(nextQuiz)) {
                                nextQuiz = Math.floor(Math.random() * allQuizzes.length);
                              }
                              setCurrentQuiz(nextQuiz);
                              setQuizResult("");
                              setSelectedAnswer("");
                            }
                          } else {
                            let nextQuiz = Math.floor(Math.random() * allQuizzes.length);
                            while(quizzesCompleted.includes(nextQuiz)) {
                                nextQuiz = Math.floor(Math.random() * allQuizzes.length);
                            }
                            setCurrentQuiz(nextQuiz);
                            setQuizResult("");
                            setSelectedAnswer("");
                          }
                        }}>
                          Next Question
                        </button>
                      : null
                  }
                  </form>
                  {
                    quizResult && <p className={`mt-10 font-bold text-xl ${quizResult === "correct" ? "text-green-500" : "text-red-600"}`}>
                      {quizResult === "correct" ? "Correct!" : "Incorrect!"}
                    </p>
                  }
                </div>
                {/* Images */}
                <div className="flex-1 flex flex-[0_0_50%] flex-wrap items-center justify-center">
                {
                  allQuizzes[currentQuiz].relevantCards && allQuizzes[currentQuiz].relevantCards.length > 0 && <div>
                    <div className="inline text-xl mb-2.5 mr-2">Relevant Cards:</div><u onClick={() => setShowModal(true)}>Click to Enlarge</u>
                    <div className="flex flex-wrap justify-center">
                      {
                        allQuizzes[currentQuiz].relevantCards.map((cardName: string, index: number) => <div key={index} className="w-60 m-2.5">
                          <img src={`https://swudb.com/cdn-cgi/image/quality=40/images/cards/${cardName}.png`} alt={`card ${cardName}`} className="max-h-full object-contain" />
                        </div>)
                      }
                    </div>
                  </div>
                }
                </div>
                {/* Relevant rule */}
                {
                  quizResult && allQuizzes[currentQuiz].relevantRule != " " && <div className="md:col-span-2 mt-4">
                    <p className="text-xl mb-2.5">Relevant Rules:</p>
                    <p className="whitespace-pre-wrap">{allQuizzes[currentQuiz].relevantRule}</p>
                  </div>
                }
                {/*Relevant Cards Modal*/}
                {
                  allQuizzes[currentQuiz].relevantCards &&
                  allQuizzes[currentQuiz].relevantCards.length > 0 &&
                  showModal && <div className="overflow-y-scroll fixed inset-0 bg-black bg-opacity-70 flex flex-wrap" onClick={() => setShowModal(false)}>
                    <p className="absolute top-2 md:top-4 right-4 md:right-8 text-gray-400 md:text-4xl" onClick={() => setShowModal(false)}>X</p>
                    <div className="flex flex-wrap justify-center py-8 md:px-24">
                    {
                      allQuizzes[currentQuiz].relevantCards.map((cardName: string, index: number) => <div key={index} className="w-80 md:w-95 m-2.5">
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
    </div>;
  }

  function onSubmitAnswer(
      selectedIndex: string,
      allQuizzes: Quiz[],
      currentQuiz: number,
      setQuizResult: (result: string) => void
    ) {
    if (selectedIndex) {
      setQuizResult(selectedIndex === allQuizzes[currentQuiz].answer ? "correct" : "incorrect");
    }
  }

  export default QuizPage;
