import { WORKFLOWS } from "@/lib/mock-data";
import { Badge } from "@/components/Badge";
import { StatCard } from "@/components/StatCard";

export default function AutomationPage() {
  const running = WORKFLOWS.filter(w => w.status === "Running").length;
  const failed = WORKFLOWS.filter(w => w.status === "Failed").length;
  const totalRuns = WORKFLOWS.reduce((s, w) => s + w.runsThisMonth, 0);
  const success = WORKFLOWS.filter(w => w.status === "Success").length;

  return (
    <div className="space-y-6 max-w-7xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard label="Total Runs / Mo" value={totalRuns} accent="blue" />
        <StatCard label="Running Now" value={running} accent="cyan" />
        <StatCard label="Last Run OK" value={success} sub={`of ${WORKFLOWS.length} workflows`} accent="green" />
        <StatCard label="Failed" value={failed} accent={failed > 0 ? "red" : "green"} />
      </div>

      {/* Workflow Type Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {["Onboarding", "Remediation", "Reporting", "Alerting"].map(type => {
          const wfs = WORKFLOWS.filter(w => w.type === type);
          const runs = wfs.reduce((s, w) => s + w.runsThisMonth, 0);
          return (
            <div key={type} className="rounded-xl border border-[#1e2230] bg-[#13151c] p-5">
              <p className="text-xs uppercase tracking-widest text-gray-500 font-medium mb-1">{type}</p>
              <p className="text-2xl font-bold text-white">{wfs.length}</p>
              <p className="text-xs text-gray-500 mt-1">{runs} runs this month</p>
            </div>
          );
        })}
      </div>

      {/* Workflows Table */}
      <div className="rounded-xl border border-[#1e2230] bg-[#13151c] overflow-hidden">
        <div className="px-5 py-4 border-b border-[#1e2230] flex items-center justify-between">
          <h3 className="text-sm font-semibold text-white">AI & Automation Workflows</h3>
          <span className="text-xs text-gray-500">Azure Logic Apps · Functions · Copilot Studio (mocked)</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[#1e2230]">
                {["Workflow", "Type", "Trigger", "Last Run", "Runs/Mo", "Status"].map(h => (
                  <th key={h} className="text-left px-5 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {WORKFLOWS.map((w, i) => (
                <tr key={w.id} className={`border-b border-[#1e2230]/50 hover:bg-[#1e2230]/30 transition-colors ${i % 2 === 0 ? "" : "bg-white/[0.01]"}`}>
                  <td className="px-5 py-3 text-white font-medium whitespace-nowrap">{w.name}</td>
                  <td className="px-5 py-3">
                    <Badge variant={w.type === "Remediation" ? "warning" : w.type === "Alerting" ? "danger" : w.type === "Onboarding" ? "info" : "neutral"}>
                      {w.type}
                    </Badge>
                  </td>
                  <td className="px-5 py-3 text-gray-400 text-xs max-w-xs truncate">{w.trigger}</td>
                  <td className="px-5 py-3 text-gray-400 text-xs whitespace-nowrap">
                    {new Date(w.lastRun).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })}
                  </td>
                  <td className="px-5 py-3 text-gray-300 text-center">{w.runsThisMonth}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-1.5">
                      {w.status === "Running" && <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />}
                      <Badge variant={w.status === "Success" ? "success" : w.status === "Failed" ? "danger" : w.status === "Running" ? "info" : "neutral"}>
                        {w.status}
                      </Badge>
                    </div>
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
