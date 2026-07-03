import { TENANTS } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

export default function TenantsPage() {
  const active = TENANTS.filter(t => t.status === "Active").length;
  const onboarding = TENANTS.filter(t => t.status === "Onboarding").length;
  const delegated = TENANTS.filter(t => t.lighthouse === "Delegated").length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Tenants" value={TENANTS.length} accent="blue" />
        <StatCard label="Active" value={active} accent="green" />
        <StatCard label="Onboarding" value={onboarding} accent="cyan" />
        <StatCard label="Lighthouse Delegated" value={delegated} sub={`of ${TENANTS.length}`} accent="purple" />
      </div>

      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Customer Tenants</h3>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition-colors">
            + Onboard Tenant
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Tenant", "Domain", "Industry", "Lighthouse", "Secure Score", "Compliance", "Status", "CSM"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TENANTS.map((t, i) => (
                <tr key={t.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center text-xs font-bold text-blue-300 shrink-0">
                        {t.name.charAt(0)}
                      </div>
                      <span className="text-white font-medium whitespace-nowrap">{t.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs">{t.domain}</td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{t.industry}</td>
                  <td className="px-5 py-3">
                    <Badge variant={t.lighthouse === "Delegated" ? "success" : t.lighthouse === "Pending" ? "warning" : "danger"}>
                      {t.lighthouse}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#1e2230]">
                        <div
                          className={`h-1.5 rounded-full ${t.secureScore >= 80 ? "bg-emerald-500" : t.secureScore >= 65 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${t.secureScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{t.secureScore}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-[#1e2230]">
                        <div
                          className={`h-1.5 rounded-full ${t.complianceScore >= 80 ? "bg-emerald-500" : t.complianceScore >= 65 ? "bg-amber-500" : "bg-red-500"}`}
                          style={{ width: `${t.complianceScore}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-400">{t.complianceScore}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={t.status === "Active" ? "success" : t.status === "Onboarding" ? "info" : t.status === "Offboarding" ? "warning" : "danger"}>
                      {t.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{t.csm}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
