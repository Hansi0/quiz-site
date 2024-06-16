import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
//import './Quiz.css';

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes in seconds
  const timerRef = useRef(null);

  useEffect(() => {
    fetchQuizData();
    const savedQuestionIndex = localStorage.getItem('currentQuestionIndex');
    if (savedQuestionIndex !== null) {
      setCurrentQuestionIndex(parseInt(savedQuestionIndex, 10));
    }
    const savedTimeLeft = localStorage.getItem('timeLeft');
    if (savedTimeLeft !== null) {
      setTimeLeft(parseInt(savedTimeLeft, 10));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('currentQuestionIndex', currentQuestionIndex);
  }, [currentQuestionIndex]);

  useEffect(() => {
    localStorage.setItem('timeLeft', timeLeft);
  }, [timeLeft]);

  useEffect(() => {
    if (timeLeft <= 0) {
      clearInterval(timerRef.current);
      alert("Time's up! The quiz will end now.");
      // You can add more logic here to handle the end of the quiz.
    } else {
      timerRef.current = setInterval(() => {
        setTimeLeft((prevTimeLeft) => prevTimeLeft - 1);
      }, 1000);
    }

    return () => clearInterval(timerRef.current);
  }, [timeLeft]);

  const fetchQuizData = async () => {
    try {
      const response = await axios.get('/quizData.json'); // Assuming quizData.json is in the public directory
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching quiz data:', error);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => Math.min(prevIndex + 1, questions.length - 1));
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="quiz">
      {questions.length > 0 ? (
        <div className="question-block">
          <div className="timer">Time Left: {formatTime(timeLeft)}</div>
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <ul>
            {questions[currentQuestionIndex].options.map((option, optionIndex) => (
              <li key={optionIndex}>{option}</li>
            ))}
          </ul>
          <button onClick={handleNextQuestion}>Next Question</button>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </div>
  );
};

export default Quiz;

