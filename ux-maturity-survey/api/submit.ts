import type { VercelRequest, VercelResponse } from "@vercel/node";

const TENANT_ID = process.env.UX_SURVEY_ENTRA_TENANT_ID;
const CLIENT_ID = process.env.UX_SURVEY_ENTRA_CLIENT_ID;
const CLIENT_SECRET = process.env.UX_SURVEY_ENTRA_CLIENT_SECRET;
const FILE_PATH = process.env.UX_SURVEY_ONEDRIVE_FILE_PATH;
const DRIVE_ID = process.env.UX_SURVEY_ONEDRIVE_DRIVE_ID;

async function getAccessToken(): Promise<string> {
  const response = await fetch(
    `https://login.microsoftonline.com/${TENANT_ID}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: CLIENT_ID!,
        client_secret: CLIENT_SECRET!,
        scope: "https://graph.microsoft.com/.default",
        grant_type: "client_credentials",
      }),
    }
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Token request failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createSession(
  token: string
): Promise<{ sessionId: string; sessionUrl: string }> {
  const url = `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/root:${FILE_PATH}:/workbook/createSession`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ persistChanges: true }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Create session failed: ${response.status} ${text}`);
  }

  const data = await response.json();
  return { sessionId: data.id, sessionUrl: url.replace("/createSession", `/closeSession`) };
}

async function addRow(
  token: string,
  sessionId: string,
  values: (string | number)[]
): Promise<void> {
  const url = `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/root:${FILE_PATH}:/workbook/tables/Respuestas/rows/add`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "workbook-session-id": sessionId,
    },
    body: JSON.stringify({ values: [values] }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Add row failed: ${response.status} ${text}`);
  }
}

async function closeSession(
  token: string,
  sessionId: string
): Promise<void> {
  const url = `https://graph.microsoft.com/v1.0/drives/${DRIVE_ID}/root:${FILE_PATH}:/workbook/closeSession`;
  await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      "workbook-session-id": sessionId,
    },
    body: JSON.stringify({}),
  }).catch(() => {
    // Best-effort close
  });
}

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  if (!TENANT_ID || !CLIENT_ID || !CLIENT_SECRET || !FILE_PATH || !DRIVE_ID) {
    return res.status(500).json({ error: "Server configuration missing" });
  }

  try {
    const body = req.body;

    // Validate required fields
    if (!body.nombre || !body.correo) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const token = await getAccessToken();
    const { sessionId } = await createSession(token);

    try {
      const values = [
        body.timestamp || new Date().toISOString(),
        body.nombre,
        body.correo,
        body.cargo,
        body.squad,
        body.antiguedad,
        body.a1,
        body.a2,
        body.a3,
        body.a4,
        body.a5,
        body.b1,
        body.b2,
        body.b3,
        body.b4,
        body.c1,
        body.c2,
        body.c3,
        body.c4,
        body.c5,
        body.d1,
        body.d2,
        body.d3,
        body.d4,
        body.scorePractica,
        body.scoreHerramientas,
        body.scoreInfluencia,
        body.scoreSalud,
        body.scoreGlobal,
        body.nivelMadurez,
      ];

      await addRow(token, sessionId, values);
      return res.status(200).json({ success: true });
    } finally {
      await closeSession(token, sessionId);
    }
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown error";
    return res.status(500).json({ error: message });
  }
}
