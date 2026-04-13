import type { SurveyScores } from "./scoring";
import { getMaturityLevel } from "../data/maturity-levels";

export interface EvaluatorData {
  name: string;
  email: string;
  role: string;
  squad: string;
  seniority: string;
}

interface SubmitPayload {
  evaluator: EvaluatorData;
  answers: Record<string, number>;
  scores: SurveyScores;
}

const STORAGE_KEY = "ux-survey-backup";
const SUBMITTED_KEY = "ux-survey-submitted";

export function hasSubmittedToday(email: string): boolean {
  try {
    const submitted = JSON.parse(localStorage.getItem(SUBMITTED_KEY) || "{}");
    const today = new Date().toISOString().slice(0, 10);
    return submitted[email] === today;
  } catch {
    return false;
  }
}

function markAsSubmitted(email: string): void {
  try {
    const submitted = JSON.parse(localStorage.getItem(SUBMITTED_KEY) || "{}");
    const today = new Date().toISOString().slice(0, 10);
    submitted[email] = today;
    localStorage.setItem(SUBMITTED_KEY, JSON.stringify(submitted));
  } catch {
    // Ignore storage errors
  }
}

function saveBackup(payload: SubmitPayload): void {
  try {
    const backups = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    backups.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem(STORAGE_KEY, JSON.stringify(backups));
  } catch {
    // Ignore storage errors
  }
}

export async function submitSurvey(
  payload: SubmitPayload
): Promise<{ success: boolean; error?: string; backedUp?: boolean }> {
  const { evaluator, answers, scores } = payload;
  const maturityLevel = getMaturityLevel(scores.global);

  const body = {
    timestamp: new Date().toISOString(),
    nombre: evaluator.name,
    correo: evaluator.email,
    cargo: evaluator.role,
    squad: evaluator.squad,
    antiguedad: evaluator.seniority,
    a1: answers.A1,
    a2: answers.A2,
    a3: answers.A3,
    a4: answers.A4,
    a5: answers.A5,
    b1: answers.B1,
    b2: answers.B2,
    b3: answers.B3,
    b4: answers.B4,
    c1: answers.C1,
    c2: answers.C2,
    c3: answers.C3,
    c4: answers.C4,
    c5: answers.C5,
    d1: answers.D1,
    d2: answers.D2,
    d3: answers.D3,
    d4: answers.D4,
    scorePractica: scores.dimensions.find((d) => d.dimensionId === "practice")
      ?.score,
    scoreHerramientas: scores.dimensions.find((d) => d.dimensionId === "tools")
      ?.score,
    scoreInfluencia: scores.dimensions.find(
      (d) => d.dimensionId === "influence"
    )?.score,
    scoreSalud: scores.dimensions.find((d) => d.dimensionId === "health")
      ?.score,
    scoreGlobal: scores.global,
    nivelMadurez: maturityLevel.name,
  };

  try {
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    markAsSubmitted(evaluator.email);
    return { success: true };
  } catch (error) {
    saveBackup(payload);
    return {
      success: false,
      error:
        error instanceof Error ? error.message : "Error desconocido al enviar",
      backedUp: true,
    };
  }
}

export async function retryBackups(): Promise<number> {
  try {
    const backups = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (backups.length === 0) return 0;

    let sent = 0;
    const remaining = [];

    for (const backup of backups) {
      try {
        const result = await submitSurvey(backup);
        if (result.success) {
          sent++;
        } else {
          remaining.push(backup);
        }
      } catch {
        remaining.push(backup);
      }
    }

    localStorage.setItem(STORAGE_KEY, JSON.stringify(remaining));
    return sent;
  } catch {
    return 0;
  }
}
