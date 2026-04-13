import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertTriangle,
  RefreshCw,
  Loader2,
} from "lucide-react";
import type { SurveyScores, DimensionScore } from "../lib/scoring";
import { getStrongest, getWeakest } from "../lib/scoring";
import { getMaturityLevel } from "../data/maturity-levels";
import type { MaturityLevel } from "../data/maturity-levels";
import type { EvaluatorData } from "../lib/submit";
import { submitSurvey, hasSubmittedToday } from "../lib/submit";
import RadarChart from "./RadarChart";
import ScoreBar from "./ScoreBar";
import DimensionInsight from "./DimensionInsight";
import MaturityScale from "./MaturityScale";
import DetailTable from "./DetailTable";

interface ResultsScreenProps {
  scores: SurveyScores;
  answers: Record<string, number>;
  evaluator: EvaluatorData;
}

const levelColors: Record<number, string> = {
  1: "#EF4444",
  2: "#F97316",
  3: "#F4A60D",
  4: "#84CC16",
  5: "#10B981",
  6: "#5D0E8B",
};

export default function ResultsScreen({
  scores,
  answers,
  evaluator,
}: ResultsScreenProps) {
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [submitError, setSubmitError] = useState("");
  const [backedUp, setBackedUp] = useState(false);

  const maturityLevel: MaturityLevel = getMaturityLevel(scores.global);
  const strongest: DimensionScore = getStrongest(scores.dimensions);
  const weakest: DimensionScore = getWeakest(scores.dimensions);
  const levelColor = levelColors[maturityLevel.level] || "#5D0E8B";

  useEffect(() => {
    if (hasSubmittedToday(evaluator.email)) {
      setSubmitStatus("success");
      return;
    }
    handleSubmit();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSubmit() {
    setSubmitStatus("loading");
    setSubmitError("");
    const result = await submitSurvey({ evaluator, answers, scores });
    if (result.success) {
      setSubmitStatus("success");
    } else {
      setSubmitStatus("error");
      setSubmitError(result.error || "Error al enviar");
      setBackedUp(!!result.backedUp);
    }
  }

  return (
    <div className="min-h-dvh py-8 px-4 sm:px-8">
      <div className="w-full max-w-3xl mx-auto space-y-6 animate-fade-in">
        {/* Submit status */}
        {submitStatus === "loading" && (
          <div className="bg-primary-50 border border-primary-200 rounded-lg p-3 flex items-center gap-2">
            <Loader2 size={16} className="text-primary animate-spin" />
            <span className="text-sm text-primary">
              Enviando respuestas...
            </span>
          </div>
        )}
        {submitStatus === "success" && (
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 flex items-center gap-2">
            <CheckCircle size={16} className="text-emerald-600" />
            <span className="text-sm text-emerald-700">
              Respuestas guardadas correctamente
            </span>
          </div>
        )}
        {submitStatus === "error" && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-600" />
              <span className="text-sm text-red-700">{submitError}</span>
            </div>
            {backedUp && (
              <p className="text-xs text-red-600 mt-1">
                Tus respuestas se guardaron localmente como respaldo.
              </p>
            )}
            <button
              onClick={handleSubmit}
              className="mt-2 flex items-center gap-1 text-xs font-medium text-red-700 hover:text-red-800 cursor-pointer"
            >
              <RefreshCw size={12} />
              Reintentar envío
            </button>
          </div>
        )}

        {/* Global Score Card */}
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 sm:p-8 text-center">
          <p className="text-sm text-text-secondary mb-2">Score global</p>
          <div
            className="text-5xl sm:text-6xl font-bold font-mono mb-3"
            style={{ color: levelColor }}
          >
            {scores.global.toFixed(2)}
          </div>
          <span
            className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold text-white"
            style={{ backgroundColor: levelColor }}
          >
            Nivel {maturityLevel.level}: {maturityLevel.name}
          </span>
          <p className="text-sm text-text-secondary mt-3">
            {maturityLevel.description}
          </p>
        </div>

        {/* Radar + Bars */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-surface rounded-xl shadow-lg border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">
              Perfil por dimensión
            </h3>
            <RadarChart scores={scores.dimensions} />
          </div>

          <div className="bg-surface rounded-xl shadow-lg border border-border p-6">
            <h3 className="text-base font-semibold text-text-primary mb-4">
              Scores por dimensión
            </h3>
            <div className="space-y-4">
              {scores.dimensions.map((d) => (
                <ScoreBar
                  key={d.dimensionId}
                  label={d.name.replace("Salud del Equipo — REACH", "Salud del Equipo")}
                  score={d.score}
                  maxScore={4}
                  color={d.color}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6">
          <h3 className="text-base font-semibold text-text-primary mb-4">
            Insights por dimensión
          </h3>
          <div className="space-y-3">
            {scores.dimensions.map((d) => (
              <DimensionInsight
                key={d.dimensionId}
                dimensionId={d.dimensionId}
                dimensionName={d.name.replace("Salud del Equipo — REACH", "Salud del Equipo")}
                score={d.score}
                color={d.color}
              />
            ))}
          </div>
        </div>

        {/* Strength & Opportunity */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-surface rounded-xl shadow-lg border border-border p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={18} className="text-emerald-600" />
              <span className="text-sm font-semibold text-emerald-700">
                Tu fortaleza
              </span>
            </div>
            <p className="text-base font-bold text-text-primary">
              {strongest.name.replace("Salud del Equipo — REACH", "Salud del Equipo")}
            </p>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: strongest.color }}>
              {strongest.score.toFixed(2)}
            </p>
          </div>

          <div className="bg-surface rounded-xl shadow-lg border border-border p-5">
            <div className="flex items-center gap-2 mb-2">
              <TrendingDown size={18} className="text-orange-600" />
              <span className="text-sm font-semibold text-orange-700">
                Mayor oportunidad
              </span>
            </div>
            <p className="text-base font-bold text-text-primary">
              {weakest.name.replace("Salud del Equipo — REACH", "Salud del Equipo")}
            </p>
            <p className="text-2xl font-bold font-mono mt-1" style={{ color: weakest.color }}>
              {weakest.score.toFixed(2)}
            </p>
          </div>
        </div>

        {/* Recommendations */}
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6">
          <h3 className="text-base font-semibold text-text-primary mb-3">
            Recomendaciones para tu nivel
          </h3>
          <ul className="space-y-2">
            {maturityLevel.recommendations.map((rec, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white mt-0.5"
                  style={{ backgroundColor: levelColor }}
                >
                  {i + 1}
                </span>
                <span className="text-sm text-text-secondary">{rec}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Maturity Scale */}
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6">
          <MaturityScale currentLevel={maturityLevel} />
        </div>

        {/* Detail Table */}
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 overflow-x-auto">
          <DetailTable answers={answers} />
        </div>

        {/* Bias note */}
        <div className="bg-surface-tertiary border border-border rounded-lg p-4">
          <p className="text-xs text-text-tertiary leading-relaxed">
            <strong className="text-text-secondary">Nota:</strong> Esta
            evaluación captura la perspectiva del equipo de UX. Para un
            diagnóstico completo, se recomienda complementar con encuestas
            adaptadas para Product Owners y Engineering.
          </p>
        </div>
      </div>
    </div>
  );
}
