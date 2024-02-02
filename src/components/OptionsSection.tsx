import { useEffect } from "react";
import { QuestionT, Action } from "../App";
import Answer from "./Answer";

function OptionsSection({
    currentQuestion,
    onDispatch,
    isAnswered,
    questions,
    totalCorrects,
    timer,
}: {
    currentQuestion: number;
    onDispatch: (obj: Action) => void;
    isAnswered: string;
    questions: QuestionT[];
    totalCorrects: number;
    timer: number;
}) {
    const isClicked = isAnswered ? true : false;
    const question = questions[currentQuestion];
    const isFinished = questions.length === currentQuestion + 1;
    const percent = ((currentQuestion + 1) * 100) / questions.length;
    const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
    const minutes = `0` + new Date(timer).getMinutes();
    const seconds =
        new Date(timer).getSeconds() < 10
            ? `0${new Date(timer).getSeconds()}`
            : new Date(timer).getSeconds();

    const timeFinished = Number(minutes) === 0 && Number(seconds) === 0;

    useEffect(() => {
        const intervelId = setInterval(() => {
            if (timeFinished) {
                onDispatch({ type: "finish" });
                return;
            }
            onDispatch({
                type: "startGame",
                currentQuestion: currentQuestion,
                timer: timer - 1000,
            });
        }, 1000);
        return () => clearInterval(intervelId);
    }, [timer, onDispatch, currentQuestion, timeFinished]);

    return (
        <>
            <section>
                <progress max={100} value={percent}></progress>
                <div className="progress">
                    <span>
                        Question <strong>{currentQuestion + 1}</strong> /{" "}
                        {questions.length}
                    </span>
                    <span>
                        <strong>{totalCorrects}</strong> / {totalPoints}
                    </span>
                </div>
            </section>
            <section>
                <h4>{question.question}</h4>

                <div className="options">
                    {question.options.map((option, i) => (
                        <Answer
                            name={option}
                            question={question}
                            index={i}
                            key={option}
                            onDispatch={onDispatch}
                            isAnswered={isAnswered}
                        />
                    ))}
                </div>
            </section>
            <div className="timer">
                {minutes}:{seconds}
            </div>
            {isClicked ? (
                !isFinished ? (
                    <button
                        className="btn btn-ui"
                        onClick={() =>
                            onDispatch({
                                type: "goNext",
                                currentQuestion: currentQuestion + 1,
                            })
                        }
                    >
                        next
                    </button>
                ) : (
                    <button
                        className="btn btn-ui"
                        onClick={() => onDispatch({ type: "finish" })}
                    >
                        Finish
                    </button>
                )
            ) : (
                ""
            )}
        </>
    );
}

export default OptionsSection;
