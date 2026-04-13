import { useState, useEffect, useCallback } from "react";
import { ArrowLeft } from "lucide-react";
import { dimensions } from "../data/dimensions";
import ProgressBar from "./ProgressBar";
import QuestionCard from "./QuestionCard";

const allQuestions = dimensions.flatMap((dim) =>
  dim.questions.map((q) => ({ question: q, dimension: dim }))
);

interface QuizEngineProps {
  answers: Record<string, number>;
  onAnswer: (questionId: string, value: number) => void;
  onComplete: () => void;
  onBack: () => void;
}

export default function QuizEngine({
  answers,
  onAnswer,
  onComplete,
  onBack,
}: QuizEngineProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const total = allQuestions.length;
  const current = allQuestions[currentIndex];

  const goNext = useCallback(() => {
    if (currentIndex < total - 1) {
      setCurrentIndex((i) => i + 1);
    } else {
      onComplete();
    }
  }, [currentIndex, total, onComplete]);

  const goPrev = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((i) => i - 1);
    } else {
      onBack();
    }
  }, [currentIndex, onBack]);

  function handleAnswer(questionId: string, value: number) {
    onAnswer(questionId, value);
    // Auto-advance after short delay
    setTimeout(goNext, 350);
  }

  // Keyboard navigation
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft" || e.key === "Backspace") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goPrev]);

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 sm:p-8">
          {/* Progress */}
          <ProgressBar current={currentIndex + 1} total={total} />

          {/* Back button */}
          <button
            onClick={goPrev}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors mt-4 mb-6 cursor-pointer"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            {currentIndex === 0 ? "Volver al formulario" : "Pregunta anterior"}
          </button>

          {/* Question */}
          <div key={current.question.id}>
            <QuestionCard
              question={current.question}
              dimension={current.dimension}
              selectedAnswer={answers[current.question.id]}
              onAnswer={handleAnswer}
            />
          </div>

          {/* Manual next for last question or if user wants to skip ahead */}
          {answers[current.question.id] !== undefined &&
            currentIndex === total - 1 && (
              <button
                onClick={onComplete}
                className="w-full mt-6 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
              >
                Ver resultados
              </button>
            )}
        </div>
      </div>
    </div>
  );
}
