export interface Question {
  id: string;
  text: string;
  options: string[];
}

export interface Dimension {
  id: string;
  name: string;
  shortName: string;
  color: string;
  icon: string;
  description: string;
  questions: Question[];
}

export const dimensions: Dimension[] = [
  {
    id: "practice",
    name: "Práctica y Proceso",
    shortName: "Práctica",
    color: "#5D0E8B",
    icon: "compass",
    description:
      "Metodologías de research, testing y diseño que aplicas en tu trabajo diario.",
    questions: [
      {
        id: "A1",
        text: "¿Con qué frecuencia realizas research con usuarios finales reales (entrevistas, tests de usabilidad, encuestas)?",
        options: [
          "Nunca o casi nunca hago research con usuarios reales",
          "Esporádicamente, cuando se presenta la oportunidad o alguien lo pide",
          "Regularmente (al menos 1 vez por trimestre) pero no en todos los proyectos",
          "Es parte de mi proceso continuo en cada ciclo de diseño",
        ],
      },
      {
        id: "A2",
        text: "¿Cómo es tu proceso de testing antes de entregar diseños a desarrollo?",
        options: [
          "No hago testing; entrego lo que diseño directamente",
          "Hago revisiones internas con el equipo pero no con usuarios",
          "Realizo tests de usabilidad ocasionales antes de entregar",
          "Tengo un proceso sistemático de validación (prototipos, tests, iteración) antes del handoff",
        ],
      },
      {
        id: "A3",
        text: "¿Utilizas metodologías de diseño definidas (Design Thinking, Double Diamond, JTBD, etc.) en tu trabajo?",
        options: [
          "No uso ninguna metodología; diseño por intuición y experiencia",
          "Conozco metodologías pero las aplico parcialmente y sin consistencia",
          "Uso metodologías en la mayoría de los proyectos importantes",
          "Tengo un framework adaptado que aplico consistentemente y el equipo comparte",
        ],
      },
      {
        id: "A4",
        text: "¿Documentas hallazgos, decisiones de diseño y aprendizajes de research de forma accesible?",
        options: [
          "No documento nada más allá de los archivos de diseño",
          "Documento a veces pero sin formato ni repositorio estándar",
          "Mantengo documentación de los proyectos principales en un lugar compartido",
          "Todo se documenta sistemáticamente en un repositorio organizado y accesible",
        ],
      },
      {
        id: "A5",
        text: "¿Existe un ciclo de iteración post-lanzamiento donde mides el impacto de lo diseñado y ajustas?",
        options: [
          "Nunca vuelvo a revisar lo que ya se lanzó",
          "Muy rara vez; solo si hay quejas o bugs evidentes",
          "A veces reviso métricas post-lanzamiento pero sin proceso definido",
          "Tengo un proceso de cierre que incluye métricas, feedback y retrospectiva de diseño",
        ],
      },
    ],
  },
  {
    id: "tools",
    name: "Herramientas y Artefactos",
    shortName: "Herramientas",
    color: "#D946A8",
    icon: "wrench",
    description:
      "Design System, tooling, paridad con código y calidad de handoff.",
    questions: [
      {
        id: "B1",
        text: "¿En qué estado se encuentra tu Design System o librería de componentes?",
        options: [
          "No existe ningún sistema de diseño ni librería",
          "Hay archivos Figma sueltos pero sin sistema unificado ni tokens",
          "Existe un Design System funcional pero con adopción parcial o desactualizado",
          "Design System activo, con tokens, componentes documentados y en mejora continua",
        ],
      },
      {
        id: "B2",
        text: "¿Los componentes de tu librería están sincronizados con lo que desarrollo implementa?",
        options: [
          "No hay relación entre lo que diseño y lo que existe en código",
          "Algunos componentes coinciden pero la mayoría divergen",
          "La mayoría están alineados pero hay desfases en las actualizaciones",
          "Paridad total o casi total; actualizaciones se coordinan entre diseño y desarrollo",
        ],
      },
      {
        id: "B3",
        text: "¿Tienes las herramientas necesarias para hacer tu trabajo efectivamente?",
        options: [
          "Trabajo con herramientas inadecuadas o gratuitas limitadas",
          "Tengo la herramienta principal (Figma) pero carezco de tools de research y analytics",
          "Tengo buen tooling de diseño y acceso parcial a analytics y research",
          "Stack completo: diseño, prototipado, research, analytics, y testing",
        ],
      },
      {
        id: "B4",
        text: "¿Cómo es la calidad del handoff que entregas a desarrollo?",
        options: [
          "Entrego pantallas sin especificaciones; desarrollo interpreta como puede",
          "Entrego Figmas con anotaciones básicas pero sin specs detalladas",
          "Handoff documentado con specs, tokens y estados pero sin verificación posterior",
          "Handoff completo con specs, flujos, edge cases, QA visual y feedback loop",
        ],
      },
    ],
  },
  {
    id: "influence",
    name: "Influencia y Colaboración",
    shortName: "Influencia",
    color: "#F4A60D",
    icon: "users",
    description:
      "Tu participación en decisiones de producto y relación con otros roles.",
    questions: [
      {
        id: "C1",
        text: "¿En qué momento del ciclo de desarrollo te involucran?",
        options: [
          "Al final, para 'vestir' lo que ya está definido o construido",
          "Después de la definición, para diseñar pantallas de requerimientos cerrados",
          "Desde la definición en proyectos importantes, pero no en todo",
          "Desde el discovery en todos los proyectos; participo en la definición del problema",
        ],
      },
      {
        id: "C2",
        text: "Cuando presentas hallazgos de research o recomendaciones, ¿se incorporan al producto?",
        options: [
          "Casi nunca; las decisiones ya están tomadas por negocio o PO",
          "A veces se consideran pero rara vez cambian la dirección",
          "Se incorporan parcialmente; depende del proyecto y del stakeholder",
          "Son un input importante y frecuentemente influyen en decisiones de producto",
        ],
      },
      {
        id: "C3",
        text: "¿Cómo es tu relación de trabajo diaria con Engineering?",
        options: [
          "Mínima interacción; solo entrego diseños y espero que se implementen",
          "Comunicación reactiva cuando hay dudas o discrepancias",
          "Colaboración activa en definición, pero sin verificación conjunta del resultado",
          "Trabajo integrado con feedback bidireccional, pair design/dev y QA visual compartida",
        ],
      },
      {
        id: "C4",
        text: "¿Cómo es tu relación de trabajo con el Product Owner?",
        options: [
          "El PO define todo; UX ejecuta lo que se pide sin participar en priorización",
          "El PO consulta a UX ocasionalmente pero toma decisiones unilateralmente",
          "PO y UX colaboran en definición pero la priorización es exclusiva del PO",
          "Partnership real: co-definimos problemas, priorizamos juntos y compartimos ownership",
        ],
      },
      {
        id: "C5",
        text: "¿Sientes que las áreas fuera de UX entienden qué haces y por qué importa?",
        options: [
          "Hay desconocimiento total; me ven como 'el que hace las pantallas bonitas'",
          "Saben que hago diseño pero no entienden research, testing ni mi proceso",
          "Hay reconocimiento creciente pero todavía con confusiones frecuentes",
          "Mi rol y proceso son comprendidos y valorados por las áreas con las que trabajo",
        ],
      },
    ],
  },
  {
    id: "health",
    name: "Salud del Equipo — REACH",
    shortName: "Salud",
    color: "#10B981",
    icon: "heart",
    description:
      "Efficiency, Ability, Health y Results: el bienestar y capacidad del equipo.",
    questions: [
      {
        id: "D1",
        text: "[Efficiency] ¿Cómo se distribuye tu tiempo entre trabajo creativo/estratégico vs. tareas reactivas?",
        options: [
          "Casi todo se va en urgencias, ajustes de último minuto y apagar incendios",
          "Más reactivo que proactivo (aprox. 70% incendios / 30% creación)",
          "Balance razonable (aprox. 50/50 entre creación y operación)",
          "La mayoría es trabajo estratégico y creativo (>70%)",
        ],
      },
      {
        id: "D2",
        text: "[Ability] ¿Sientes que tienes las habilidades para tu rol actual y tu crecimiento profesional?",
        options: [
          "Siento brechas importantes y no tengo acceso a formación",
          "Me las arreglo pero hay áreas donde necesito crecer y no tengo apoyo",
          "Tengo buen nivel pero falta acceso a capacitación avanzada o especializada",
          "Tengo las skills necesarias y acceso a oportunidades de crecimiento continuo",
        ],
      },
      {
        id: "D3",
        text: "[Health] ¿Cómo evalúas tu motivación y satisfacción profesional en tu rol actual?",
        options: [
          "Frustración alta; siento que mi trabajo no tiene impacto real",
          "Motivación baja; hay momentos buenos pero predomina la frustración",
          "Generalmente satisfecho pero con frustraciones recurrentes",
          "Alta motivación; siento propósito, impacto y crecimiento en lo que hago",
        ],
      },
      {
        id: "D4",
        text: "[Results] ¿Puedes medir o demostrar el impacto de tu trabajo en métricas de producto?",
        options: [
          "No tengo acceso a métricas ni forma de medir el impacto",
          "Acceso parcial a analytics pero no lo vinculo con mis decisiones de diseño",
          "Puedo demostrar impacto en algunos proyectos con datos parciales",
          "Métricas UX definidas; las uso para demostrar valor y tomar decisiones",
        ],
      },
    ],
  },
];
