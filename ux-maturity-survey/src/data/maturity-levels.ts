export interface MaturityLevel {
  level: number;
  name: string;
  min: number;
  max: number;
  description: string;
  recommendations: string[];
}

export const maturityLevels: MaturityLevel[] = [
  {
    level: 1,
    name: "Ausente",
    min: 1.0,
    max: 1.49,
    description:
      "La práctica UX es inexistente o completamente informal",
    recommendations: [
      "Documentar 3 quick wins de UX que demuestren valor medible",
      "Proponer un piloto de testing con usuarios",
      "Armar un kit mínimo de herramientas",
    ],
  },
  {
    level: 2,
    name: "Limitado",
    min: 1.5,
    max: 2.16,
    description:
      "Esfuerzo individual sin sistematicidad ni apoyo organizacional",
    recommendations: [
      "Estandarizar tu proceso de diseño en un doc de referencia",
      "Iniciar una librería básica de componentes",
      "Establecer al menos una sesión mensual de research",
    ],
  },
  {
    level: 3,
    name: "Emergente",
    min: 2.17,
    max: 2.82,
    description:
      "Procesos funcionales pero inconsistentes y con adopción parcial",
    recommendations: [
      "Formalizar el handoff con specs, tokens y QA visual",
      "Vincular entregables de diseño a métricas de producto",
      "Proponer participación de UX desde el discovery",
    ],
  },
  {
    level: 4,
    name: "Estructurado",
    min: 2.83,
    max: 3.32,
    description:
      "Práctica sólida con procesos definidos. Falta escalar influencia",
    recommendations: [
      "Construir un dashboard de métricas UX vinculado a OKRs",
      "Liderar workshops de co-design con PO y Engineering",
      "Documentar casos de estudio internos",
    ],
  },
  {
    level: 5,
    name: "Integrado",
    min: 3.33,
    max: 3.74,
    description:
      "UX parte integral del desarrollo. Influencia real y métricas definidas",
    recommendations: [
      "Operacionalizar Research Ops",
      "Mentorear equipos adyacentes",
      "Explorar métodos avanzados de research",
    ],
  },
  {
    level: 6,
    name: "Impulsado por el usuario",
    min: 3.75,
    max: 4.0,
    description:
      "Excelencia UX. Autonomía, impacto medible, satisfacción plena",
    recommendations: [
      "Compartir aprendizajes con la comunidad externa",
      "Innovar en metodologías",
      "Liderar visión centrada en usuario a nivel org",
    ],
  },
];

export const dimensionInsights: Record<
  string,
  { low: string; mid: string; high: string }
> = {
  practice: {
    low: "Tu proceso de diseño es mayoritariamente intuitivo. Formalizar una metodología mínima y establecer contacto regular con usuarios tendría alto impacto.",
    mid: "Tienes proceso pero con huecos en consistencia. Enfócate en cerrar el loop post-lanzamiento y documentar aprendizajes para evitar re-trabajo.",
    high: "Tu práctica es sólida. El siguiente paso es escalar lo que funciona al resto del equipo y operacionalizar el research.",
  },
  tools: {
    low: "La falta de herramientas y sistema de diseño está limitando tu capacidad. Prioriza armar una librería mínima viable de componentes.",
    mid: "Tienes tooling básico pero hay desfase entre diseño y código. Alinear el Design System con desarrollo sería el mayor quick win.",
    high: "Tu stack de herramientas es maduro. Mantén la paridad diseño-código y evalúa tools especializados para research y analytics.",
  },
  influence: {
    low: "Tu trabajo llega tarde al proceso y tiene poca influencia. Necesitas negociar participación temprana con datos de impacto.",
    mid: "Tienes presencia pero tu influencia depende del proyecto. Sistematizar la demostración de impacto UX fortalecerá tu posición.",
    high: "Tienes influencia real y buenas relaciones cross-funcionales. Aprovecha para evangelizar y expandir la cultura UX.",
  },
  health: {
    low: "Hay señales de desgaste importantes. Prioriza recuperar tiempo para trabajo creativo y busca apoyo para formación.",
    mid: "Estás en un punto intermedio — cuida el balance entre reactivo y creativo antes de que se deteriore.",
    high: "El equipo está saludable y motivado. Este es un activo valioso — protégelo manteniendo las condiciones actuales.",
  },
};

export function getMaturityLevel(score: number): MaturityLevel {
  for (const level of maturityLevels) {
    if (score >= level.min && score <= level.max) {
      return level;
    }
  }
  return score < 1 ? maturityLevels[0] : maturityLevels[maturityLevels.length - 1];
}

export function getDimensionInsight(
  dimensionId: string,
  score: number
): string {
  const insights = dimensionInsights[dimensionId];
  if (!insights) return "";
  if (score < 2.17) return insights.low;
  if (score <= 3.32) return insights.mid;
  return insights.high;
}
