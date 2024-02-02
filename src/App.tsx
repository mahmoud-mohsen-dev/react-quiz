import Main from "./components/Main";
import Header from "./components/Header";
import { useEffect, useReducer } from "react";
import Loader from "./components/Loader";
import ErrorMsg from "./components/ErrorMsg";
import StartSection from "./components/StartSection";
import OptionsSection from "./components/OptionsSection";
import Result from "./components/Result";
import questionsData from "./data/questions.json";

export type QuestionT = {
    correctOption: number;
    options: string[];
    points: number;
    question: string;
};

export type State = {
    status: string;
    questions?: QuestionT[] | [];
    isAnswered?: string;
    currentQuestion?: null | number;
    totalCorrects: number;
    timer: number;
    highScore: number;
};

export type Action = {
    type: string;
    payload?: QuestionT[];
    currentQuestion?: number;
    correct?: number;
    timer?: number;
};

const initialState: State = {
    questions: [],
    currentQuestion: 0,
    status: "loading",
    totalCorrects: 0,
    timer: 0,
    highScore: 0,
};

const reducer = (prevState: State, action: Action): State => {
    switch (action.type) {
        case "requestDone":
            return {
                ...prevState,
                status: "ready",
                questions: action.payload ?? [],
            };
        case "error":
            return { ...prevState, status: "errooor" };
        case "startGame":
            return {
                ...prevState,
                status: "started",
                timer:
                    action.timer ?? new Date(2023, 11, 9, 0, 7, 30).getTime(),
            };
        case "clickedAnswer":
            return {
                ...prevState,
                isAnswered: "optionClicked",

                totalCorrects: prevState.totalCorrects + (action?.correct ?? 0),
            };

        case "goNext":
            return {
                ...prevState,
                isAnswered: "",
                currentQuestion: action.currentQuestion,
            };
        case "finish":
            return {
                ...prevState,
                status: "finished",
                highScore:
                    prevState.highScore < prevState.totalCorrects
                        ? prevState.totalCorrects
                        : prevState.highScore,
            };
        case "reset":
            return {
                ...prevState,
                currentQuestion: 0,
                status: "ready",
                totalCorrects: 0,
                isAnswered: "",
                timer: 0,
            };

        default:
            throw new Error("error");
    }
};

function App() {
    const [
        {
            questions = [],
            status,
            isAnswered = "",
            currentQuestion = 0,
            totalCorrects = 0,
            timer,
            highScore,
        },
        dispatch,
    ] = useReducer(reducer, initialState);
    const numQuestion = questions?.length ?? 0;

    const totalPoints = questions.reduce((acc, cur) => acc + cur.points, 0);
    const percent = (totalCorrects * 100) / totalPoints;

    useEffect(() => {
        // fetch("http://localhost:8000/questions")
        //     .then((res) => res.json())
        //     .then((data) => dispatch({ type: "requestDone", payload: data }))
        //     .catch(() => dispatch({ type: "error" }));
        dispatch({ type: "requestDone", payload: questionsData.questions });
    }, []);

    function openOptionsSection() {
        dispatch({ type: "startGame" });
    }

    const isQuestions =
        questions &&
        currentQuestion !== null &&
        currentQuestion !== undefined &&
        currentQuestion >= 0;

    return (
        <div className="app">
            <Header />
            <Main>
                {status === "loading" && <Loader />}
                {status === "errooor" && <ErrorMsg />}
                {status === "ready" && (
                    <StartSection
                        numQuestion={numQuestion}
                        handleShowOptionsSection={openOptionsSection}
                    />
                )}
                {status === "started" && isQuestions && (
                    <OptionsSection
                        currentQuestion={currentQuestion}
                        questions={questions}
                        isAnswered={isAnswered}
                        onDispatch={dispatch}
                        totalCorrects={totalCorrects}
                        timer={timer}
                    />
                )}

                {status === "finished" && (
                    <Result
                        dispatch={dispatch}
                        totalCorrects={totalCorrects}
                        totalPoints={totalPoints}
                        percent={percent}
                        highScore={highScore}
                    />
                )}
            </Main>
        </div>
    );
}

export default App;
