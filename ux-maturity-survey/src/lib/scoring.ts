import { dimensions } from "../data/dimensions";

export interface DimensionScore {
  dimensionId: string;
  name: string;
  score: number;
  color: string;
}

export interface SurveyScores {
  dimensions: DimensionScore[];
  global: number;
}

export function calculateScores(
  answers: Record<string, number>
): SurveyScores {
  const dimensionScores: DimensionScore[] = dimensions.map((dim) => {
    const questionIds = dim.questions.map((q) => q.id);
    const sum = questionIds.reduce((acc, id) => acc + (answers[id] || 0), 0);
    const score = parseFloat((sum / questionIds.length).toFixed(2));
    return {
      dimensionId: dim.id,
      name: dim.name,
      score,
      color: dim.color,
    };
  });

  const global = parseFloat(
    (
      dimensionScores.reduce((acc, d) => acc + d.score, 0) /
      dimensionScores.length
    ).toFixed(2)
  );

  return { dimensions: dimensionScores, global };
}

export function getStrongest(scores: DimensionScore[]): DimensionScore {
  return scores.reduce((best, d) => (d.score > best.score ? d : best));
}

export function getWeakest(scores: DimensionScore[]): DimensionScore {
  return scores.reduce((worst, d) => (d.score < worst.score ? d : worst));
}
