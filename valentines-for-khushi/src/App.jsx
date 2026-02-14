import React, { useState } from 'react';

export default function App() {
  const [gameState, setGameState] = useState('landing');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showAlert, setShowAlert] = useState(null);
  const [alertShake, setAlertShake] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState({});
  const [noAttempts, setNoAttempts] = useState(0);

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
      question: "What do you think was your first impression of me?",
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
      options: ["Your vibe ✌️", "Your smile and energy 😊✨", "The way you talk 🗣️", "Your intelligence 🧠 (lol okay)"],
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
    { emoji: "✨", text: "I'm so proud of you and how lucky you are - you've got such amazing style now, you always look so good... proud that I taught you well 😌" },
    { emoji: "☀️", text: "You're so lucky you found me - always smiling, full of energy, someone who lights up every room I walk into 💫" },
    { emoji: "🧠", text: "You're so blessed to have someone like me - cute AND smart... okay fine, a little dumb sometimes too 🙃" },
    { emoji: "📝", text: "You really need to work on yourself - learn to dance, cook food that I like, stay fit, and be romantic at least ONE full day a month... just saying 😏" },
    { emoji: "🔑", text: "I'm basically the answer to all of your life's problems - the solution to everything, the key to your happiness in this universe... you know that right? 💫" }
  ];

  const handleAnswer = (index) => {
    if (index === questions[currentQuestion].correct) {
      const newProgress = ((currentQuestion + 1) / questions.length) * 100;
      setProgress(newProgress);
      
      setTimeout(() => {
        if (currentQuestion < questions.length - 1) {
          setGameState('card');
        } else {
          setGameState('finale');
          setTimeout(() => setShowConfetti(true), 500);
        }
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
    setCurrentQuestion(prev => prev + 1);
    setGameState('quiz');
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
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
      {[...Array(50)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-confetti"
          style={{
            left: `${Math.random() * 100}%`,
            top: '-20px',
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
    <div className="w-full px-6 py-4">
      <div className="relative h-3 bg-white/20 rounded-full overflow-visible">
        <div 
          className="absolute h-full bg-gradient-to-r from-rose-400 to-pink-500 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute -top-5 transition-all duration-1000 ease-out"
          style={{ left: `calc(${progress}% - 16px)` }}
        >
          <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white">
            🧑
          </div>
        </div>
        <div className="absolute -top-5 -right-1">
          <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-rose-500 rounded-full flex items-center justify-center text-lg shadow-lg border-2 border-white animate-pulse">
            👩
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-100 via-pink-50 to-purple-100 flex flex-col font-sans overflow-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Quicksand:wght@400;500;600&display=swap');
        
        * { font-family: 'Quicksand', sans-serif; }
        h1, h2, .elegant { font-family: 'Playfair Display', serif; }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(244, 114, 182, 0.4); }
          50% { box-shadow: 0 0 40px rgba(244, 114, 182, 0.8); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: scale(0.8) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-fadeInUp { animation: fadeInUp 0.8s ease-out forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-confetti { animation: confetti linear forwards; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-slideIn { animation: slideIn 0.6s ease-out forwards; }
        .animate-heartbeat { animation: heartbeat 1s ease-in-out infinite; }
        
        .glass {
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.3);
        }
        .option-btn {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .option-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 20px 40px rgba(244, 114, 182, 0.3);
        }
        .option-btn:active { transform: scale(0.98); }
      `}</style>

      {showConfetti && <Confetti />}

      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute text-4xl opacity-20 animate-float"
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

      {gameState === 'landing' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 animate-fadeInUp">
          <div className="text-6xl mb-6 animate-heartbeat">💝</div>
          <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-4 text-center elegant">
            Hey Khushi
          </h1>
          <p className="text-lg text-rose-400 mb-12 text-center max-w-xs">
            I made something special for you. Ready to play?
          </p>
          <button
            onClick={() => setGameState('quiz')}
            className="px-12 py-4 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse-glow"
          >
            Let's Begin ✨
          </button>
        </div>
      )}

      {gameState === 'quiz' && (
        <div className="flex-1 flex flex-col">
          <ProgressBar />
          <div className="flex-1 flex flex-col items-center justify-center p-6">
            <div className="glass rounded-3xl p-8 max-w-md w-full animate-slideIn shadow-xl">
              <div className="text-sm text-rose-400 mb-2 font-medium">
                Question {currentQuestion + 1} of {questions.length}
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-8 elegant">
                {questions[currentQuestion].question}
              </h2>
              <div className="space-y-3">
                {questions[currentQuestion].options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    className="option-btn w-full p-4 text-left bg-white rounded-2xl shadow-md hover:bg-gradient-to-r hover:from-rose-50 hover:to-pink-50 border border-rose-100"
                  >
                    <span className="text-gray-700 font-medium">{option}</span>
                  </button>
                ))}
              </div>
            </div>
            {showAlert && (
              <div className={`mt-6 p-4 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl shadow-lg max-w-md animate-slideIn ${alertShake ? 'animate-shake' : ''}`}>
                <p className="text-orange-700 font-medium text-center">{showAlert}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {gameState === 'card' && (
        <div className="flex-1 flex flex-col">
          <ProgressBar />
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="glass rounded-3xl p-10 max-w-sm w-full text-center animate-slideIn shadow-2xl">
              <div className="text-6xl mb-6 animate-float">{sweetCards[currentQuestion].emoji}</div>
              <p className="text-xl text-gray-700 font-medium leading-relaxed elegant">
                "{sweetCards[currentQuestion].text}"
              </p>
              <button
                onClick={nextQuestion}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                Next Question →
              </button>
            </div>
          </div>
        </div>
      )}

      {gameState === 'finale' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="text-center animate-fadeInUp">
            <div className="text-7xl mb-6 animate-heartbeat">💖</div>
            <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-pink-600 mb-4 elegant">
              Khushi...
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-12 elegant">
              Will you be my Valentine?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => {
                  setShowConfetti(true);
                  setTimeout(() => {
                    alert("I knew you'd say yes! 💕 Happy Valentine's Day, Khushi! ❤️");
                  }, 500);
                }}
                className="px-12 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-full text-xl font-bold shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 animate-pulse-glow"
              >
                Yes! 💕
              </button>
              <button
                onMouseEnter={handleNoHover}
                onTouchStart={handleNoHover}
                className="px-8 py-3 bg-gray-200 text-gray-400 rounded-full font-medium transition-all duration-500 ease-out"
                style={{
                  ...noButtonStyle,
                  opacity: noAttempts > 5 ? 0 : 1 - (noAttempts * 0.15)
                }}
              >
                {noAttempts === 0 ? "No" : noAttempts < 3 ? "Really?" : noAttempts < 5 ? "You sure?" : "Bye bye 👋"}
              </button>
            </div>
            {noAttempts > 2 && (
              <p className="mt-6 text-rose-400 animate-fadeInUp text-sm">
                {noAttempts < 5 ? "That button seems to be running away... 🤭" : "Looks like 'No' isn't an option! 💫"}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="text-center py-4 text-rose-300 text-sm">
        Made with 💕 for Khushi
      </div>
    </div>
  );
}