import { ADMIN_ROLES } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

export default function IdentityPage() {
  const jit = ADMIN_ROLES.filter(u => u.accessType === "JIT (PIM)").length;
  const permanent = ADMIN_ROLES.filter(u => u.accessType === "Permanent").length;
  const breakGlass = ADMIN_ROLES.filter(u => u.accessType === "Break-Glass").length;
  const mfaEnabled = ADMIN_ROLES.filter(u => u.mfaStatus === "Enabled").length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="JIT / PIM Accounts" value={jit} accent="green" />
        <StatCard label="Permanent Admin" value={permanent} accent="amber" />
        <StatCard label="Break-Glass" value={breakGlass} accent="red" />
        <StatCard label="MFA Enabled" value={`${mfaEnabled}/${ADMIN_ROLES.length}`} accent="cyan" />
      </div>

      {/* Zero Trust Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { title: "Conditional Access", status: "Enabled", desc: "All admin accounts require compliant devices and strong MFA. Legacy auth blocked tenant-wide.", icon: "🔒" },
          { title: "Privileged Identity Management", status: "Active", desc: "Just-in-time activation with approval workflows. No standing Global Admin access.", icon: "⏱️" },
          { title: "Identity Protection", status: "Monitoring", desc: "Risk-based sign-in policies active. Impossible travel and anomalous token detections enabled.", icon: "👁️" },
        ].map(p => (
          <div key={p.title} className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xl">{p.icon}</span>
              <h4 className="text-sm font-semibold text-white">{p.title}</h4>
            </div>
            <p className="text-xs text-gray-400 mb-3">{p.desc}</p>
            <Badge variant="success">{p.status}</Badge>
          </div>
        ))}
      </div>

      {/* Admin Accounts Table */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">Privileged Accounts</h3>
          <span className="text-xs text-gray-500">Entra ID · PIM (mocked)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Account", "Role", "Access Type", "MFA", "Scope", "Last Sign-In"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ADMIN_ROLES.map((u, i) => (
                <tr key={u.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 flex items-center justify-center text-xs font-bold text-purple-300 shrink-0">
                        {u.displayName.charAt(0)}
                      </div>
                      <div>
                        <p className="text-white font-medium text-xs">{u.displayName}</p>
                        <p className="text-gray-500 text-[11px]">{u.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={u.role === "Global Admin" ? "danger" : u.role === "Security Admin" ? "warning" : "info"}>
                      {u.role}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={u.accessType === "JIT (PIM)" ? "success" : u.accessType === "Break-Glass" ? "danger" : "warning"}>
                      {u.accessType}
                    </Badge>
                  </td>
                  <td className="px-5 py-3">
                    <Badge variant={u.mfaStatus === "Enabled" ? "success" : "danger"}>{u.mfaStatus}</Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs">{u.tenant}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(u.lastSignIn).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}
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
