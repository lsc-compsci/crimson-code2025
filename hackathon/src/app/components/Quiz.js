"use client"
import { useState } from "react";

export default function Quiz() {
    // Track index of current question 
    const [currQuestion, setCurrQuestion] = useState(0);
    // Track user's score
    const [score, setScore] = useState(0);
    // Whether quiz is done and show score
    const [showScore, setShowScore] = useState(false);

    // array of questions, options & answers
    // will fetch from API later
    const questions = [
        {
            q: "Is a cat a dog?",
            ans: [
                "True",
                "False",
            ],
            correctAns: "False",
        },

        {
            q: "Which of the following is a serif font?",
            ans: ["Comic Sans", "Times New Roman", "Arial", "Helvetica"],
            correctAns: "Times New Roman",
        },
    ];

    // Handle user selection
    const handleSelect = (selectedAns) => {
        // Check whether selection is correct
        if (selectedAns === questions[currQuestion].correctAns) {
            setScore(score + 1);
        }
        // Go to next question
        const nextQuestion = currQuestion + 1;
        if (nextQuestion < questions.length) {
            setCurrQuestion(nextQuestion)
        }
        else {
            // show final score
            setShowScore(true);
        }
    };

    // Restart quiz
    const restart = () => {
        setCurrQuestion(0);
        setScore(0);
        setShowScore(false);
    };

    return (
        <>
            <div className="max-w-2xl mx-auto rounded-lg">
                {/* Show score if quiz is done */}
                {showScore ? (
                    <div className="text-center">
                        <h2 className="text-2xl font-bold text-gray-700">
                            Your Score: {score} / {questions.length}
                        </h2>
                        {/* Restart quiz */}
                        <button
                            onClick={restart}
                            className="mt-4 px-4 py-2 bg-blue-500">
                            Restart Quiz
                        </button>
                    </div>

                ) : (

                    // Display the current question and options if the quiz is ongoing
                    <div>
                        <h2 className="text-xl font-bold text-gray-800">
                            Question {currQuestion + 1} of {questions.length}
                        </h2>
                        <p className="mt-4 text-gray-600">
                            {questions[currQuestion].q}
                        </p>
                        <div className="mt-6 space-y-4">
                            {/* Map through the options for the current question */}
                            {questions[currQuestion].ans.map((option, index) => (
                                <button
                                    // Uniuque key for each option 
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
        </>
    );
}