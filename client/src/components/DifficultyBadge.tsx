import { cn } from "@/lib/utils";

type Difficulty = "Beginner" | "Intermediate" | "Advanced" | string;

interface DifficultyBadgeProps {
  level: Difficulty;
  className?: string;
}

export function DifficultyBadge({ level, className }: DifficultyBadgeProps) {
  const styles = {
    Beginner: "bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/30 dark:text-emerald-300 dark:border-emerald-800",
    Intermediate: "bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800",
    Advanced: "bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-800",
  };

  const defaultStyle = "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700";
  
  const badgeStyle = styles[level as keyof typeof styles] || defaultStyle;

  return (
    <span className={cn(
      "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border shadow-sm",
      badgeStyle,
      className
    )}>
      {level}
    </span>
  );
}
