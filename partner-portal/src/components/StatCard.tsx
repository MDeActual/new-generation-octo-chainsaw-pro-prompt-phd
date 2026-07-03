interface StatCardProps {
  label: string;
  value: string | number;
  sub?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
  accent?: "blue" | "green" | "amber" | "red" | "purple" | "cyan";
}

const ACCENT_MAP = {
  blue: "text-blue-400 bg-blue-500/10 border-blue-500/20",
  green: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20",
  amber: "text-amber-400 bg-amber-500/10 border-amber-500/20",
  red: "text-red-400 bg-red-500/10 border-red-500/20",
  purple: "text-purple-400 bg-purple-500/10 border-purple-500/20",
  cyan: "text-cyan-400 bg-cyan-500/10 border-cyan-500/20",
};

export function StatCard({ label, value, sub, trend, trendValue, accent = "blue" }: StatCardProps) {
  return (
    <div className={`rounded-xl border p-5 ${ACCENT_MAP[accent]}`}>
      <p className="text-xs uppercase tracking-widest opacity-70 font-medium mb-3">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
      {(sub || trendValue) && (
        <div className="flex items-center gap-2 mt-2">
          {sub && <p className="text-xs opacity-60">{sub}</p>}
          {trendValue && trend && (
            <span className={`text-xs font-medium ${trend === "up" ? "text-emerald-400" : trend === "down" ? "text-red-400" : "text-gray-400"}`}>
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
