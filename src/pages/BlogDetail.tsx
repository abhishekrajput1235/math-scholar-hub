import { usePostBySlug, usePosts } from "@/hooks/use-posts";
import { useParams, Link } from "wouter";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { 
  Calendar, Clock, User, Share2, Bookmark, ChevronLeft, Loader2,
  ThumbsUp, MessageCircle, Eye, Twitter, Facebook, Linkedin,
  Copy, Check, ArrowUp, Hash, BookMarked, Lightbulb, AlertCircle,
  TrendingUp, Star, ChevronRight, Download, Printer
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DifficultyBadge } from "@/components/DifficultyBadge";
import { TopicTag } from "@/components/TopicTag";
import { BlogCard } from "@/components/BlogCard";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: post, isLoading, isError } = usePostBySlug(slug!);
  const { data: allPosts } = usePosts();
  
  const [readingProgress, setReadingProgress] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(42);
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      setReadingProgress(Math.min(progress, 100));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Get related posts
  const relatedPosts = allPosts?.filter(
    p => p.id !== post?.id && p.topic === post?.topic
  ).slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(isLiked ? likes - 1 : likes + 1);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground text-lg">Loading article...</p>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 text-center">
        <div className="w-20 h-20 rounded-full bg-destructive/10 flex items-center justify-center mb-6">
          <AlertCircle className="w-10 h-10 text-destructive" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Article not found</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          The article you're looking for doesn't exist or has been removed.
        </p>
        <Link href="/blogs">
          <Button size="lg" className="rounded-full">
            <ChevronLeft className="mr-2 h-4 w-4" />
            Return to Library
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <article className="min-h-screen pb-20 animate-in fade-in duration-500">
      {/* Reading Progress Bar */}
      <div 
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary via-accent to-blue-500 z-50 transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      {/* Floating Action Buttons */}
      <div className="fixed right-6 bottom-6 z-40 flex flex-col gap-3">
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp className="h-5 w-5" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="h-12 w-12 rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className={cn("h-5 w-5", isBookmarked && "fill-current")} />
        </Button>
      </div>

      {/* Header Background */}
      <div className="relative bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-border/50 py-12 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container max-w-4xl mx-auto px-4 relative z-10">
          <Link href="/blogs" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors group">
            <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
            Back to Library
          </Link>
          
          <div className="flex flex-wrap gap-3 mb-6">
            <TopicTag topic={post.topic} />
            <DifficultyBadge level={post.difficulty} />
            <Badge variant="secondary" className="gap-1.5">
              <Eye className="h-3 w-3" />
              2.4K views
            </Badge>
            <Badge variant="secondary" className="gap-1.5">
              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
              4.8
            </Badge>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-foreground mb-8 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground bg-background/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-lg shadow-lg">
                {post.authorName.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-base">{post.authorName}</p>
                <p className="text-xs text-muted-foreground">{post.authorRole}</p>
              </div>
            </div>
            
            <Separator orientation="vertical" className="h-10 hidden md:block" />
            
            <div className="flex items-center gap-1.5">
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
        <div className="lg:col-span-8">
          {/* Key Takeaways */}
          <Card className="mb-12 border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-primary" />
                Key Takeaways
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Understanding core mathematical concepts and their applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Step-by-step problem-solving techniques</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-4 w-4 text-green-500 mt-0.5 shrink-0" />
                  <span>Real-world examples and practical use cases</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <div className="prose prose-lg md:prose-xl prose-slate dark:prose-invert max-w-none prose-headings:font-display prose-headings:font-bold prose-a:text-primary prose-img:rounded-2xl prose-pre:bg-secondary prose-pre:border prose-pre:border-border">
            <ReactMarkdown
              remarkPlugins={[remarkMath]}
              rehypePlugins={[rehypeKatex]}
              components={{
                // Custom components for specific markdown elements
                h2: ({node, ...props}) => <h2 className="scroll-mt-24 text-3xl mt-12 mb-6 flex items-center gap-3 group" {...props} />,
                blockquote: ({node, ...props}) => (
                  <div className="border-l-4 border-primary bg-primary/5 p-6 rounded-r-xl my-8 not-italic">
                    <blockquote {...props} className="border-none p-0 text-lg font-medium text-foreground/80" />
                  </div>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>

          {/* Tags Section */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
              <Hash className="h-4 w-4" />
              Related Topics
            </h3>
            <div className="flex flex-wrap gap-2">
              {[post.topic, post.difficulty, "Mathematics", "Tutorial", "Education"].map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Interaction Bar */}
          <div className="mt-8 pt-8 border-t border-border/50">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
              <div className="flex gap-3">
                <Button 
                  variant={isLiked ? "default" : "outline"}
                  className="gap-2 rounded-full"
                  onClick={handleLike}
                >
                  <ThumbsUp className={cn("h-4 w-4", isLiked && "fill-current")} />
                  {likes}
                </Button>
                <Button variant="outline" className="gap-2 rounded-full">
                  <MessageCircle className="h-4 w-4" />
                  12
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-muted-foreground font-medium mr-2 self-center">Share:</span>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-500 hover:text-white hover:border-blue-500 transition-colors"
                  title="Share on Twitter"
                >
                  <Twitter className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-colors"
                  title="Share on Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-colors"
                  title="Share on LinkedIn"
                >
                  <Linkedin className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="rounded-full"
                  onClick={handleCopyLink}
                  title="Copy link"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>

          {/* Author Card */}
          <Card className="mt-12 border-2 border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold text-2xl shadow-lg shrink-0">
                  {post.authorName.charAt(0)}
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-lg mb-1">{post.authorName}</h4>
                  <p className="text-sm text-muted-foreground mb-3">{post.authorRole}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Passionate about making mathematics accessible and enjoyable for everyone. 
                    Specializing in {post.topic.toLowerCase()} and mathematical pedagogy.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related Articles */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="mt-16">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-display font-bold">Related Articles</h2>
                <Link href="/blogs">
                  <Button variant="ghost" className="gap-2 group">
                    View all
                    <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar (Desktop only) */}
        <div className="hidden lg:block lg:col-span-4">
          <div className="sticky top-24 space-y-6">
            {/* Quick Actions */}
            <Card className="border-2 border-border/50">
              <CardHeader>
                <CardTitle className="text-base">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={() => window.print()}>
                  <Printer className="h-4 w-4" />
                  Print Article
                </Button>
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Download className="h-4 w-4" />
                  Download PDF
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start gap-2"
                  onClick={() => setIsBookmarked(!isBookmarked)}
                >
                  <BookMarked className={cn("h-4 w-4", isBookmarked && "fill-current")} />
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </CardContent>
            </Card>

            {/* Article Stats */}
            <Card className="border-2 border-border/50 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardHeader>
                <CardTitle className="text-base">Article Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Eye className="h-4 w-4" />
                    Views
                  </span>
                  <span className="font-semibold">2,431</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <ThumbsUp className="h-4 w-4" />
                    Likes
                  </span>
                  <span className="font-semibold">{likes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <BookMarked className="h-4 w-4" />
                    Bookmarks
                  </span>
                  <span className="font-semibold">89</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Share2 className="h-4 w-4" />
                    Shares
                  </span>
                  <span className="font-semibold">34</span>
                </div>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="border-2 border-blue-500/20 bg-blue-500/5">
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Lightbulb className="h-4 w-4 text-blue-500" />
                  Pro Tip
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Take notes while reading and try to work through examples on your own before checking the solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
}
