import { Compass, Wrench, Users, Heart, ArrowRight } from "lucide-react";

const LOGO_SRC =
  "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTkwIiBoZWlnaHQ9IjM0IiB2aWV3Qm94PSIwIDAgMTkwIDM0IiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMl81OCkiPgo8cGF0aCBkPSJNNC4wMDg3OSAxNC45MjYzTDkuMzk5MDEgOC42MTMyOEgzMS4xMTYzTDI1LjU0MzYgMTQuOTI2M0g0LjAwODc5WiIgZmlsbD0iIzVEMEU4QiIvPgo8cGF0aCBkPSJNMCA2LjMxMjk5TDUuMzk0NTcgMEg0MS4xMjM4TDM1LjYwNzYgNi4zMTI5OUgwWiIgZmlsbD0iI0Y0QTYwRCIvPgo8cGF0aCBkPSJNOS42MDc4NSAxNy4yMjM2SDE5LjczMjRMNS4xNjAxNiAzNC4wMDA1TDkuNjA3ODUgMTcuMjIzNloiIGZpbGw9IiNGNEE2MEQiLz4KPHBhdGggZD0iTTgwLjEyMzcgNi4yMDAyTDczLjQ5MTIgMjguMTM3NUg3OS4zODA5TDgzLjA5ODkgMTcuMjc1TDg4LjE4OTUgMjguMTM3NUg5My45MTg1TDEwMC43NTUgNi4yMDAySDk0LjI0NDJMOTEuMTM0MyAxNi45MzI3TDg2LjIzMDYgNi4yMDAySDgwLjEyMzdaIiBmaWxsPSIjNUQwRThCIi8+CjxwYXRoIGQ9Ik03MC44Mjg3IDYuMDE4NTVINzcuMjE3OUw3MC41NzY4IDI4LjE4OThINjQuNDM5NUw3MC44Mjg3IDYuMDE4NTVaIiBmaWxsPSIjNUQwRThCIi8+CjxwYXRoIGQ9Ik02Mi42MTUgMTYuNjI5N0g2Mi40ODkxVjE2LjYzODRINTEuNTE3NUw1Mi45Mzc4IDExLjcyNDlINjAuNTY0OVYxMS43Mzc5SDY2LjY4MDVMNjguMjMxMSA2LjA0ODg4TDQ4LjgwMjggNi4wMTg1NUw0MS42NzA5IDI4LjE5ODVINDguMTY4N0w0OS44NDA5IDIyLjQzMTVINjEuMDM0TDYyLjYxNSAxNi42Mjk3WiIgZmlsbD0iIzVEMEU4QiIvPgo8cGF0aCBkPSJNMTE3LjU1NSAxNi42Mzg1SDEwNi41ODNMMTA2LjU4OCAxNi42Mjk5SDEwMC40NTlMOTYuNzQxMiAyOC4xOTg2SDEwMy4yMzlMMTA0LjkwNyAyMi40MzE2SDExNi4xMDRMMTE3LjY4NSAxNi42Mjk5SDExNy41NTlMMTE3LjU1NSAxNi42Mzg1WiIgZmlsbD0iI0Y0QTYwRCIvPgo8cGF0aCBkPSJNMTAzLjg2OSA2LjAxODU1TDEwMi4wMzYgMTEuNzI0OUgxMDguMDA4SDEwOS4yNTFIMTE1LjYzNkwxMTUuNjMxIDExLjczNzlIMTIxLjc1MUwxMjMuMzAyIDYuMDQ4ODhMMTAzLjg2OSA2LjAxODU1WiIgZmlsbD0iI0Y0QTYwRCIvPgo8cGF0aCBkPSJNMTM4LjIxOCA2LjAxODU1SDEzMi4wMDNMMTE0LjI0MiAyOC4xODk4SDEyMS40NDhMMTI0LjMxOSAyNC41MDI2SDEzMi43MzdMMTMyLjgzNyAyOC4xODk4SDEzOS4xNTJMMTM4LjIxOCA2LjAxODU1Wk0xMjcuNTM4IDIwLjM2NDdMMTMyLjQ0NiAxNC4wNjQ3TDEzMi42MTkgMjAuMzY0N0gxMjcuNTM4WiIgZmlsbD0iI0Y0QTYwRCIvPgo8cGF0aCBkPSJNMTY5LjE2NCA1LjgwMTc2SDE5MEwxODguNjI3IDExLjY1NTVIMTgxLjQwNEwxNzYuOTgyIDI4LjEwM0gxNzAuMzYzTDE3NC44ODQgMTEuNjU1NUgxNjcuNjdMMTY5LjE2NCA1LjgwMTc2WiIgZmlsbD0iI0Y0QTYwRCIvPgo8cGF0aCBkPSJNMTY3LjA1NCA1LjkxNDAzSDE0Ny42MDhMMTQ1Ljk0IDExLjU1OThMMTU0Ljg5MiAyMi4yNDQ2SDE0Mi44MzlMMTQwLjk3NSAyOC4xMjg2SDE2MC43MDNMMTYyLjI5MyAyMi40NjEzTDE1My41NjMgMTEuNjcyNEgxNjUuNjE2TDE2Ny4wNTQgNS45MTQwM1oiIGZpbGw9IiNGNEE2MEQiLz4KPC9nPgo8ZGVmcz4KPGNsaXBQYXRoIGlkPSJjbGlwMF8yXzU4Ij4KPHJlY3Qgd2lkdGg9IjE5MCIgaGVpZ2h0PSIzNCIgZmlsbD0id2hpdGUiLz4KPC9jbGlwUGF0aD4KPC9kZWZzPgo8L3N2Zz4K";

const dimensionCards = [
  {
    icon: Compass,
    name: "Práctica y Proceso",
    description: "Metodologías de research, testing y diseño",
    color: "#5D0E8B",
    bg: "bg-primary-50",
  },
  {
    icon: Wrench,
    name: "Herramientas y Artefactos",
    description: "Design System, tooling y calidad de handoff",
    color: "#D946A8",
    bg: "bg-pink-50",
  },
  {
    icon: Users,
    name: "Influencia y Colaboración",
    description: "Participación en decisiones y relación cross-funcional",
    color: "#F4A60D",
    bg: "bg-accent-50",
  },
  {
    icon: Heart,
    name: "Salud del Equipo",
    description: "Bienestar, capacidad y motivación del equipo",
    color: "#10B981",
    bg: "bg-emerald-50",
  },
];

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-2xl animate-fade-in">
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 sm:p-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <img src={LOGO_SRC} alt="FinFast" className="h-8 sm:h-10" />
          </div>

          {/* Badge */}
          <div className="flex justify-center mb-4">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary">
              Herramienta de diagnóstico interno
            </span>
          </div>

          {/* Title */}
          <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center mb-2">
            Evaluación de Madurez UX
          </h1>
          <p className="text-text-secondary text-center text-sm sm:text-base mb-8">
            Encuesta para el Equipo de Diseño
          </p>

          {/* Dimension cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {dimensionCards.map((dim) => (
              <div
                key={dim.name}
                className="flex items-start gap-3 p-4 rounded-lg border border-border bg-surface-secondary"
              >
                <div
                  className="flex-shrink-0 w-9 h-9 rounded-md flex items-center justify-center"
                  style={{ backgroundColor: dim.color + "15" }}
                >
                  <dim.icon
                    size={18}
                    style={{ color: dim.color }}
                    aria-hidden="true"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-text-primary leading-tight">
                    {dim.name}
                  </p>
                  <p className="text-xs text-text-secondary mt-0.5">
                    {dim.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={onStart}
            className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
          >
            Comenzar evaluación
            <ArrowRight size={18} aria-hidden="true" />
          </button>

          <p className="text-xs text-text-tertiary text-center mt-4">
            18 preguntas · Aproximadamente 5 minutos
          </p>
        </div>
      </div>
    </div>
  );
}
