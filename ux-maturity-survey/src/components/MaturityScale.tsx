import { maturityLevels } from "../data/maturity-levels";
import type { MaturityLevel } from "../data/maturity-levels";

interface MaturityScaleProps {
  currentLevel: MaturityLevel;
}

const levelColors = [
  "#EF4444", // 1 - red
  "#F97316", // 2 - orange
  "#F4A60D", // 3 - amber
  "#84CC16", // 4 - lime
  "#10B981", // 5 - emerald
  "#5D0E8B", // 6 - primary
];

export default function MaturityScale({ currentLevel }: MaturityScaleProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-text-primary mb-4">
        Escala de Madurez UX (Nielsen Norman Group)
      </h3>
      <div className="space-y-2">
        {maturityLevels.map((level, idx) => {
          const isActive = level.level === currentLevel.level;
          const color = levelColors[idx];

          return (
            <div
              key={level.level}
              className={`flex items-center gap-3 p-3 rounded-lg border-2 transition-all ${
                isActive
                  ? "shadow-sm"
                  : "border-transparent bg-surface-secondary"
              }`}
              style={
                isActive
                  ? { borderColor: color, backgroundColor: color + "0A" }
                  : undefined
              }
            >
              {/* Level number */}
              <div
                className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white"
                style={{ backgroundColor: color }}
              >
                {level.level}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-text-primary">
                    {level.name}
                  </span>
                  <span className="text-xs font-mono text-text-tertiary">
                    {level.min.toFixed(2)} – {level.max.toFixed(2)}
                  </span>
                  {isActive && (
                    <span
                      className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: color }}
                    >
                      Tu nivel
                    </span>
                  )}
                </div>
                <p className="text-xs text-text-secondary mt-0.5">
                  {level.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
