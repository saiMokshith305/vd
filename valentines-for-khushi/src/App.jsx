import React, { useState } from 'react';
import './App.css';

export default function App() {
  const [gameState, setGameState] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(null);
  const [alertShake, setAlertShake] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [noAttempts, setNoAttempts] = useState(0);
  const [showToast, setShowToast] = useState(false);

  const Toast = () => (
  <div className="toast-overlay">
    <div className="toast-card">
      <div className="toast-emoji">🎉</div>
      <h2 className="toast-title">Thank You for Accepting!</h2>
      <p className="toast-message">Happy Valentine's Day, Khushi! 💕</p>
      <p className="toast-punch">A punch for not being here in person 👊😤</p>
      <div className="toast-surprise">
        <span className="rocket">🚀</span>
        <span>Physical surprises arriving soon...</span>
      </div>
    </div>
  </div>
);

  const questions = [
    {
      question: "What color shirt was I wearing the day we first met?",
      options: ["Black & Grey 🖤", "White & Brown 🤎", "Blue & White 💙", "I was too busy looking at something else 👀"],
      correct: 1,
      wrongAlerts: [
        "Were you even looking at ME that day? 🤨",
        "Wow, you were clearly distracted by something... or someone 😏",
        "Wrong! My fashion sense is unforgettable!"
      ]
    },
    {
      question: "Guess what I thought about you after we met for the first time?",
      options: ["The mysterious quiet type 🤫", "A ball of sunshine who never stops smiling ☀️", "Too cool to approach 😎", "Probably lost and confused 🫠"],
      correct: 1,
      wrongAlerts: [
        "C'mon, think about that day again! 💭",
        "Really? Look deeper into your memories! ✨",
        "Nope! Think positive energy, think VIBES! 🌟"
      ]
    },
    {
      question: "What do we enjoy doing the most together?",
      options: ["Drinking 🍷", "Cooking 👨‍🍳", "Watching movies 🎬", "Fighting with each other 💥"],
      correct: 3,
      wrongAlerts: [
        "Peaceful answer but that's not US 😈",
        "You wish we were that chill! 😂",
        "Think chaos, think drama, think passion! 💀"
      ]
    },
    {
      question: "What do you think I like about you the most?",
      options: ["Cooking ", "Your smile and energy 😊✨", "The way you talk 🗣️", "Your intelligence 🧠 (lol okay)"],
      correct: 1,
      wrongAlerts: [
        "Close but not THE thing! 💭",
        "Think bigger... think brighter! ☀️",
        "Intelligence? Let's not get ahead of ourselves 😂"
      ]
    },
    {
      question: "What should we do together as a profession?",
      options: ["Pilots ✈️", "Travel Influencers 📸", "Detectives 🔍", "Teaching the world how couples should fight 💑💥"],
      correct: 2,
      wrongAlerts: [
        "Think mystery! Think solving crimes together! 🕵️",
        "We'd crash the plane arguing over directions 😂",
        "Influencers? We can't even agree on a filter! 📱"
      ]
    }
  ];

  const sweetCards = [
    { emoji: "✨", text: "I'm so proud of me and how lucky you are - you've got such amazing style now, you always look so good... proud that I have taught you such good dressing style 😌" },
    { emoji: "☀️", text: "You're so lucky you found me - always smiling, full of energy, someone who lights up every room I walk into 💫" },
    { emoji: "🧠", text: "You're so blessed to have someone like me - cute AND smart... okay fine, a little dumb sometimes too 🙃" },
    { emoji: "📝", text: "You really need to work on yourself - learn to dance, cook food that I like, stay fit, and be romantic at least ONE full day a month 😏" },
    { emoji: "🔑", text: "I'm basically the answer to all of your life's problems - the solution to everything, the key to your happiness in this universe... you know that right? 💫" }
  ];

 const handleAnswer = (index) => {
  if (index === questions[currentQuestion].correct) {
    const newProgress = ((currentQuestion + 1) / questions.length) * 100;
    setProgress(newProgress);
    
    setTimeout(() => {
      // Always show card first, including after last question
      setGameState('card');
    }, 600);
  } else {
    const alerts = questions[currentQuestion].wrongAlerts;
    const randomAlert = alerts[Math.floor(Math.random() * alerts.length)];
    setShowAlert(randomAlert);
    setAlertShake(true);
    setTimeout(() => setAlertShake(false), 500);
  }
};

  const nextQuestion = () => {
  if (currentQuestion < questions.length - 1) {
    // More questions left
    setCurrentQuestion(prev => prev + 1);
    setGameState('quiz');
  } else {
    // Last card done, go to finale
    setGameState('finale');
    setTimeout(() => setShowConfetti(true), 500);
  }
  setShowAlert(null);
};
  const handleNoHover = () => {
    const moves = [
      { transform: 'translateX(150px)' },
      { transform: 'translateX(-150px)' },
      { transform: 'translateY(-80px)' },
      { transform: 'translate(100px, -60px)' },
      { transform: 'translate(-100px, 60px)' },
      { transform: 'scale(0.5)', opacity: 0.5 },
      { transform: 'rotate(180deg) translateX(100px)' },
    ];
    setNoButtonStyle(moves[noAttempts % moves.length]);
    setNoAttempts(prev => prev + 1);
  };

  const Confetti = () => (
    <div className="confetti-container">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="confetti-piece"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        >
          {['💕', '✨', '💖', '🌸', '💫', '❤️'][Math.floor(Math.random() * 6)]}
        </div>
      ))}
    </div>
  );

  const ProgressBar = () => (
    <div className="progress-container">
      <div className="progress-track">
        <div className="progress-fill" style={{ width: `${progress}%` }} />
        <div className="avatar boy-avatar" style={{ left: `calc(${progress}% - 20px)` }}>
          🧑
        </div>
        <div className="avatar girl-avatar">
          👩
        </div>
      </div>
    </div>
  );

  const FloatingEmojis = () => (
    <div className="floating-container">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="floating-emoji"
          style={{
            left: `${10 + i * 12}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`
          }}
        >
          {['💕', '✨', '🌸', '💫'][i % 4]}
        </div>
      ))}
    </div>
  );

  return (
    <div className="app">
      {showConfetti && <Confetti />}
      {showToast && <Toast />}
      <FloatingEmojis />

      {/* Landing Screen */}
      {gameState === 'landing' && (
        <div className="screen landing-screen fade-in">
          <div className="landing-heart">💝</div>
          <h1 className="landing-title">Hey Khushi</h1>
          <p className="landing-subtitle">I made something special for you. Ready to play?</p>
          <button className="btn-primary glow" onClick={() => setGameState('quiz')}>
            Let's Begin ✨
          </button>
        </div>
      )}

      {/* Quiz Screen */}
      {gameState === 'quiz' && (
        <div className="screen quiz-screen">
          <ProgressBar />
          <div className="quiz-content">
            <div className="glass-card slide-in">
              <span className="question-count">Question {currentQuestion + 1} of {questions.length}</span>
              <h2 className="question-text">{questions[currentQuestion].question}</h2>
              <div className="options-container">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    className="option-btn"
                    onClick={() => handleAnswer(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
            {showAlert && (
              <div className={`alert-box ${alertShake ? 'shake' : ''}`}>
                {showAlert}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Card Screen */}
      {gameState === 'card' && (
        <div className="screen card-screen">
          <ProgressBar />
          <div className="card-content">
            <div className="glass-card sweet-card slide-in">
              <div className="card-emoji">{sweetCards[currentQuestion].emoji}</div>
              <p className="card-text">"{sweetCards[currentQuestion].text}"</p>
              <button className="btn-primary" onClick={nextQuestion}>
                Next Question →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Finale Screen */}
      {gameState === 'finale' && (
        <div className="screen finale-screen fade-in">
          <div className="finale-heart">💖</div>
          <h1 className="finale-name">Khushi...</h1>
          <h2 className="finale-question">Will you be my Valentine?</h2>
          <div className="finale-buttons">
            <button
              className="btn-yes glow"
              onClick={() => {
                setShowConfetti(true);
                setShowToast(true);
              }}
            >
              Yes! 💕
            </button>
            <button
              className="btn-no"
              onMouseEnter={handleNoHover}
              onTouchStart={handleNoHover}
              style={{
                ...noButtonStyle,
                opacity: noAttempts > 5 ? 0 : 1 - (noAttempts * 0.15)
              }}
            >
              {noAttempts === 0 ? "No" : noAttempts < 3 ? "Really?" : noAttempts < 5 ? "You sure?" : "Bye bye 👋"}
            </button>
          </div>
          {noAttempts > 2 && (
            <p className="finale-hint fade-in">
              {noAttempts < 5 ? "That button seems to be running away... 🤭" : "Looks like 'No' isn't an option! 💫"}
            </p>
          )}
        </div>
      )}

      <footer className="footer">Made with 💕 for Khushi</footer>
    </div>
  );
}