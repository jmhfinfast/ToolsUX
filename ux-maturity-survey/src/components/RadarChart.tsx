import type { DimensionScore } from "../lib/scoring";

interface RadarChartProps {
  scores: DimensionScore[];
}

export default function RadarChart({ scores }: RadarChartProps) {
  const size = 280;
  const center = size / 2;
  const maxRadius = 110;
  const levels = 4;
  const angleStep = (2 * Math.PI) / scores.length;
  // Start from top (-90deg)
  const startAngle = -Math.PI / 2;

  function getPoint(index: number, value: number): [number, number] {
    const angle = startAngle + index * angleStep;
    const r = (value / 4) * maxRadius;
    return [center + r * Math.cos(angle), center + r * Math.sin(angle)];
  }

  // Grid levels
  const gridLevels = Array.from({ length: levels }, (_, i) => i + 1);

  // Data polygon
  const dataPoints = scores.map((s, i) => getPoint(i, s.score));
  const dataPath = dataPoints.map((p) => p.join(",")).join(" ");

  // Label positions (slightly outside)
  const labels = scores.map((s, i) => {
    const angle = startAngle + i * angleStep;
    const r = maxRadius + 28;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
      name: s.name.replace("Salud del Equipo — REACH", "Salud"),
      score: s.score,
      color: s.color,
    };
  });

  return (
    <div className="flex justify-center">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        width={size}
        height={size}
        className="w-full max-w-[280px]"
        role="img"
        aria-label="Gráfico radar con scores por dimensión"
      >
        {/* Grid */}
        {gridLevels.map((level) => {
          const r = (level / 4) * maxRadius;
          const points = scores
            .map((_, i) => {
              const angle = startAngle + i * angleStep;
              return `${center + r * Math.cos(angle)},${center + r * Math.sin(angle)}`;
            })
            .join(" ");
          return (
            <polygon
              key={level}
              points={points}
              fill="none"
              stroke="#E5E2EB"
              strokeWidth={1}
            />
          );
        })}

        {/* Axes */}
        {scores.map((_, i) => {
          const [x, y] = getPoint(i, 4);
          return (
            <line
              key={i}
              x1={center}
              y1={center}
              x2={x}
              y2={y}
              stroke="#E5E2EB"
              strokeWidth={1}
            />
          );
        })}

        {/* Data area */}
        <polygon
          points={dataPath}
          fill="#5D0E8B"
          fillOpacity={0.15}
          stroke="#5D0E8B"
          strokeWidth={2}
        />

        {/* Data points */}
        {dataPoints.map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={4}
            fill={scores[i].color}
            stroke="white"
            strokeWidth={2}
          />
        ))}

        {/* Labels */}
        {labels.map((label, i) => (
          <g key={i}>
            <text
              x={label.x}
              y={label.y - 6}
              textAnchor="middle"
              className="text-[9px] font-semibold fill-text-primary"
              style={{ fontFamily: "Poppins, sans-serif" }}
            >
              {label.name.split(" y ")[0].split(" — ")[0]}
            </text>
            <text
              x={label.x}
              y={label.y + 8}
              textAnchor="middle"
              className="text-[11px] font-bold"
              style={{
                fontFamily: "Geist Mono, monospace",
                fill: label.color,
              }}
            >
              {label.score.toFixed(2)}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
