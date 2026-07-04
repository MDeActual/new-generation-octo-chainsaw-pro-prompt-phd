export default function SettingsPage() {
  const integrations = [
    {
      group: "Identity & Secrets",
      items: [
        { name: "Azure Key Vault", desc: "Store and retrieve secrets, certificates, and keys. Required for all service-to-service authentication.", env: "AZURE_KEYVAULT_URI", icon: "🗝️", docs: "https://learn.microsoft.com/azure/key-vault/" },
        { name: "Entra ID (Azure AD)", desc: "Tenant ID and Client ID for Microsoft Graph and Partner Center API calls.", env: "AZURE_TENANT_ID / AZURE_CLIENT_ID", icon: "🪪", docs: "https://learn.microsoft.com/entra/identity/" },
      ],
    },
    {
      group: "Partner Operations",
      items: [
        { name: "Partner Center API", desc: "Indirect CSP subscription management, customer billing, and PAL association automation.", env: "PARTNER_CENTER_CLIENT_ID", icon: "🤝", docs: "https://learn.microsoft.com/partner-center/develop/" },
        { name: "Microsoft Graph", desc: "M365 and Entra operations across delegated customer tenants.", env: "GRAPH_CLIENT_SECRET", icon: "🕸️", docs: "https://learn.microsoft.com/graph/" },
      ],
    },
    {
      group: "Security & Monitoring",
      items: [
        { name: "Microsoft Defender XDR", desc: "Pull real-time security alerts and incident data across customer tenants.", env: "DEFENDER_CLIENT_SECRET", icon: "🛡️", docs: "https://learn.microsoft.com/defender-xdr/" },
        { name: "Microsoft Sentinel", desc: "Log Analytics workspace ID for SIEM data and KQL-based incident queries.", env: "SENTINEL_WORKSPACE_ID", icon: "🔭", docs: "https://learn.microsoft.com/sentinel/" },
      ],
    },
    {
      group: "Data & Compliance",
      items: [
        { name: "Microsoft Purview", desc: "Compliance posture and data governance APIs for customer tenant reporting.", env: "PURVIEW_CLIENT_SECRET", icon: "📋", docs: "https://learn.microsoft.com/purview/" },
        { name: "Azure Monitor / Log Analytics", desc: "Operational metrics, custom dashboards, and automation telemetry.", env: "LOG_ANALYTICS_WORKSPACE_ID", icon: "📊", docs: "https://learn.microsoft.com/azure/azure-monitor/" },
      ],
    },
  ];

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Demo Mode Notice */}
      <div className="rounded-xl border border-amber-500/30 bg-amber-500/5 p-5">
        <div className="flex gap-3">
          <span className="text-2xl shrink-0">⚠️</span>
          <div>
            <h3 className="text-amber-300 font-semibold text-sm mb-1">Demo Mode Active</h3>
            <p className="text-amber-200/70 text-xs leading-relaxed">
              All data shown in this portal is mocked. No Azure services are connected. Configure the environment
              variables below (or use Azure Key Vault references) to connect real services. All secrets must be stored
              in Azure Key Vault — never in environment variables directly in production.
            </p>
          </div>
        </div>
      </div>

      {/* Integration Groups */}
      {integrations.map(group => (
        <div key={group.group} className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
          <div className="px-5 py-4 border-b border-[#1e2230]">
            <h3 className="text-sm font-semibold text-white">{group.group}</h3>
          </div>
          <div className="divide-y divide-[#1e2230]">
            {group.items.map(item => (
              <div key={item.name} className="px-5 py-4 flex items-start gap-4">
                <span className="text-2xl shrink-0 mt-0.5">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <h4 className="text-sm font-medium text-white">{item.name}</h4>
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-[#1e2230] text-gray-400 border border-[#374151]">
                      🔒 Not Connected
                    </span>
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{item.desc}</p>
                  <div className="flex items-center gap-3">
                    <code className="text-[11px] text-cyan-400 bg-[#0f1117] px-2 py-0.5 rounded font-mono border border-[#1e2230]">
                      {item.env}
                    </code>
                    <a
                      href={item.docs}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-blue-400 hover:text-blue-300 underline underline-offset-2"
                    >
                      Microsoft Docs ↗
                    </a>
                  </div>
                </div>
                <button
                  disabled
                  className="shrink-0 mt-1 text-xs bg-[#1e2230] text-gray-500 border border-[#374151] px-3 py-1.5 rounded-lg cursor-not-allowed"
                  title="Configure credentials to unlock"
                >
                  Configure
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Architecture Note */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
        <h3 className="text-sm font-semibold text-white mb-3">Recommended Secret Architecture</h3>
        <div className="space-y-2 text-xs text-gray-400">
          <div className="flex gap-2"><span className="text-blue-400 shrink-0">1.</span><span>Create an Azure Key Vault in <strong className="text-white">Canada Central</strong> (data residency).</span></div>
          <div className="flex gap-2"><span className="text-blue-400 shrink-0">2.</span><span>Assign a <strong className="text-white">Managed Identity</strong> to this application. Grant it <code className="text-cyan-400">Key Vault Secrets User</code> RBAC.</span></div>
          <div className="flex gap-2"><span className="text-blue-400 shrink-0">3.</span><span>Store all service credentials as Key Vault secrets. Never in <code className="text-cyan-400">.env</code> files in production.</span></div>
          <div className="flex gap-2"><span className="text-blue-400 shrink-0">4.</span><span>Use <strong className="text-white">Azure App Configuration</strong> with Key Vault references for environment-specific settings.</span></div>
          <div className="flex gap-2"><span className="text-blue-400 shrink-0">5.</span><span>Enable <strong className="text-white">soft-delete</strong> and <strong className="text-white">purge protection</strong> on the Key Vault. Enable diagnostic logging to Sentinel.</span></div>
        </div>
      </div>
    </div>
  );
}
