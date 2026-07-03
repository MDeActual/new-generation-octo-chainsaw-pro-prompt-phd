import { PAL_ENTRIES, PARTNER_INFO } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

export default function PartnerOpsPage() {
  const activePal = PAL_ENTRIES.filter(p => p.palStatus === "Active").length;
  const missingPal = PAL_ENTRIES.filter(p => p.palStatus === "Missing").length;
  const totalRevenue = PAL_ENTRIES.reduce((sum, p) => sum + parseFloat(p.revenue.replace(/[^0-9.]/g, "")), 0);
  const dporActive = PAL_ENTRIES.filter(p => p.dporStatus === "Active").length;

  return (
    <div className="space-y-6 max-w-7xl">
      {/* Partner Identity */}
      <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 p-5 flex flex-wrap gap-6 items-center">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white font-bold text-xl">N</div>
        <div>
          <p className="text-white font-bold text-lg">{PARTNER_INFO.name}</p>
          <p className="text-gray-400 text-sm">MPN ID: {PARTNER_INFO.mpnId} · {PARTNER_INFO.tier}</p>
          <p className="text-gray-500 text-xs mt-0.5">{PARTNER_INFO.csrp} · ISV · MSSP · {PARTNER_INFO.region}</p>
        </div>
        <div className="ml-auto flex gap-2 flex-wrap">
          <Badge variant="success">Solutions Partner</Badge>
          <Badge variant="info">Indirect CSP</Badge>
          <Badge variant="purple">MSSP</Badge>
          <Badge variant="neutral">ISV</Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="PAL Active" value={activePal} sub={`of ${PAL_ENTRIES.length}`} accent="green" />
        <StatCard label="PAL Missing" value={missingPal} accent={missingPal > 0 ? "red" : "green"} />
        <StatCard label="DPOR Active" value={dporActive} accent="cyan" />
        <StatCard label="Monthly ACR" value={`$${Math.round(totalRevenue / 1000)}K`} trend="up" trendValue="12% MoM" accent="purple" />
      </div>

      {/* PAL / DPOR Table */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">PAL & DPOR Association Status</h3>
          <span className="text-xs text-gray-500">via Partner Center API (mocked)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Tenant", "Subscription ID", "PAL Status", "DPOR Status", "Monthly Revenue", "Workloads"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PAL_ENTRIES.map((p, i) => (
                <tr key={p.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{p.tenant}</td>
                  <td className="px-5 py-3 text-gray-400 font-mono text-xs">{p.subscriptionId}</td>
                  <td className="px-5 py-3">
                    <Badge variant={p.palStatus === "Active" ? "success" : p.palStatus === "Pending" ? "warning" : "danger"}>
                      {p.palStatus}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={p.dporStatus === "Active" ? "success" : "neutral"}>
                      {p.dporStatus}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-emerald-400 font-medium">{p.revenue}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{p.workload}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* CSP Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Partner Center", desc: "Manage subscriptions, customers, and billing. PAL associations are tracked and automated via runbook.", status: "Connected (Demo)", icon: "🏪" },
          { title: "Azure Lighthouse", desc: "Delegated admin access to customer subscriptions with full auditability and bounded scope.", status: "Configured (Demo)", icon: "🔭" },
          { title: "Microsoft Graph", desc: "M365 and Entra ID operations across customer tenants. Used for identity governance and reporting.", status: "Configured (Demo)", icon: "🕸️" },
        ].map(item => (
          <div key={item.title} className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{item.icon}</span>
              <h4 className="text-sm font-semibold text-white">{item.title}</h4>
            </div>
            <p className="text-xs text-gray-400 mb-3">{item.desc}</p>
            <Badge variant="success">{item.status}</Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
