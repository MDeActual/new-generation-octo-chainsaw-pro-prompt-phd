type DirectoryRole = {
  id: string;
  displayName?: string;
};

type GraphUser = {
  id: string;
  displayName?: string;
  userPrincipalName?: string;
};

type AdminRoleRow = {
  id: string;
  name: string;
  upn: string;
  role: string;
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

export default async function IdentityPage() {
  let rows: AdminRoleRow[] = [];
  let authFailed = false;

  try {
    const accessToken = await getAccessToken();

    if (!accessToken) {
      authFailed = true;
    } else {
      const roleResult = await graphGet<{ value: DirectoryRole[] }>(
        "/v1.0/directoryRoles?$select=id,displayName",
        accessToken,
      );

      const adminRoles = roleResult.value.filter((role) =>
        role.displayName?.toLowerCase().includes("admin"),
      );

      const output: AdminRoleRow[] = [];

      for (const role of adminRoles) {
        const memberResult = await graphGet<{ value: GraphUser[] }>(
          `/v1.0/directoryRoles/${role.id}/members/microsoft.graph.user?$select=id,displayName,userPrincipalName`,
          accessToken,
        );

        for (const user of memberResult.value) {
          output.push({
            id: `${role.id}-${user.id}`,
            name: user.displayName ?? "Unknown",
            upn: user.userPrincipalName ?? "Unknown",
            role: role.displayName ?? "Unknown",
          });
        }
      }

      rows = output;
    }
  } catch {
    authFailed = true;
  }

  return (
    <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10">
      <h1 className="text-3xl font-semibold">Identity</h1>
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">Entra ID admin role assignments from Microsoft Graph</p>

      {authFailed ? (
        <div className="mt-6 rounded-lg border border-amber-400 bg-amber-50 p-4 text-sm text-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Could not authenticate to Microsoft Graph. Check TENANT_ID, CLIENT_ID, and CLIENT_SECRET. Showing empty state.
        </div>
      ) : null}

      <div className="mt-6 overflow-hidden rounded-lg border border-gray-300">
        <table className="w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-900">
            <tr>
              <th className="px-4 py-3 font-medium">Admin User</th>
              <th className="px-4 py-3 font-medium">UPN</th>
              <th className="px-4 py-3 font-medium">Role</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 ? (
              <tr>
                <td className="px-4 py-4 text-gray-600 dark:text-gray-300" colSpan={3}>
                  No admin role data available.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-t border-gray-200 dark:border-gray-800">
                  <td className="px-4 py-3">{row.name}</td>
                  <td className="px-4 py-3">{row.upn}</td>
                  <td className="px-4 py-3">{row.role}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </main>
  );
}
