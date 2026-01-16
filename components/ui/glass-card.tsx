import { cn } from "@/lib/utils/cn"; // Assuming you have a utility for cn, or just use clsx

export const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div
    className={cn(
      "bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-xl",
      "hover:bg-white/10 transition-all duration-300",
      className
    )}
  >
    {children}
  </div>
);