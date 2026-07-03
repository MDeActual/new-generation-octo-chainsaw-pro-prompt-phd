type SecurityAlert = {
  id: string;
  title?: string;
  severity?: string;
  status?: string;
  createdDateTime?: string;
};

type SecureScore = {
  currentScore?: number;
  maxScore?: number;
};

export const dynamic = "force-dynamic";

async function getAccessToken() {
  const tenantId = process.env.TENANT_ID;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;

  if (!tenantId || !clientId || !clientSecret) {
    return null;
  }

  const tokenResponse = await fetch(
    `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`,
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        grant_type: "client_credentials",
        scope: "https://graph.microsoft.com/.default",
      }),
      cache: "no-store",
    },
  );

  if (!tokenResponse.ok) {
    throw new Error(`Token request failed: ${tokenResponse.status}`);
  }

  const tokenData = (await tokenResponse.json()) as { access_token?: string };
  return tokenData.access_token ?? null;
}

async function graphGet<T>(path: string, accessToken: string): Promise<T> {
  const response = await fetch(`https://graph.microsoft.com${path}`, {
    headers: {
      Authorization: ["Bearer", accessToken].join(" "),
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Graph request failed (${response.status}) for ${path}`);
  }

  return (await response.json()) as T;
}

export default async function SecurityPage() {
  let alerts: SecurityAlert[] = [];
  let secureScore: SecureScore | null = null;
  let authFailed = false;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      authFailed = true;
    } else {
      const [alertResult, scoreResult] = await Promise.all([
        graphGet<{ value: SecurityAlert[] }>(
          "/v1.0/security/alerts_v2?$top=20",
          accessToken,
        ),
        graphGet<{ value: SecureScore[] }>(
          "/v1.0/security/secureScores?$top=1",
          accessToken,
        ),
      ]);

      alerts = alertResult.value;
      secureScore = scoreResult.value[0] ?? null;
    }
  } catch {
    authFailed = true;
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <h1 className="text-3xl font-semibold">Security</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Defender alerts and secure score from Microsoft Graph</p>

      {authFailed ? (
        <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Could not authenticate to Microsoft Graph. Check TENANT_ID, CLIENT_ID, and CLIENT_SECRET. Showing empty state.
        </div>
      ) : null}

      <div className="mt-6 rounded-lg border border-gray-300 p-4">
        <h2 className="text-lg font-medium">Secure Score</h2>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-200">
          {secureScore
            ? `${secureScore.currentScore ?? 0} / ${secureScore.maxScore ?? 0}`
            : "No secure score data available."}
        </p>
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 font-medium">Title</th>
              <th className="px-4 py-3 font-medium">Severity</th>
              <th className="px-4 py-3 font-medium">Status</th>
              <th className="px-4 py-3 font-medium">Created</th>
            </tr>
          </thead>
          <tbody>
            {alerts.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-gray-600 dark:text-gray-300" colSpan={4}>
                  No security alerts available.
                </td>
              </tr>
            ) : (
              alerts.map((alert) => (
                <tr key={alert.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">{alert.title ?? "Unknown"}</td>
                  <td className="px-4 py-3">{alert.severity ?? "Unknown"}</td>
                  <td className="px-4 py-3">{alert.status ?? "Unknown"}</td>
                  <td className="px-4 py-3">{alert.createdDateTime ?? "Unknown"}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
