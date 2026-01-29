import { Post } from "@/lib/types";
import { Link } from "wouter";
import { Clock, ArrowRight } from "lucide-react";
import { DifficultyBadge } from "./DifficultyBadge";
import { TopicTag } from "./TopicTag";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface BlogCardProps {
  post: Post;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all duration-300 border-border/50 hover:shadow-xl hover:border-primary/20 hover:-translate-y-1 group bg-card">
      {/* Optional Cover Image Area - could be added if schema supports it, strictly following schema now though */}
      <div className="h-2 w-full bg-gradient-to-r from-primary to-accent opacity-70 group-hover:opacity-100 transition-opacity" />

      <CardHeader className="pb-3 pt-6 px-6">
        <div className="flex justify-between items-start mb-3">
          <TopicTag topic={post.topic} />
          <DifficultyBadge level={post.difficulty} />
        </div>
        <Link href={`/blog/${post.slug}`}>
          <h3 className="text-xl md:text-2xl font-bold font-display leading-tight text-foreground hover:text-primary transition-colors cursor-pointer">
            {post.title}
          </h3>
        </Link>
      </CardHeader>

      <CardContent className="flex-grow px-6 pb-2">
        <p className="text-muted-foreground line-clamp-3 leading-relaxed">
          {post.summary}
        </p>
      </CardContent>

      <CardFooter className="px-6 py-6 border-t border-border/30 bg-muted/20 flex items-center justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-1.5" />
          <span>{post.readTime} min read</span>
        </div>

        <Link href={`/blog/${post.slug}`}>
          <Button variant="ghost" size="sm" className="group/btn pl-0 hover:bg-transparent hover:text-primary">
            Read Article
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
