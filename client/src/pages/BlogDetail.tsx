import { usePostBySlug } from "@/hooks/use-posts";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Calendar, Clock, User, Share2, Bookmark, ChevronLeft, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { TopicTag } from "@/components/TopicTag";
import { format } from "date-fns";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePostBySlug(slug!);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <h2 className="text-2xl font-bold mb-4">Article not found</h2>
        <Link href="/blogs">
          <Button>Return to Library</Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-20">
      {/* Header Background */}
      <div className="bg-muted/30 border-b border-border/50 py-12 md:py-20">
        <div className="container max-w-4xl mx-auto px-4">
          <Link href="/blogs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ChevronLeft className="w-4 h-4 mr-1" />
            Back to Library
          </Link>
          
          <div className="flex gap-3 mb-6">
            <TopicTag topic={post.topic} />
            <DifficultyBadge level={post.difficulty} />
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground border-t border-border/50 pt-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-foreground">{post.authorName}</p>
                <p className="text-xs">{post.authorRole}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-1.5 ml-auto md:ml-0">
              <Calendar className="w-4 h-4" />
              <time>{post.createdAt ? format(new Date(post.createdAt), 'MMM d, yyyy') : 'Recently'}</time>
            </div>
            
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 pt-12 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-8 lg:col-start-2">
          <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-pre:bg-secondary prose-pre:border prose-pre:border-border">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                // Custom components for specific markdown elements
                h2: ({node, ...props}) => <h2 className="scroll-mt-24 text-3xl mt-12 mb-6" {...props} />,
                blockquote: ({node, ...props}) => (
                  <div className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-lg my-8 not-italic">
                    <blockquote {...props} className="border-none p-0 text-lg font-medium text-foreground/80" />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Interaction Bar */}
          <div className="mt-16 pt-8 border-t border-border flex justify-between items-center">
             <div className="flex gap-2">
               <span className="text-sm text-muted-foreground font-medium mr-2 self-center">Share:</span>
               <Button variant="outline" size="icon" className="rounded-full">
                 <Share2 className="w-4 h-4" />
               </Button>
               <Button variant="outline" size="icon" className="rounded-full">
                 <Bookmark className="w-4 h-4" />
               </Button>
             </div>
          </div>
        </div>

        {/* Sidebar (Desktop only) */}
        {/* <div className="hidden lg:block lg:col-span-3">
           <div className="sticky top-24 space-y-8">
             <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                <h4 className="font-bold mb-4">Table of Contents</h4>
                <nav className="space-y-2 text-sm text-muted-foreground">
                  // This would need a TOC generator based on markdown headers
                  <p className="italic text-xs">Sections will appear here</p>
                </nav>
             </div>
           </div>
        </div> */}
      </div>
    </article>
  );
}
