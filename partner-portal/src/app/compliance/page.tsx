import { COMPLIANCE_CONTROLS } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

const FRAMEWORKS = ["PIPEDA", "SOC 2", "ISO 27001", "NIST CSF"];

export default function CompliancePage() {
  const compliant = COMPLIANCE_CONTROLS.filter(c => c.status === "Compliant").length;
  const partial = COMPLIANCE_CONTROLS.filter(c => c.status === "Partial").length;
  const nonCompliant = COMPLIANCE_CONTROLS.filter(c => c.status === "Non-Compliant").length;
  const overallPct = Math.round((compliant / COMPLIANCE_CONTROLS.length) * 100);

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Overall Compliance" value={`${overallPct}%`} trend="up" trendValue="+5% QoQ" accent="green" />
        <StatCard label="Compliant" value={compliant} accent="green" />
        <StatCard label="Partial" value={partial} accent="amber" />
        <StatCard label="Non-Compliant" value={nonCompliant} accent="red" />
      </div>

      {/* Framework Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {FRAMEWORKS.map(fw => {
          const controls = COMPLIANCE_CONTROLS.filter(c => c.framework === fw);
          const passed = controls.filter(c => c.status === "Compliant").length;
          const pct = Math.round((passed / controls.length) * 100);
          return (
            <div key={fw} className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs uppercase tracking-widest text-gray-500 font-medium">{fw}</p>
                <span className={`text-lg font-bold ${pct >= 80 ? "text-emerald-400" : pct >= 60 ? "text-amber-400" : "text-red-400"}`}>{pct}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-[#1e2230] mb-3">
                <div className={`h-2 rounded-full ${pct >= 80 ? "bg-emerald-500" : pct >= 60 ? "bg-amber-500" : "bg-red-500"}`} style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-gray-500">{passed} of {controls.length} controls compliant</p>
            </div>
          );
        })}
      </div>

      {/* Controls Table */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230]">
          <h3 className="text-sm font-semibold text-white">Control Register</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Control", "Framework", "Status", "Owner", "Last Review", "Evidence"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {COMPLIANCE_CONTROLS.map((c, i) => (
                <tr key={c.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3 text-white font-medium">{c.control}</td>
                  <td className="px-5 py-3"><Badge variant="info">{c.framework}</Badge></td>
                  <td className="px-5 py-3">
                    <Badge variant={c.status === "Compliant" ? "success" : c.status === "Partial" ? "warning" : c.status === "Non-Compliant" ? "danger" : "neutral"}>
                      {c.status}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{c.owner}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">{c.lastReview}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{c.evidence}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
