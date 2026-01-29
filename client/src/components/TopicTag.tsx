import { Link } from "wouter";
import { cn } from "@/lib/utils";

interface TopicTagProps {
  topic: string;
  className?: string;
}

export function TopicTag({ topic, className }: TopicTagProps) {
  return (
    <Link 
      href={`/topics/${topic}`}
      className={cn(
        "inline-flex items-center text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:underline decoration-primary/30 underline-offset-4",
        className
      )}
    >
      #{topic}
    </Link>
  );
}
