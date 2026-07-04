import { SECURITY_ALERTS, SECURE_SCORE_TREND, TENANTS } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

export default function SecurityPage() {
  const critical = SECURITY_ALERTS.filter(a => a.severity === "Critical").length;
  const high = SECURITY_ALERTS.filter(a => a.severity === "High").length;
  const active = SECURITY_ALERTS.filter(a => a.status === "Active").length;
  const latestScore = SECURE_SCORE_TREND[SECURE_SCORE_TREND.length - 1].score;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Avg Secure Score" value={`${latestScore}%`} trend="up" trendValue="+2 pts" accent="cyan" />
        <StatCard label="Critical Alerts" value={critical} accent="red" />
        <StatCard label="High Alerts" value={high} accent="amber" />
        <StatCard label="Active / Open" value={active} sub={`of ${SECURITY_ALERTS.length} total`} accent="blue" />
      </div>

      {/* Per-Tenant Scores */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Secure Score by Tenant</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3">
          {TENANTS.filter(t => t.status === "Active").map(t => (
            <div key={t.id} className="bg-[#0f1117] rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs text-white font-medium truncate">{t.name}</p>
                <span className={`text-xs font-bold ${t.secureScore >= 80 ? "text-emerald-400" : t.secureScore >= 65 ? "text-amber-400" : "text-red-400"}`}>
                  {t.secureScore}%
                </span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1e2230]">
                <div
                  className={`h-2 rounded-full transition-all ${t.secureScore >= 80 ? "bg-emerald-500" : t.secureScore >= 65 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${t.secureScore}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Alerts Table */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Security Alerts</h3>
          <span className="text-xs text-gray-500">Sourced from Microsoft Defender · Sentinel</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Severity", "Alert", "Category", "Tenant", "Detected", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {SECURITY_ALERTS.map((a, i) => (
                <tr key={a.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3">
                    <Badge variant={a.severity === "Critical" ? "danger" : a.severity === "High" ? "warning" : a.severity === "Medium" ? "info" : "neutral"}>
                      {a.severity}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-white font-medium">{a.title}</td>
                  <td className="px-5 py-3">
                    <Badge variant="neutral">{a.category}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400">{a.tenant}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(a.detectedAt).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={a.status === "Resolved" ? "success" : a.status === "In Progress" ? "info" : "warning"}>
                      {a.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
