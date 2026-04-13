import { getDimensionInsight } from "../data/maturity-levels";
import { Lightbulb } from "lucide-react";

interface DimensionInsightProps {
  dimensionId: string;
  dimensionName: string;
  score: number;
  color: string;
}

export default function DimensionInsight({
  dimensionId,
  dimensionName,
  score,
  color,
}: DimensionInsightProps) {
  const insight = getDimensionInsight(dimensionId, score);
  if (!insight) return null;

  return (
    <div
      className="p-4 rounded-lg border-l-4"
      style={{
        borderLeftColor: color,
        backgroundColor: color + "08",
      }}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <Lightbulb size={14} style={{ color }} aria-hidden="true" />
        <span className="text-xs font-semibold uppercase tracking-wide" style={{ color }}>
          {dimensionName}
        </span>
      </div>
      <p className="text-sm text-text-secondary leading-relaxed">{insight}</p>
    </div>
  );
}
