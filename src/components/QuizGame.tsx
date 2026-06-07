import { useState, useCallback, useEffect } from 'react';
import { aircraftData } from '@/data/aircraftData';
import { Trophy, RotateCcw, ArrowRight, CheckCircle2, XCircle, Zap } from 'lucide-react';

interface QuizQuestion {
  aircraft: typeof aircraftData[0];
  options: typeof aircraftData;
}

interface QuizResult {
  questionIndex: number;
  selected: string;
  correct: string;
  isCorrect: boolean;
}

type QuizState = 'menu' | 'playing' | 'result' | 'scoreboard';

export default function QuizGame() {
  const [quizState, setQuizState] = useState<QuizState>('menu');
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [totalQuestions] = useState(10);
  const [isAnimating, setIsAnimating] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15);
  const [timerActive, setTimerActive] = useState(false);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('quiz-highscore');
    return saved ? parseInt(saved) : 0;
  });

  const generateQuestions = useCallback((): QuizQuestion[] => {
    const shuffled = [...aircraftData].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, totalQuestions);

    return selected.map((aircraft) => {
      const others = aircraftData.filter((a) => a.id !== aircraft.id);
      const shuffledOthers = others.sort(() => Math.random() - 0.5).slice(0, 3);
      const options = [...shuffledOthers, aircraft].sort(() => Math.random() - 0.5);
      return { aircraft, options };
    });
  }, [totalQuestions]);

  const startGame = useCallback(() => {
    const newQuestions = generateQuestions();
    setQuestions(newQuestions);
    setCurrentQuestion(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setResults([]);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setIsAnimating(false);
    setTimeLeft(15);
    setQuizState('playing');
    setTimerActive(true);
  }, [generateQuestions]);

  useEffect(() => {
    if (!timerActive || quizState !== 'playing' || showAnswer) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setTimerActive(false);
          // Time's up - auto show answer
          if (!showAnswer && selectedAnswer === null) {
            setShowAnswer(true);
            const q = questions[currentQuestion];
            setResults((r) => [
              ...r,
              {
                questionIndex: currentQuestion,
                selected: 'timeout',
                correct: q.aircraft.id,
                isCorrect: false,
              },
            ]);
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [timerActive, quizState, showAnswer, currentQuestion, questions, selectedAnswer]);

  const handleSelect = (aircraftId: string) => {
    if (showAnswer || isAnimating) return;

    setSelectedAnswer(aircraftId);
    setShowAnswer(true);
    setTimerActive(false);

    const q = questions[currentQuestion];
    const isCorrect = aircraftId === q.aircraft.id;

    if (isCorrect) {
      const timeBonus = Math.floor(timeLeft / 3);
      const streakBonus = streak * 10;
      const baseScore = 100;
      setScore((s) => s + baseScore + timeBonus + streakBonus);
      setStreak((s) => {
        const newStreak = s + 1;
        setBestStreak((b) => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setResults((r) => [
      ...r,
      {
        questionIndex: currentQuestion,
        selected: aircraftId,
        correct: q.aircraft.id,
        isCorrect,
      },
    ]);

    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
      if (currentQuestion < totalQuestions - 1) {
        setCurrentQuestion((c) => c + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
        setTimeLeft(15);
        setTimerActive(true);
      } else {
        // Game over
        setTimerActive(false);
        const finalScore = score;
        if (finalScore > highScore) {
          setHighScore(finalScore);
          localStorage.setItem('quiz-highscore', finalScore.toString());
        }
        setQuizState('scoreboard');
      }
    }, 1500);
  };

  const getAircraftById = (id: string) => aircraftData.find((a) => a.id === id);

  if (quizState === 'menu') {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full bg-military-800/50 backdrop-blur rounded-2xl p-8 border border-military-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl mb-4 shadow-lg">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">猜战机挑战</h2>
            <p className="text-military-300">
              看图片识别战斗机，每轮 10 题，限时 15 秒
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-red-400">10</div>
              <div className="text-sm text-military-400">题目</div>
            </div>
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-yellow-400">15s</div>
              <div className="text-sm text-military-400">每题限时</div>
            </div>
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{highScore}</div>
              <div className="text-sm text-military-400">最高分</div>
            </div>
          </div>

          <div className="space-y-4 mb-8 text-sm text-military-300">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>答对得 100 分，剩余时间越多得分越高</span>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5" />
              <span>连续答对有额外连击加分</span>
            </div>
            <div className="flex items-start gap-3">
              <XCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
              <span>超时或答错不扣分，但会中断连击</span>
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full py-4 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold text-lg rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
          >
            开始挑战
          </button>
        </div>
      </div>
    );
  }

  if (quizState === 'scoreboard') {
    const correctCount = results.filter((r) => r.isCorrect).length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    let rating = '';
    let emoji = '';
    if (percentage === 100) {
      rating = '王牌飞行员！';
      emoji = '🎖️';
    } else if (percentage >= 80) {
      rating = '资深航空专家';
      emoji = '✈️';
    } else if (percentage >= 60) {
      rating = '军事爱好者';
      emoji = '🔭';
    } else if (percentage >= 40) {
      rating = '航空新手';
      emoji = '📖';
    } else {
      rating = '继续努力！';
      emoji = '💪';
    }

    return (
      <div className="flex flex-col items-center justify-center py-16 px-4">
        <div className="max-w-2xl w-full bg-military-800/50 backdrop-blur rounded-2xl p-8 border border-military-700 shadow-2xl">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mb-4 shadow-lg">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">挑战完成！</h2>
            <p className="text-xl text-yellow-400">
              {emoji} {rating}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-white">{score}</div>
              <div className="text-sm text-military-400">总得分</div>
            </div>
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-green-400">
                {correctCount}/{totalQuestions}
              </div>
              <div className="text-sm text-military-400">正确率 {percentage}%</div>
            </div>
            <div className="bg-military-900/50 rounded-xl p-4 text-center">
              <div className="text-3xl font-bold text-red-400">{bestStreak}</div>
              <div className="text-sm text-military-400">最高连击</div>
            </div>
            {score === highScore && (
              <div className="bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-xl p-4 text-center border border-yellow-500/30">
                <div className="text-3xl font-bold text-yellow-400">🏆</div>
                <div className="text-sm text-yellow-400">新纪录！</div>
              </div>
            )}
          </div>

          <div className="space-y-3 mb-8 max-h-64 overflow-y-auto">
            {results.map((result, idx) => {
              const correctAircraft = getAircraftById(result.correct);
              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    result.isCorrect
                      ? 'bg-green-500/10 border border-green-500/20'
                      : 'bg-red-500/10 border border-red-500/20'
                  }`}
                >
                  <div className="flex-shrink-0">
                    {result.isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-green-400" />
                    ) : (
                      <XCircle className="w-6 h-6 text-red-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium">
                      第 {idx + 1} 题：{correctAircraft?.name}
                    </div>
                    {!result.isCorrect && result.selected !== 'timeout' && (
                      <div className="text-military-400 text-sm">
                        你选择了：{getAircraftById(result.selected)?.name || '未选择'}
                      </div>
                    )}
                    {result.selected === 'timeout' && (
                      <div className="text-military-400 text-sm">超时未答</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex gap-4">
            <button
              onClick={startGame}
              className="flex-1 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-bold rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-5 h-5" />
              再来一局
            </button>
            <button
              onClick={() => setQuizState('menu')}
              className="flex-1 py-3 bg-military-700 hover:bg-military-600 text-white font-bold rounded-xl transition-all duration-200"
            >
              返回首页
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  const q = questions[currentQuestion];
  if (!q) return null;

  return (
    <div className="flex flex-col items-center justify-center py-8 px-4">
      <div className="max-w-3xl w-full">
        {/* Progress bar */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <span className="text-white font-bold text-lg">
              {currentQuestion + 1}/{totalQuestions}
            </span>
            <div className="flex items-center gap-1">
              <Zap className={`w-5 h-5 ${streak >= 3 ? 'text-yellow-400' : 'text-military-400'}`} />
              <span className={streak >= 3 ? 'text-yellow-400 font-bold' : 'text-military-300'}>
                {streak}连击
              </span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-military-300">得分: {score}</span>
            <div
              className={`flex items-center justify-center w-10 h-10 rounded-full font-bold ${
                timeLeft <= 5
                  ? 'bg-red-500 text-white animate-pulse'
                  : timeLeft <= 10
                  ? 'bg-yellow-500 text-white'
                  : 'bg-green-500 text-white'
              }`}
            >
              {timeLeft}
            </div>
          </div>
        </div>

        {/* Progress bar visual */}
        <div className="w-full bg-military-700 rounded-full h-2 mb-6">
          <div
            className="bg-gradient-to-r from-red-500 to-orange-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / totalQuestions) * 100}%` }}
          />
        </div>

        {/* Question card */}
        <div
          className={`bg-military-800/50 backdrop-blur rounded-2xl border border-military-700 shadow-2xl overflow-hidden transition-all duration-300 ${
            isAnimating ? 'opacity-50' : 'opacity-100'
          }`}
        >
          {/* Image */}
          <div className="relative">
            <div className="w-full h-64 sm:h-80 bg-military-900 flex items-center justify-center overflow-hidden">
              <img
                src={q.aircraft.photos.frontView || q.aircraft.photos.sideView}
                alt="猜战机"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>
            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
              {q.aircraft.country} · {q.aircraft.generation}代机
            </div>
          </div>

          {/* Question text */}
          <div className="p-4 sm:p-6">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              这是哪款战斗机？
            </h3>

            {/* Options grid */}
            <div className="grid grid-cols-2 gap-3">
              {q.options.map((option) => {
                let buttonClass =
                  'bg-military-700 hover:bg-military-600 border-military-600 text-white';

                if (showAnswer) {
                  if (option.id === q.aircraft.id) {
                    buttonClass =
                      'bg-green-500/20 border-green-500 text-green-400 ring-2 ring-green-500';
                  } else if (option.id === selectedAnswer && !q.aircraft.id) {
                    buttonClass = 'bg-red-500/20 border-red-500 text-red-400';
                  } else {
                    buttonClass = 'bg-military-800/50 border-military-700 text-military-500';
                  }
                }

                if (selectedAnswer === option.id && option.id === q.aircraft.id) {
                  buttonClass =
                    'bg-green-500/20 border-green-500 text-green-400 ring-2 ring-green-500';
                } else if (
                  selectedAnswer === option.id &&
                  option.id !== q.aircraft.id
                ) {
                  buttonClass = 'bg-red-500/20 border-red-500 text-red-400';
                }

                return (
                  <button
                    key={option.id}
                    onClick={() => handleSelect(option.id)}
                    disabled={showAnswer}
                    className={`p-3 sm:p-4 rounded-xl border-2 font-bold text-sm sm:text-base transition-all duration-200 ${buttonClass} ${
                      showAnswer ? 'cursor-default' : 'cursor-pointer hover:scale-[1.02] active:scale-[0.98]'
                    }`}
                  >
                    <div className="flex items-center justify-center gap-2">
                      {showAnswer && option.id === q.aircraft.id && (
                        <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      )}
                      {showAnswer &&
                        selectedAnswer === option.id &&
                        option.id !== q.aircraft.id && (
                          <XCircle className="w-5 h-5 flex-shrink-0" />
                        )}
                      <span>
                        {option.name}
                        <span className="block text-xs font-normal text-military-400">
                          {option.nameEn}
                        </span>
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answer reveal */}
            {showAnswer && (
              <div
                className={`mt-6 p-4 rounded-xl text-center ${
                  selectedAnswer === q.aircraft.id
                    ? 'bg-green-500/10 border border-green-500/20'
                    : 'bg-red-500/10 border border-red-500/20'
                }`}
              >
                {selectedAnswer === q.aircraft.id ? (
                  <div className="text-green-400 font-bold text-lg">
                    ✓ 正确！+{100 + Math.floor(timeLeft / 3) + (streak - 1) * 10} 分
                    {streak >= 3 && ` 🔥${streak}连击！`}
                  </div>
                ) : selectedAnswer === 'timeout' || !selectedAnswer ? (
                  <div className="text-red-400 font-bold text-lg">
                    ✗ 超时！正确答案是：{q.aircraft.name}
                  </div>
                ) : (
                  <div className="text-red-400 font-bold text-lg">
                    ✗ 错误！正确答案是：{q.aircraft.name}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Next button (appears briefly at end) */}
        {showAnswer && currentQuestion < totalQuestions - 1 && (
          <div className="flex justify-center mt-4">
            <button
              onClick={() => {
                if (currentQuestion < totalQuestions - 1) {
                  setCurrentQuestion((c) => c + 1);
                  setSelectedAnswer(null);
                  setShowAnswer(false);
                  setTimeLeft(15);
                  setTimerActive(true);
                }
              }}
              className="px-6 py-2 bg-military-700 hover:bg-military-600 text-white rounded-xl flex items-center gap-2 transition-all"
            >
              下一题
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
