import { usePosts } from "@/hooks/use-posts";
import { BlogCard } from "@/components/BlogCard";
import { SubscriptionBox } from "@/components/SubscriptionBox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  ArrowRight, Sparkles, Sigma, Pi, Calculator, TrendingUp,
  BookOpen, Users, Trophy, Zap, Target, Brain, Lightbulb,
  ChevronRight, Star, Award, CheckCircle2, Clock, BarChart3
} from "lucide-react";

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

  const stats = [
    { label: "Total Articles", value: "150+", icon: BookOpen, color: "text-blue-500" },
    { label: "Active Learners", value: "10K+", icon: Users, color: "text-green-500" },
    { label: "Topics Covered", value: "25+", icon: Target, color: "text-purple-500" },
    { label: "Success Rate", value: "95%", icon: Trophy, color: "text-orange-500" },
  ];

  const features = [
    {
      icon: Brain,
      title: "Deep Understanding",
      description: "Move beyond memorization. Our content focuses on building intuition and true mathematical understanding.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Zap,
      title: "Interactive Examples",
      description: "Learn by doing with interactive visualizations and step-by-step problem walkthroughs.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Target,
      title: "Structured Paths",
      description: "Follow curated learning paths designed to take you from beginner to advanced levels.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    },
    {
      icon: Award,
      title: "Track Progress",
      description: "Monitor your learning journey with achievement badges and comprehensive progress tracking.",
      color: "text-purple-500",
      bg: "bg-purple-500/10"
    }
  ];

  const learningPaths = [
    {
      title: "Foundations",
      level: "Beginner",
      topics: ["Basic Algebra", "Pre-Calculus", "Logic"],
      duration: "4 weeks",
      color: "border-blue-500/50 bg-blue-500/5"
    },
    {
      title: "Core Mathematics",
      level: "Intermediate",
      topics: ["Calculus I & II", "Linear Algebra", "Discrete Math"],
      duration: "8 weeks",
      color: "border-purple-500/50 bg-purple-500/5"
    },
    {
      title: "Advanced Concepts",
      level: "Advanced",
      topics: ["Real Analysis", "Abstract Algebra", "Topology"],
      duration: "12 weeks",
      color: "border-orange-500/50 bg-orange-500/5"
    }
  ];

  const testimonials = [
    {
      quote: "This platform transformed my understanding of calculus. The visual explanations are phenomenal!",
      author: "Sarah Chen",
      role: "Computer Science Student",
      rating: 5
    },
    {
      quote: "Finally, a resource that explains complex topics in a way that actually makes sense. Highly recommended!",
      author: "Michael Rodriguez",
      role: "Engineering Graduate",
      rating: 5
    },
    {
      quote: "The structured learning paths helped me fill gaps in my mathematical foundation. Game changer!",
      author: "Emily Thompson",
      role: "Data Science Professional",
      rating: 5
    }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
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

      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-blue-500/5 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-background shadow-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                </div>
                <div className="text-4xl font-bold mb-2 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
              </div>
            ))}
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

      {/* Features Section */}
      <section className="py-24 bg-gradient-to-b from-background to-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Lightbulb className="mr-1 h-3 w-3" />
              Why Choose Us
            </Badge>
            <h2 className="text-4xl font-display font-bold mb-4">Learn Smarter, Not Harder</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Experience a revolutionary approach to mathematical education designed for the modern learner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={feature.title}
                className="border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${feature.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`h-7 w-7 ${feature.color}`} />
                  </div>
                  <CardTitle className="text-xl group-hover:text-primary transition-colors">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
              <BarChart3 className="mr-1 h-3 w-3" />
              Structured Learning
            </Badge>
            <h2 className="text-4xl font-display font-bold mb-4">Your Journey to Mastery</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose a path that matches your level and follow a curriculum designed by experts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {learningPaths.map((path, index) => (
              <Card 
                key={path.title}
                className={`border-2 ${path.color} hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group`}
              >
                <CardHeader>
                  <div className="flex items-center justify-between mb-3">
                    <Badge variant="secondary" className="text-xs">
                      {path.level}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      {path.duration}
                    </div>
                  </div>
                  <CardTitle className="text-2xl mb-2 group-hover:text-primary transition-colors">
                    {path.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 mb-6">
                    {path.topics.map((topic, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle2 className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                        <span className="text-muted-foreground">{topic}</span>
                      </div>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Start Path
                    <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-green-500/30 text-green-600">
              <Star className="mr-1 h-3 w-3 fill-current" />
              Testimonials
            </Badge>
            <h2 className="text-4xl font-display font-bold mb-4">Loved by Learners Worldwide</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              See what our community has to say about their learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <CardDescription className="text-base leading-relaxed text-foreground/80 italic">
                    "{testimonial.quote}"
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="pt-4 border-t border-border/50">
                    <div className="font-semibold text-sm">{testimonial.author}</div>
                    <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-blue-500 opacity-90" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center rounded-full bg-white/20 backdrop-blur-sm px-4 py-2 text-sm font-medium text-white mb-6">
              <Zap className="mr-2 h-4 w-4" />
              Join 10,000+ learners today
            </div>
            
            <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Ready to Transform Your <br className="hidden sm:block" />
              Mathematical Journey?
            </h2>
            
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto leading-relaxed">
              Start learning today with free access to our comprehensive library of tutorials, 
              interactive examples, and expert-crafted content.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/blogs">
                <Button 
                  size="lg" 
                  className="h-14 px-10 rounded-full text-lg bg-white text-primary hover:bg-white/90 shadow-2xl hover:shadow-white/20 hover:-translate-y-1 transition-all"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  variant="outline" 
                  size="lg" 
                  className="h-14 px-10 rounded-full text-lg border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap justify-center items-center gap-8 text-white/80 text-sm">
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                No credit card required
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Instant access
              </div>
              <div className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2" />
                Cancel anytime
              </div>
            </div>
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
