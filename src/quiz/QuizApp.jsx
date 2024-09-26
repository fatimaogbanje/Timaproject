import React, { useState, useEffect } from "react";
import './Quiz.css'; 

function QuizApp() {
  const [topic, setTopic] = useState("");
  const [explanation, setExplanation] = useState("");
  const [quiz, setQuiz] = useState([]);
  const [step, setStep] = useState(1); 
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); 
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15); 

  
  useEffect(() => {
    if (step === 3 && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer); 
    } else if (timeLeft === 0) {
      handleNextQuestion(); 
    }
  }, [timeLeft, step]);

  const handleTopicChange = (e) => setTopic(e.target.value);

  const fetchExplanationAndQuiz = async () => {
    const API_KEY = ""; 

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                role: "user",
                parts: [
                  {
                    text: `Generate a clear and concise explanation about the topic "${topic}". After providing the explanation, create a multiple-choice quiz related to the explanation. The quiz should include 3-5 questions, each with 4 answer options, and indicate the correct answer for each question.\n\nResponse format:\n{\n  "explanation": "Your explanation here.",\n  "quiz": [\n    {\n      "question": "First question here?",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "correctAnswer": "Option X"\n    },\n    {\n      "question": "Second question here?",\n      "options": ["Option 1", "Option 2", "Option 3", "Option 4"],\n      "correctAnswer": "Option Y"\n    }\n    ]}`,
                  },
                ],
              },
            ],
            systemInstruction: {
              role: "user",
              parts: [
                {
                  text: "Please provide the response in the specified format.",
                },
              ],
            },
            generationConfig: {
              temperature: 1,
              topK: 64,
              topP: 0.95,
              maxOutputTokens: 8192,
              responseMimeType: "text/plain",
            },
          }),
        }
      );

      const data = await response.json();
      console.log(data);

      
      const responseText = data.candidates[0].content?.parts[0].text;
      const cleanedText = responseText
        .replace(/```json\n/, '') 
        .replace(/\n```$/, ''); 

      
      const parsedResponse = JSON.parse(cleanedText);

      setExplanation(parsedResponse.explanation);
      setQuiz(parsedResponse.quiz);
      setStep(2); 
    } catch (error) {
      console.error("Error fetching explanation and quiz:", error);
    }
  };

  const handleAnswerChange = (questionIndex, answer) => {
    setUserAnswers({
      ...userAnswers,
      [questionIndex]: answer,
    });
    setAnswerSelected(true); 
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setAnswerSelected(false); 
      setTimeLeft(15); 
    } else {
      calculateScore();
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.forEach((question, index) => {
      if (userAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
    setStep(4); 
  };

  const retryQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setAnswerSelected(false);
    setStep(3); 
    setTimeLeft(15); 
  };

  const goBackToInput = () => {
    setStep(1); 
    setTopic("");
    setExplanation("");
    setQuiz([]);
    setUserAnswers({});
    setScore(0);
  };

  return (
    <div className="quiz-app">
      {step === 1 && (
        <div>
          <h2>Enter a topic to get an explanation</h2>
          <input
            type="text"
            value={topic}
            onChange={handleTopicChange}
            placeholder="Enter a topic"
          />
          <button onClick={fetchExplanationAndQuiz}>Get Explanation</button>
        </div>
      )}

      {step === 2 && (
        <div>
          <h2>Explanation for {topic}</h2>
          <p>{explanation}</p>
          <button onClick={() => setStep(3)}>Next: Take Quiz</button>
        </div>
      )}

      {step === 3 && (
        <div>
          <h2>Quiz for {topic}</h2>
          <div className="timer">Time left: {timeLeft} seconds</div>
          {quiz.length > 0 && (
            <div>
              <p>{quiz[currentQuestionIndex].question}</p>
              {quiz[currentQuestionIndex].options.map((option, index) => (
                <label key={index}>
                  <input
                    type="radio"
                    name={`question${currentQuestionIndex}`}
                    value={option}
                    checked={userAnswers[currentQuestionIndex] === option}
                    onChange={() => handleAnswerChange(currentQuestionIndex, option)}
                  />
                  {option}
                </label>
              ))}
              <button
                onClick={handleNextQuestion}
                disabled={!answerSelected} 
              >
                Next
              </button>
            </div>
          )}
        </div>
      )}

      {step === 4 && (
        <div className="resultd">
          <h2>Quiz Results</h2>
          <div className="score">Your Score: {score} / {quiz.length}</div>
          <div className="results">
            {quiz.map((question, index) => (
              <div key={index}>
                <p className="question">{question.question}</p>
                
                <p>Correct answer: {question.correctAnswer}</p>
              </div>
            ))}
          </div>
          <button onClick={retryQuiz}>Retry Quiz</button>
          <button onClick={goBackToInput}>Back to Topic Input</button>
        </div>
      )}
    </div>
  );
}

export default QuizApp;
