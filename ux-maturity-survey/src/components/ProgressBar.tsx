interface ProgressBarProps {
  current: number;
  total: number;
}

export default function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100);

  return (
    <div className="w-full" role="progressbar" aria-valuenow={current} aria-valuemin={0} aria-valuemax={total} aria-label={`Progreso: pregunta ${current} de ${total}`}>
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-medium text-text-secondary">
          Pregunta {current} de {total}
        </span>
        <span className="text-xs font-mono font-medium text-text-secondary">
          {percent}%
        </span>
      </div>
      <div className="w-full h-2 bg-surface-tertiary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 ease-out"
          style={{
            width: `${percent}%`,
            background: "linear-gradient(90deg, #5D0E8B 0%, #F4A60D 100%)",
          }}
        />
      </div>
    </div>
  );
}
