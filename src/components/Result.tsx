import { Action } from "../App";

type ResultProps = {
    dispatch: (obj: Action) => void;
    totalCorrects: number;
    totalPoints: number;
    percent: number;
    highScore: number;
};

function Result({
    dispatch,
    totalCorrects,
    totalPoints,
    percent,
    highScore,
}: ResultProps) {
    return (
        <div>
            <div className="result">
                <span>
                    🤦‍♂️ You scored {totalCorrects} out of {totalPoints} (
                    {percent.toFixed(2)}%)
                </span>
            </div>
            <div className="highscore">(Highscore: {highScore} points)</div>

            <button
                className="btn btn-ui"
                onClick={() => dispatch({ type: "reset" })}
            >
                Restart quiz
            </button>
        </div>
    );
}

export default Result;
