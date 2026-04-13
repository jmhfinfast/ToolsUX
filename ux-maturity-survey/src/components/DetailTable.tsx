import { dimensions } from "../data/dimensions";

interface DetailTableProps {
  answers: Record<string, number>;
}

export default function DetailTable({ answers }: DetailTableProps) {
  return (
    <div>
      <h3 className="text-base font-semibold text-text-primary mb-4">
        Detalle de respuestas
      </h3>
      <div className="space-y-4">
        {dimensions.map((dim) => (
          <div key={dim.id}>
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: dim.color }}
                aria-hidden="true"
              />
              <span
                className="text-sm font-semibold"
                style={{ color: dim.color }}
              >
                {dim.name}
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" role="table">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 font-medium text-text-secondary">
                      Pregunta
                    </th>
                    <th className="text-center py-2 px-2 font-medium text-text-secondary w-16">
                      Puntaje
                    </th>
                    <th className="text-left py-2 pl-4 font-medium text-text-secondary">
                      Respuesta seleccionada
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {dim.questions.map((q) => {
                    const answer = answers[q.id] || 0;
                    return (
                      <tr key={q.id} className="border-b border-border/50">
                        <td className="py-2 pr-4 text-text-primary font-mono text-xs">
                          {q.id}
                        </td>
                        <td className="py-2 px-2 text-center">
                          <span
                            className="inline-flex items-center justify-center w-7 h-7 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: dim.color }}
                          >
                            {answer}
                          </span>
                        </td>
                        <td className="py-2 pl-4 text-text-secondary text-xs">
                          {answer > 0
                            ? q.options[answer - 1]
                            : "Sin respuesta"}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
