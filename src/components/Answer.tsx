import { QuestionT } from "../App";

function Answer({
    name,
    question,
    index,
    onDispatch,
    isAnswered,
}: // isClicked,
{
    name: string;
    question: QuestionT;
    index: number;
    isAnswered: string;
    // isClicked: boolean;
    onDispatch: (obj: {
        type: string;
        payload?: QuestionT[];
        correct: number;
    }) => void;
}) {
    const isClicked = isAnswered === "optionClicked";
    const isCorrect = index === question.correctOption;
    return (
        <button
            className={`btn btn-option ${
                isClicked ? (isCorrect ? "correct answer" : "wrong") : ""
            }`}
            disabled={isClicked}
            onClick={() => {
                onDispatch({
                    type: "clickedAnswer",
                    correct: isCorrect ? question.points : 0,
                });
            }}
        >
            {name}
        </button>
    );
}

export default Answer;
