import { useState, useCallback } from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import EvaluatorForm from "./components/EvaluatorForm";
import QuizEngine from "./components/QuizEngine";
import ResultsScreen from "./components/ResultsScreen";
import { calculateScores } from "./lib/scoring";
import type { EvaluatorData } from "./lib/submit";
import { dimensions } from "./data/dimensions";

type Screen = "welcome" | "form" | "quiz" | "results";

const totalQuestions = dimensions.reduce(
  (acc, dim) => acc + dim.questions.length,
  0
);

function App() {
  const [screen, setScreen] = useState<Screen>("welcome");
  const [evaluator, setEvaluator] = useState<EvaluatorData | null>(null);
  const [answers, setAnswers] = useState<Record<string, number>>({});

  const handleAnswer = useCallback(
    (questionId: string, value: number) => {
      setAnswers((prev) => ({ ...prev, [questionId]: value }));
    },
    []
  );

  function handleQuizComplete() {
    const answeredCount = Object.keys(answers).length;
    if (answeredCount < totalQuestions) {
      return;
    }
    setScreen("results");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleFormSubmit(data: EvaluatorData) {
    setEvaluator(data);
    setScreen("quiz");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const scores = calculateScores(answers);

  return (
    <main className="flex-1">
      {screen === "welcome" && (
        <WelcomeScreen onStart={() => setScreen("form")} />
      )}
      {screen === "form" && (
        <EvaluatorForm
          onSubmit={handleFormSubmit}
          onBack={() => setScreen("welcome")}
          initialData={evaluator}
        />
      )}
      {screen === "quiz" && (
        <QuizEngine
          answers={answers}
          onAnswer={handleAnswer}
          onComplete={handleQuizComplete}
          onBack={() => setScreen("form")}
        />
      )}
      {screen === "results" && evaluator && (
        <ResultsScreen
          scores={scores}
          answers={answers}
          evaluator={evaluator}
        />
      )}
    </main>
  );
}

export default App;
