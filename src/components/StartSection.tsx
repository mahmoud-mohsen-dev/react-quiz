function StartSection({
    numQuestion,
    handleShowOptionsSection,
}: {
    numQuestion: number;
    handleShowOptionsSection: () => void;
}) {
    return (
        <section className="start">
            <h2>Welcome to The React Quiz!</h2>
            <h4>{numQuestion} questions to test your React mastery</h4>
            <button className="btn btn-ui" onClick={handleShowOptionsSection}>
                Let's start
            </button>
        </section>
    );
}

export default StartSection;
