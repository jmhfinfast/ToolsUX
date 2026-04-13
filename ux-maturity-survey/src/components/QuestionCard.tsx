import type { Question, Dimension } from "../data/dimensions";

interface QuestionCardProps {
  question: Question;
  dimension: Dimension;
  selectedAnswer: number | undefined;
  onAnswer: (questionId: string, value: number) => void;
}

export default function QuestionCard({
  question,
  dimension,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  return (
    <div className="animate-slide-left">
      {/* Dimension badge */}
      <div className="flex items-center gap-2 mb-4">
        <span
          className="inline-block w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: dimension.color }}
          aria-hidden="true"
        />
        <span
          className="text-xs font-semibold uppercase tracking-wide"
          style={{ color: dimension.color }}
        >
          {dimension.name}
        </span>
      </div>

      {/* Question text */}
      <h2 className="text-lg sm:text-xl font-semibold text-text-primary mb-6 leading-snug">
        {question.text}
      </h2>

      {/* Options */}
      <fieldset className="space-y-2.5">
        <legend className="sr-only">{question.text}</legend>
        {question.options.map((option, idx) => {
          const value = idx + 1;
          const isSelected = selectedAnswer === value;

          return (
            <label
              key={value}
              className={`flex items-start gap-3 p-3.5 sm:p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                isSelected
                  ? "border-current bg-opacity-5"
                  : "border-border hover:border-border-strong bg-surface"
              }`}
              style={
                isSelected
                  ? {
                      borderColor: dimension.color,
                      backgroundColor: dimension.color + "0A",
                    }
                  : undefined
              }
            >
              <input
                type="radio"
                name={question.id}
                value={value}
                checked={isSelected}
                onChange={() => onAnswer(question.id, value)}
                className="sr-only"
              />
              <span
                className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center mt-0.5 transition-colors ${
                  isSelected ? "border-current" : "border-border-strong"
                }`}
                style={isSelected ? { borderColor: dimension.color } : undefined}
                aria-hidden="true"
              >
                {isSelected && (
                  <span
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: dimension.color }}
                  />
                )}
              </span>
              <div className="flex-1 min-w-0">
                <span className="text-sm sm:text-base text-text-primary leading-snug">
                  {option}
                </span>
              </div>
              <span
                className={`flex-shrink-0 font-mono text-xs font-semibold px-2 py-0.5 rounded ${
                  isSelected
                    ? "text-white"
                    : "text-text-tertiary bg-surface-tertiary"
                }`}
                style={
                  isSelected ? { backgroundColor: dimension.color } : undefined
                }
              >
                {value}
              </span>
            </label>
          );
        })}
      </fieldset>
    </div>
  );
}
