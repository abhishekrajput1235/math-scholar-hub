import { usePosts } from "@/hooks/use-posts";
import { BlogCard } from "@/components/BlogCard";
import { SubscriptionBox } from "@/components/SubscriptionBox";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ArrowRight, Sparkles, Sigma, Pi, Calculator, TrendingUp } from "lucide-react";

export default function Home() {
  const { data: posts, isLoading } = usePosts();
  
  // Get featured posts (just taking first 3 for now)
  const featuredPosts = posts?.slice(0, 3);
  
  const topics = [
    { name: "Algebra", icon: Sigma, color: "text-blue-500", bg: "bg-blue-500/10" },
    { name: "Calculus", icon: TrendingUp, color: "text-green-500", bg: "bg-green-500/10" },
    { name: "Geometry", icon: Pi, color: "text-purple-500", bg: "bg-purple-500/10" },
    { name: "Number Theory", icon: Calculator, color: "text-orange-500", bg: "bg-orange-500/10" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Abstract shapes/background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none z-[-1]">
          <div className="absolute top-20 right-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob" />
          <div className="absolute top-40 left-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-2000" />
          <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl mix-blend-multiply opacity-70 animate-blob animation-delay-4000" />
        </div>

        <div className="container mx-auto px-4 text-center max-w-4xl">
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-6">
            <Sparkles className="mr-2 h-3.5 w-3.5" />
            New: Interactive Graph Theory Visualizer
          </div>
          
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight text-foreground mb-8 leading-[1.1]">
            Explore Mathematics, <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
              One Concept at a Time
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto leading-relaxed">
            Dive deep into the beauty of numbers. From foundational algebra to complex calculus, 
            discover clear explanations and intuitive examples.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/blogs">
              <Button size="lg" className="h-14 px-8 rounded-full text-lg shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all hover:-translate-y-1">
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/topics">
              <Button variant="outline" size="lg" className="h-14 px-8 rounded-full text-lg border-2 bg-background/50 backdrop-blur-sm hover:bg-background">
                Explore Topics
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="py-20 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-display font-bold mb-4">Browse by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Find exactly what you're looking for by exploring our core mathematical disciplines.</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {topics.map((topic) => (
              <Link key={topic.name} href={`/blogs?topic=${topic.name}`}>
                <div className="group bg-card hover:bg-card/80 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer">
                  <div className={`w-14 h-14 rounded-xl ${topic.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <topic.icon className={`h-7 w-7 ${topic.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{topic.name}</h3>
                  <p className="text-sm text-muted-foreground">Explore articles & tutorials</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-display font-bold mb-2">Featured Articles</h2>
              <p className="text-muted-foreground">Hand-picked guides and theorems for you.</p>
            </div>
            <Link href="/blogs">
              <Button variant="ghost" className="hidden sm:flex text-primary hover:text-primary hover:bg-primary/10">
                View all articles <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-96 bg-muted animate-pulse rounded-2xl" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts?.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
              {(!featuredPosts || featuredPosts.length === 0) && (
                <div className="col-span-3 text-center py-12 text-muted-foreground bg-muted/20 rounded-2xl border border-dashed border-border">
                  No posts found. Seed the database to see content here.
                </div>
              )}
            </div>
          )}
          
          <div className="mt-8 text-center sm:hidden">
            <Link href="/blogs">
              <Button variant="outline" className="w-full">View all articles</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 container mx-auto px-4">
        <SubscriptionBox />
      </section>
    </div>
  );
}
