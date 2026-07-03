import { TENANTS, SECURITY_ALERTS, COMPLIANCE_CONTROLS, WORKFLOWS, SECURE_SCORE_TREND, PAL_ENTRIES } from "@/lib/mock-data";
import { StatCard } from "@/components/StatCard";
import { Badge } from "@/components/Badge";
import Link from "next/link";

export default function DashboardPage() {
  const activeAlerts = SECURITY_ALERTS.filter(a => a.status !== "Resolved");
  const criticalAlerts = SECURITY_ALERTS.filter(a => a.severity === "Critical");
  const avgSecureScore = Math.round(TENANTS.reduce((s, t) => s + t.secureScore, 0) / TENANTS.length);
  const activeTenants = TENANTS.filter(t => t.status === "Active").length;
  const palMissing = PAL_ENTRIES.filter(p => p.palStatus === "Missing").length;
  const compliant = COMPLIANCE_CONTROLS.filter(c => c.status === "Compliant").length;
  const totalControls = COMPLIANCE_CONTROLS.length;
  const totalRevenue = PAL_ENTRIES.reduce((sum, p) => {
    const n = parseFloat(p.revenue.replace(/[^0-9.]/g, ""));
    return sum + n;
  }, 0);

  const recentAlerts = activeAlerts.slice(0, 4);

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard label="Active Tenants" value={activeTenants} sub={`of ${TENANTS.length} total`} accent="blue" />
        <StatCard label="Avg Secure Score" value={`${avgSecureScore}%`} trend="up" trendValue="+3 this month" accent="cyan" />
        <StatCard label="Active Alerts" value={activeAlerts.length} sub={`${criticalAlerts.length} critical`} accent={criticalAlerts.length > 0 ? "red" : "green"} />
        <StatCard label="Compliance" value={`${Math.round((compliant / totalControls) * 100)}%`} sub={`${compliant}/${totalControls} controls`} accent="green" />
        <StatCard label="Monthly ACR" value={`$${Math.round(totalRevenue / 1000)}K`} trend="up" trendValue="12% MoM" accent="purple" />
        <StatCard label="PAL Gaps" value={palMissing} sub="Need association" accent={palMissing > 0 ? "amber" : "green"} />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Secure Score Trend */}
        <div className="xl:col-span-1 rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Avg Secure Score Trend</h3>
          <div className="flex items-end gap-2 h-28">
            {SECURE_SCORE_TREND.map((d) => (
              <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-400">{d.score}</span>
                <div
                  className="w-full rounded-t bg-gradient-to-t from-blue-600 to-cyan-400"
                  style={{ height: `${(d.score / 100) * 96}px` }}
                />
                <span className="text-[10px] text-gray-500">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Active Alerts */}
        <div className="xl:col-span-2 rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Active Security Alerts</h3>
            <Link href="/security" className="text-xs text-blue-400 hover:text-blue-300">View all →</Link>
          </div>
          <div className="space-y-2.5">
            {recentAlerts.map(a => (
              <div key={a.id} className="flex items-center gap-3 bg-[#0f1117] rounded-lg p-3">
                <Badge variant={a.severity === "Critical" ? "danger" : a.severity === "High" ? "warning" : "info"}>
                  {a.severity}
                </Badge>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{a.title}</p>
                  <p className="text-xs text-gray-500">{a.tenant}</p>
                </div>
                <Badge variant={a.status === "In Progress" ? "info" : "warning"}>{a.status}</Badge>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Tenant Overview */}
        <div className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Customer Tenants</h3>
            <Link href="/tenants" className="text-xs text-blue-400 hover:text-blue-300">Manage →</Link>
          </div>
          <div className="space-y-2">
            {TENANTS.slice(0, 5).map(t => (
              <div key={t.id} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500/30 to-cyan-500/30 flex items-center justify-center text-xs font-bold text-blue-300">
                  {t.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white truncate">{t.name}</p>
                  <p className="text-xs text-gray-500">{t.industry}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-white">{t.secureScore}%</p>
                  <p className="text-[10px] text-gray-500">Score</p>
                </div>
                <Badge variant={t.status === "Active" ? "success" : t.status === "Onboarding" ? "info" : "warning"}>
                  {t.status}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Compliance Summary */}
        <div className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-white">Compliance Frameworks</h3>
            <Link href="/compliance" className="text-xs text-blue-400 hover:text-blue-300">View →</Link>
          </div>
          {["PIPEDA", "SOC 2", "ISO 27001", "NIST CSF"].map(fw => {
            const controls = COMPLIANCE_CONTROLS.filter(c => c.framework === fw);
            const passed = controls.filter(c => c.status === "Compliant").length;
            const pct = Math.round((passed / controls.length) * 100);
            return (
              <div key={fw} className="mb-3">
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-gray-300">{fw}</span>
                  <span className="text-gray-400">{passed}/{controls.length} controls</span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#1e2230]">
                  <div
                    className={`h-2 rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
