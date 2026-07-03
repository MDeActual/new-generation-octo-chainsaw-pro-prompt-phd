# Partner Portal (Next.js + Microsoft Graph)

This app has **no mock data** and fetches directly from Microsoft Graph in server components.

## 1) Environment setup (3 variables only)

Copy `.env.example` to `.env.local` in this folder:

```bash
cp .env.example .env.local
```

Set values:

```env
TENANT_ID=<your-entra-tenant-id>
CLIENT_ID=<app-registration-client-id>
CLIENT_SECRET=<app-registration-client-secret>
```

## 2) Install and run

```bash
npm install
npm run dev
```

Pages:

- `http://localhost:3000/identity` → Entra ID admin users from role assignments
- `http://localhost:3000/tenants` → Delegated tenants (Azure Lighthouse)
- `http://localhost:3000/security` → Defender alerts + secure score

## 3) Azure app registration setup (step-by-step)

1. Go to **Azure Portal** → **Microsoft Entra ID** → **App registrations** → **New registration**.
2. Name it (example: `partner-portal-graph`) and create.
3. Open the app → **Certificates & secrets** → **New client secret**.
4. Copy the secret value immediately; save as `CLIENT_SECRET`.
5. Open **Overview** and copy:
   - **Application (client) ID** → `CLIENT_ID`
   - **Directory (tenant) ID** → `TENANT_ID`
6. Open **API permissions** → **Add a permission** → **Microsoft Graph** → **Application permissions**.
7. Add permissions:
   - `Directory.Read.All`
   - `RoleManagement.Read.Directory`
   - `DelegatedAdminRelationship.Read.All`
   - `SecurityEvents.Read.All`
   - `SecurityScores.Read.All`
8. Click **Grant admin consent**.
9. Restart dev server after updating `.env.local`.

## Error handling behavior

If auth fails (missing env vars, invalid secret, or denied permissions), each page shows a warning and a safe empty state.
