// "use client"
// import React, { useState, useEffect } from "react";


// export default function typo_quiz() {
//     const [questions, setQuestions] = useState([]);

//     // Track index of current question 
//     const [currQuestion, setCurrQuestion] = useState(0);
//     // Track user's score
//     const [score, setScore] = useState(0);
//     // Whether quiz is done and show score
//     const [showScore, setShowScore] = useState(false);

//     // fetch questions from api
//     useEffect(() => 
//     {
//         async function fetchQuestions()
//         {
//             try
//             {
//                 const res = await fetch("http://localhost:3000/typo_content");
//                 const data = await res.json();
//                 setQuestions(data);
//             }
//             catch
//             {
//                 console.error("Error fetching quiz data:", error);
//             }
//         }

//         fetchQuestions();
//     }, []);

//     // Handle user selection
//     const handleSelect = (selectedAns) => {
//         // Check whether selection is correct
//         if (selectedAns === questions[currQuestion].correctAns) {
//             setScore(score + 1);
//         }
//         // Go to next question
//         const nextQuestion = currQuestion + 1;
//         if (nextQuestion < questions.length) {
//             setCurrQuestion(nextQuestion)
//         }
//         else {
//             // show final score
//             setShowScore(true);
//         }
//     };

//     // Restart quiz
//     const restart = () => {
//         setCurrQuestion(0);
//         setScore(0);
//         setShowScore(false);
//     };

//     return (
//         <>
//             <div className="max-w-2xl mx-auto rounded-lg">
//                 {/* Show score if quiz is done */}
//                 {showScore ? (
//                     <div className="text-center">
//                         <h2 className="text-2xl font-bold text-gray-700">
//                             Your Score: {score} / {questions.length}
//                         </h2>
//                         {/* Restart quiz */}
//                         <button
//                             onClick={restart}
//                             className="mt-4 px-4 py-2 bg-blue-500">
//                             Restart Quiz
//                         </button>
//                     </div>

//                 ) : (

//                     // Display the current question and options if the quiz is ongoing
//                     <div>
//                         <h2 className="text-xl font-bold text-gray-800">
//                             Question {currQuestion + 1} of {questions.length}
//                         </h2>
//                         <p className="mt-4 text-gray-600">
//                             {questions[currQuestion].q}
//                         </p>
//                         <div className="mt-6 space-y-4">
//                             {/* Map through the options for the current question */}
//                             {questions[currQuestion].ans.map((option, index) => (
//                                 <button
//                                     // Unique key for each option 
//                                     key={index} 
//                                     onClick={() => handleSelect(option)} 
//                                     className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200">
//                                     {option}
//                                 </button>
//                             ))}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

"use client";
import React, { useState, useEffect } from "react";

export default function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currQuestion, setCurrQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        // Adjust the URL to match how you expose the Python data
        // e.g. a Next.js API route at /api/typo_quiz
        // or a local Python server endpoint
        const res = await fetch("http://localhost:3000/Typo_quiz");
        const data = await res.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      }
    }

    fetchQuestions();
  }, []);

  // Handle user selection of an answer
  const handleSelect = (selectedAns) => {
    if (!questions.length) return;

    // Check if it's correct (for single-answer questions)
    if (selectedAns === questions[currQuestion].answer) {
      setScore((prev) => prev + 1);
    }

    const nextQuestion = currQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  // Restart the quiz
  const restart = () => {
    setCurrQuestion(0);
    setScore(0);
    setShowScore(false);
  };

  // If no questions are loaded yet, show a simple loading message
  if (!questions.length) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto rounded-lg">
      {/* Show the final score when the quiz is done */}
      {showScore ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            Your Score: {score} / {questions.length}
          </h2>
          <button
            onClick={restart}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            Restart Quiz
          </button>
        </div>
      ) : (
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Question {currQuestion + 1} of {questions.length}
          </h2>
          <p className="mt-4 text-gray-600">
            {questions[currQuestion].question}
          </p>
          <div className="mt-6 space-y-4">
            {questions[currQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelect(option)}
                className="w-full px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
