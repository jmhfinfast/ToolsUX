import { useState } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";
import type { EvaluatorData } from "../lib/submit";

const ROLES = [
  "UX Designer",
  "UX Researcher",
  "UI Designer",
  "UX Writer",
  "UX Lead",
  "Otro",
];

const SENIORITY_OPTIONS = [
  "Menos de 6 meses",
  "6-12 meses",
  "1-2 años",
  "2-5 años",
  "Más de 5 años",
];

const EMAIL_REGEX = /^[^\s@]+@finfast\.(cl|com)$/i;

interface EvaluatorFormProps {
  onSubmit: (data: EvaluatorData) => void;
  onBack: () => void;
  initialData?: EvaluatorData | null;
}

export default function EvaluatorForm({
  onSubmit,
  onBack,
  initialData,
}: EvaluatorFormProps) {
  const [form, setForm] = useState<EvaluatorData>(
    initialData || {
      name: "",
      email: "",
      role: "",
      squad: "",
      seniority: "",
    }
  );
  const [errors, setErrors] = useState<Partial<Record<keyof EvaluatorData, string>>>({});

  function validate(): boolean {
    const newErrors: Partial<Record<keyof EvaluatorData, string>> = {};

    if (!form.name.trim()) newErrors.name = "El nombre es requerido";
    if (!form.email.trim()) {
      newErrors.email = "El correo es requerido";
    } else if (!EMAIL_REGEX.test(form.email.trim())) {
      newErrors.email = "Debe ser un correo @finfast.cl o @finfast.com";
    }
    if (!form.role) newErrors.role = "Selecciona tu cargo";
    if (!form.squad.trim()) newErrors.squad = "El squad es requerido";
    if (!form.seniority) newErrors.seniority = "Selecciona tu antigüedad";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (validate()) {
      onSubmit({ ...form, name: form.name.trim(), email: form.email.trim(), squad: form.squad.trim() });
    }
  }

  function updateField(field: keyof EvaluatorData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  }

  return (
    <div className="min-h-dvh flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-lg animate-slide-up">
        <div className="bg-surface rounded-xl shadow-lg border border-border p-6 sm:p-8">
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors mb-4 cursor-pointer"
          >
            <ArrowLeft size={16} aria-hidden="true" />
            Volver
          </button>

          <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-1">
            Datos del evaluador
          </h2>
          <p className="text-sm text-text-secondary mb-6">
            Esta información se asocia a tus respuestas de forma confidencial.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Nombre completo
              </label>
              <input
                id="name"
                type="text"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-text-tertiary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="María González"
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "name-error" : undefined}
              />
              {errors.name && (
                <p id="name-error" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.name}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Correo corporativo
              </label>
              <input
                id="email"
                type="email"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-text-tertiary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="maria.gonzalez@finfast.cl"
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "email-error" : undefined}
              />
              {errors.email && (
                <p id="email-error" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Role */}
            <div>
              <label
                htmlFor="role"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Cargo / especialidad UX
              </label>
              <select
                id="role"
                value={form.role}
                onChange={(e) => updateField("role", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                aria-invalid={!!errors.role}
                aria-describedby={errors.role ? "role-error" : undefined}
              >
                <option value="" disabled>
                  Selecciona tu cargo
                </option>
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
              {errors.role && (
                <p id="role-error" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.role}
                </p>
              )}
            </div>

            {/* Squad */}
            <div>
              <label
                htmlFor="squad"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Squad o equipo
              </label>
              <input
                id="squad"
                type="text"
                value={form.squad}
                onChange={(e) => updateField("squad", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-text-tertiary focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                placeholder="Squad Factoring"
                aria-invalid={!!errors.squad}
                aria-describedby={errors.squad ? "squad-error" : undefined}
              />
              {errors.squad && (
                <p id="squad-error" className="text-xs text-red-600 mt-1" role="alert">
                  {errors.squad}
                </p>
              )}
            </div>

            {/* Seniority */}
            <div>
              <label
                htmlFor="seniority"
                className="block text-sm font-medium text-text-primary mb-1"
              >
                Antigüedad en el rol
              </label>
              <select
                id="seniority"
                value={form.seniority}
                onChange={(e) => updateField("seniority", e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors"
                aria-invalid={!!errors.seniority}
                aria-describedby={
                  errors.seniority ? "seniority-error" : undefined
                }
              >
                <option value="" disabled>
                  Selecciona tu antigüedad
                </option>
                {SENIORITY_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              {errors.seniority && (
                <p
                  id="seniority-error"
                  className="text-xs text-red-600 mt-1"
                  role="alert"
                >
                  {errors.seniority}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary-light text-white font-semibold py-3 px-6 rounded-lg transition-colors mt-6 cursor-pointer"
            >
              Continuar al cuestionario
              <ArrowRight size={18} aria-hidden="true" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
