interface BadgeProps {
  children: React.ReactNode;
  variant: "success" | "warning" | "danger" | "info" | "neutral" | "purple";
}

const VARIANTS = {
  success: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  warning: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
  danger: "bg-red-500/10 text-red-400 border border-red-500/20",
  info: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  neutral: "bg-gray-500/10 text-gray-400 border border-gray-500/20",
  purple: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
};

export function Badge({ children, variant }: BadgeProps) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${VARIANTS[variant]}`}>
      {children}
    </span>
  );
}
