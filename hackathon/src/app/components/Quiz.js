import { useState, useEffect } from "react";

// Random questions/answers
const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; 
    }
    return array;
};

export default function Quiz() {
    const [currQuestion, setCurrQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuestions = async () => {
            setLoading(true);
            try {
                const response = await fetch("/api/getQuiz");
                const data = await response.json();
                
                console.log("Fetched Questions:", data.questions); 
                
                // Shuffle questions
                const shuffledQuestions = shuffleArray(data.questions);

                // Shuffle answers for each question
                const shuffledQuestionsWithAnswers = shuffledQuestions.map((question) => ({
                    ...question,
                    ans: shuffleArray(question.ans),
                }));

                setQuestions(shuffledQuestionsWithAnswers); 
            } catch (error) {
                console.error("Error fetching questions:", error);
            }
            setLoading(false);
        };
        fetchQuestions();
    }, []);

    const handleSelect = (selectedAns) => {
        if (selectedAns === questions[currQuestion]?.correctAns) {
            setScore((prev) => prev + 1);
        }
        const nextQuestion = currQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrQuestion(nextQuestion);
        } else {
            setShowScore(true);
        }
    };

    const restart = () => {
        setCurrQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    if (loading) {
        return <p className="text-center text-black">Loading questions...</p>;
    }

    return (
        <div className="max-w-2xl mx-auto rounded-lg">
            {showScore ? (
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700">
                        Your Score: {score} / {questions.length}
                    </h2>
                    <button onClick={restart} className="mt-4 px-4 py-2 bg-blue-500">
                        Restart Quiz
                    </button>
                </div>
            ) : (
                <div>
                    <h2 className="text-xl font-bold text-gray-800">
                        Question {currQuestion + 1} of {questions.length}
                    </h2>
                    <p className="mt-4 text-gray-600">{questions[currQuestion]?.q}</p>
                    <div className="mt-6 space-y-4">
                        {questions[currQuestion]?.ans?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleSelect(option)}
                                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
                                {option}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}