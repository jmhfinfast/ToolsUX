interface ScoreBarProps {
  label: string;
  score: number;
  maxScore: number;
  color: string;
}

export default function ScoreBar({ label, score, maxScore, color }: ScoreBarProps) {
  const percent = (score / maxScore) * 100;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-sm font-medium text-text-primary">{label}</span>
        <span
          className="text-sm font-bold font-mono"
          style={{ color }}
        >
          {score.toFixed(2)}
        </span>
      </div>
      <div className="w-full h-3 bg-surface-tertiary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${percent}%`,
            backgroundColor: color,
          }}
        />
      </div>
    </div>
  );
}
