import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react';

const QuizApp = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [isCompleted, setIsCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState(false);

  const questions = [
    {
      id: 1,
      question: "What is the correct way to create a React component?",
      options: ["function Component() {}", "const Component = () => {}", "class Component extends React.Component {}", "All of the above"],
      correct: 3
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      correct: 1
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
      correct: 0
    },
    {
      id: 4,
      question: "Which method is used to update state in React?",
      options: ["updateState()", "setState()", "changeState()", "modifyState()"],
      correct: 1
    },
    {
      id: 5,
      question: "What is the Virtual DOM?",
      options: ["A copy of the real DOM", "A JavaScript representation of the DOM", "A browser API", "A React library"],
      correct: 1
    },
    {
      id: 6,
      question: "Which JavaScript method creates a new array with all elements that pass a test?",
      options: ["map()", "filter()", "reduce()", "forEach()"],
      correct: 1
    },
    {
      id: 7,
      question: "What is the difference between let and const?",
      options: ["No difference", "let is block-scoped, const is function-scoped", "const cannot be reassigned", "let is faster"],
      correct: 2
    },
    {
      id: 8,
      question: "Which React hook is used for side effects?",
      options: ["useState", "useEffect", "useCallback", "useMemo"],
      correct: 1
    },
    {
      id: 9,
      question: "What does the spread operator (...) do?",
      options: ["Combines arrays", "Spreads elements", "Creates objects", "All of the above"],
      correct: 3
    },
    {
      id: 10,
      question: "How do you pass data from parent to child in React?",
      options: ["State", "Props", "Context", "Redux"],
      correct: 1
    },
    {
      id: 11,
      question: "What is event bubbling in JavaScript?",
      options: ["Events go from child to parent", "Events go from parent to child", "Events are canceled", "Events are duplicated"],
      correct: 0
    },
    {
      id: 12,
      question: "Which is the correct way to handle forms in React?",
      options: ["Controlled components", "Uncontrolled components", "Both are correct", "Neither is correct"],
      correct: 2
    },
    {
      id: 13,
      question: "What is the purpose of useCallback hook?",
      options: ["Manage state", "Optimize performance", "Handle side effects", "Create refs"],
      correct: 1
    },
    {
      id: 14,
      question: "Which JavaScript feature allows function parameters to have default values?",
      options: ["Default parameters", "Rest parameters", "Spread syntax", "Destructuring"],
      correct: 0
    },
    {
      id: 15,
      question: "What is the key prop used for in React lists?",
      options: ["Styling", "Performance optimization", "Event handling", "State management"],
      correct: 1
    },
    {
      id: 16,
      question: "Which method converts a string to lowercase in JavaScript?",
      options: ["toLowerCase()", "toLower()", "lowerCase()", "lower()"],
      correct: 0
    },
    {
      id: 17,
      question: "What is React.Fragment used for?",
      options: ["Creating components", "Grouping elements without extra DOM nodes", "Managing state", "Handling events"],
      correct: 1
    },
    {
      id: 18,
      question: "Which operator checks for strict equality in JavaScript?",
      options: ["==", "===", "!=", "!=="],
      correct: 1
    },
    {
      id: 19,
      question: "What is the purpose of the dependency array in useEffect?",
      options: ["Store dependencies", "Control when effect runs", "Manage state", "Handle errors"],
      correct: 1
    },
    {
      id: 20,
      question: "Which JavaScript method adds elements to the end of an array?",
      options: ["push()", "pop()", "shift()", "unshift()"],
      correct: 0
    }
  ];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isCompleted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isCompleted) {
      handleSubmit();
    }
  }, [timeLeft, isCompleted]);

  const handleAnswerSelect = (optionIndex) => {
    setAnswers({
      ...answers,
      [currentQuestion]: optionIndex
    });
    setShowFeedback(true);
    
    // Hide feedback after 1.5 seconds
    setTimeout(() => {
      setShowFeedback(false);
    }, 1500);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (answers[index] === question.correct) {
        correctAnswers++;
      }
    });
    return correctAnswers;
  };

  const handleSubmit = () => {
    const finalScore = calculateScore();
    setScore(finalScore);
    setIsCompleted(true);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getScoreColor = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return 'text-green-500';
    if (percentage >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(60);
    setIsCompleted(false);
    setScore(0);
    setShowFeedback(false);
  };

  const getOptionColor = (optionIndex) => {
    const isSelected = answers[currentQuestion] === optionIndex;
    const isCorrect = optionIndex === questions[currentQuestion].correct;
    
    if (!showFeedback) {
      // Normal state - show purple for selected, default for unselected
      return isSelected
        ? 'bg-purple-500/30 border-purple-400 text-white'
        : 'bg-white/5 border-white/20 text-white/90 hover:bg-white/10 hover:border-white/30';
    }
    
    // Feedback state - show correct/incorrect colors
    if (isSelected && isCorrect) {
      return 'bg-green-500/40 border-green-400 text-white';
    } else if (isSelected && !isCorrect) {
      return 'bg-red-500/40 border-red-400 text-white';
    } else if (!isSelected && isCorrect) {
      return 'bg-green-500/20 border-green-400 text-white';
    } else {
      return 'bg-white/5 border-white/20 text-white/60';
    }
  };

  if (isCompleted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 max-w-lg w-full text-center border border-white/20">
          <CheckCircle className="mx-auto mb-6 text-green-400" size={80} />
          <h2 className="text-4xl font-bold text-white mb-4">Quiz Completed!</h2>
          <div className="bg-white/10 rounded-2xl p-6 mb-6">
            <div className={`text-6xl font-bold mb-2 ${getScoreColor()}`}>
              {score}/{questions.length}
            </div>
            <p className="text-white/80">
              {((score / questions.length) * 100).toFixed(1)}% Correct
            </p>
          </div>
          <button 
            onClick={resetQuiz}
            className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-6 border border-white/20">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">React.js & JavaScript Quiz</h1>
              <p className="text-white/70">Question {currentQuestion + 1} of {questions.length}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white/10 rounded-xl px-4 py-2">
                <Clock className="text-white" size={20} />
                <span className={`font-bold ${timeLeft <= 10 ? 'text-red-400' : 'text-white'}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4 bg-white/10 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-full transition-all duration-300 ease-out"
              style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-6 border border-white/20">
          <h2 className="text-xl font-semibold text-white mb-6">
            {questions[currentQuestion].question}
          </h2>
          
          <div className="space-y-3">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                disabled={showFeedback}
                className={`w-full p-4 text-left rounded-xl border-2 transition-all duration-300 transform hover:scale-[1.02] ${getOptionColor(index)} ${showFeedback ? 'cursor-not-allowed' : ''}`}
              >
                <span className="font-medium">{String.fromCharCode(65 + index)}. {option}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              setCurrentQuestion(Math.max(0, currentQuestion - 1));
              setShowFeedback(false);
            }}
            disabled={currentQuestion === 0}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              currentQuestion === 0
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-white/10 text-white hover:bg-white/20 transform hover:scale-105'
            }`}
          >
            <ChevronLeft size={20} />
            <span>Previous</span>
          </button>

          <div className="text-white/70 text-sm">
            {Object.keys(answers).length} of {questions.length} answered
          </div>

          {currentQuestion === questions.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-8 py-3 rounded-xl font-semibold hover:from-green-600 hover:to-emerald-600 transition-all duration-300 transform hover:scale-105"
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={() => {
                setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1));
                setShowFeedback(false);
              }}
              className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl font-semibold hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
            >
              <span>Next</span>
              <ChevronRight size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuizApp;