import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Sigma, TrendingUp, Pi, Calculator, Shapes, Binary, BarChart3, FunctionSquare,
  Search, ArrowRight, BookOpen, Clock, TrendingUpIcon, Sparkles, Filter,
  ChevronRight, Star, Infinity, Network, GitBranch
} from "lucide-react";
import { useState } from "react";

export default function Topics() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const topics = [
    { 
      name: "Algebra", 
      description: "Equations, structures, and symmetries.",
      icon: Sigma, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      borderColor: "border-blue-500/20",
      count: 12,
      level: "beginner",
      difficulty: "Easy to Medium",
      estimatedTime: "2-3 months",
      prerequisites: ["Basic arithmetic"]
    },
    { 
      name: "Calculus", 
      description: "Limits, derivatives, integrals, and series.",
      icon: TrendingUp, 
      color: "text-green-500", 
      bg: "bg-green-500/10",
      borderColor: "border-green-500/20",
      count: 8,
      level: "intermediate",
      difficulty: "Medium to Hard",
      estimatedTime: "4-6 months",
      prerequisites: ["Algebra", "Trigonometry"]
    },
    { 
      name: "Geometry", 
      description: "Shapes, sizes, relative positions, and space.",
      icon: Shapes, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      borderColor: "border-purple-500/20",
      count: 5,
      level: "beginner",
      difficulty: "Easy to Medium",
      estimatedTime: "2-3 months",
      prerequisites: ["Basic arithmetic"]
    },
    { 
      name: "Number Theory", 
      description: "Properties of integers and prime numbers.",
      icon: Calculator, 
      color: "text-orange-500", 
      bg: "bg-orange-500/10",
      borderColor: "border-orange-500/20",
      count: 7,
      level: "intermediate",
      difficulty: "Medium",
      estimatedTime: "3-4 months",
      prerequisites: ["Algebra"]
    },
    { 
      name: "Probability", 
      description: "Analysis of random phenomena.",
      icon: Binary, 
      color: "text-pink-500", 
      bg: "bg-pink-500/10",
      borderColor: "border-pink-500/20",
      count: 4,
      level: "intermediate",
      difficulty: "Medium",
      estimatedTime: "2-3 months",
      prerequisites: ["Algebra", "Statistics basics"]
    },
    { 
      name: "Statistics", 
      description: "Data collection, organization, and interpretation.",
      icon: BarChart3, 
      color: "text-cyan-500", 
      bg: "bg-cyan-500/10",
      borderColor: "border-cyan-500/20",
      count: 6,
      level: "beginner",
      difficulty: "Easy to Medium",
      estimatedTime: "2-3 months",
      prerequisites: ["Basic arithmetic"]
    },
    { 
      name: "Linear Algebra", 
      description: "Vectors, vector spaces, and linear mappings.",
      icon: FunctionSquare, 
      color: "text-yellow-500", 
      bg: "bg-yellow-500/10",
      borderColor: "border-yellow-500/20",
      count: 9,
      level: "intermediate",
      difficulty: "Medium to Hard",
      estimatedTime: "3-5 months",
      prerequisites: ["Algebra"]
    },
    { 
      name: "Trigonometry", 
      description: "Relationships between side lengths and angles.",
      icon: Pi, 
      color: "text-indigo-500", 
      bg: "bg-indigo-500/10",
      borderColor: "border-indigo-500/20",
      count: 3,
      level: "beginner",
      difficulty: "Medium",
      estimatedTime: "2 months",
      prerequisites: ["Geometry basics"]
    },
  ];

  const featuredTopics = [
    {
      name: "Calculus",
      icon: TrendingUp,
      color: "text-green-500",
      bg: "bg-green-500/10",
      reason: "Most Popular",
      badge: "🔥 Trending"
    },
    {
      name: "Linear Algebra",
      icon: FunctionSquare,
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      reason: "Essential for ML/AI",
      badge: "⭐ Essential"
    },
    {
      name: "Probability",
      icon: Binary,
      color: "text-pink-500",
      bg: "bg-pink-500/10",
      reason: "High Demand",
      badge: "📈 Growing"
    }
  ];

  const learningStats = [
    { label: "Total Topics", value: "25+", icon: BookOpen },
    { label: "Difficulty Levels", value: "3", icon: TrendingUpIcon },
    { label: "Avg. Completion", value: "3 months", icon: Clock },
  ];

  // Filter topics based on search and level
  const filteredTopics = topics.filter(topic => {
    const matchesSearch = topic.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         topic.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = selectedLevel === "all" || topic.level === selectedLevel;
    return matchesSearch && matchesLevel;
  });

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <Infinity className="mr-1 h-3 w-3" />
              Mathematics Library
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Explore by <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Topic</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Navigate the mathematical landscape through our curated categories. 
              From foundational concepts to advanced theories.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {learningStats.map((stat) => (
              <div key={stat.label} className="bg-background/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 text-center">
                <stat.icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                <div className="text-3xl font-bold mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Topics Banner */}
      <section className="py-12 bg-muted/30 border-y border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-display font-bold mb-1">Featured Topics</h2>
              <p className="text-sm text-muted-foreground">Handpicked for maximum impact</p>
            </div>
            <Sparkles className="h-6 w-6 text-primary" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredTopics.map((topic) => (
              <Link key={topic.name} href={`/blogs?topic=${topic.name}`}>
                <Card className="border-2 border-primary/20 bg-gradient-to-br from-background to-primary/5 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                  <CardHeader>
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-14 h-14 rounded-xl ${topic.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <topic.icon className={`h-7 w-7 ${topic.color}`} />
                      </div>
                      <Badge className="bg-primary/10 text-primary border-primary/20">
                        {topic.badge}
                      </Badge>
                    </div>
                    <CardTitle className="text-xl group-hover:text-primary transition-colors">
                      {topic.name}
                    </CardTitle>
                    <CardDescription className="text-sm">
                      {topic.reason}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="py-12 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 rounded-full border-2 focus:border-primary"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2">
              <Button
                variant={selectedLevel === "all" ? "default" : "outline"}
                onClick={() => setSelectedLevel("all")}
                className="rounded-full"
              >
                All
              </Button>
              <Button
                variant={selectedLevel === "beginner" ? "default" : "outline"}
                onClick={() => setSelectedLevel("beginner")}
                className="rounded-full"
              >
                Beginner
              </Button>
              <Button
                variant={selectedLevel === "intermediate" ? "default" : "outline"}
                onClick={() => setSelectedLevel("intermediate")}
                className="rounded-full"
              >
                Intermediate
              </Button>
            </div>
          </div>

          {/* Results count */}
          <div className="flex items-center justify-between mb-6">
            <p className="text-sm text-muted-foreground">
              {filteredTopics.length} {filteredTopics.length === 1 ? 'topic' : 'topics'} found
            </p>
            <Button variant="ghost" size="sm" className="text-primary">
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>
          </div>
        </div>
      </section>

      {/* Topics Grid */}
      <section className="pb-24 container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTopics.map((topic, index) => (
            <Link key={topic.name} href={`/blogs?topic=${topic.name}`}>
              <Card 
                className={`hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border-2 ${topic.borderColor} group h-full relative overflow-hidden`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`w-14 h-14 rounded-xl ${topic.bg} flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <topic.icon className={`h-7 w-7 ${topic.color}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs font-mono">
                      {topic.count} articles
                    </Badge>
                  </div>
                  
                  <CardTitle className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {topic.name}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed mb-4">
                    {topic.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 relative z-10">
                  <div className="space-y-3 mb-4 pb-4 border-b border-border/50">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Difficulty:</span>
                      <Badge variant="outline" className={`${topic.bg} ${topic.color} border-0`}>
                        {topic.difficulty}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Est. Time:</span>
                      <span className="font-medium flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {topic.estimatedTime}
                      </span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="text-xs text-muted-foreground mb-2">Prerequisites:</div>
                    <div className="flex flex-wrap gap-1">
                      {topic.prerequisites.map((prereq, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {prereq}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Button 
                    variant="ghost" 
                    className="w-full justify-between group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                  >
                    Start Learning
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        {filteredTopics.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-4">
              <Search className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-xl font-bold mb-2">No topics found</h3>
            <p className="text-muted-foreground mb-6">
              Try adjusting your search or filters
            </p>
            <Button onClick={() => { setSearchQuery(""); setSelectedLevel("all"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </section>

      {/* Learning Path CTA */}
      <section className="py-20 bg-gradient-to-r from-primary via-accent to-blue-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS1vcGFjaXR5PSIwLjEiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-20" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center text-white">
            <Network className="h-16 w-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-4xl font-display font-bold mb-4">
              Not Sure Where to Start?
            </h2>
            <p className="text-xl mb-8 text-white/90">
              Take our interactive quiz to get a personalized learning path based on your goals and current knowledge.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/blogs">
                <Button size="lg" className="h-14 px-8 rounded-full bg-white text-primary hover:bg-white/90 shadow-xl">
                  <Star className="mr-2 h-5 w-5" />
                  Take the Quiz
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  size="lg" 
                  variant="outline"
                  className="h-14 px-8 rounded-full border-2 border-white text-white bg-white/10 backdrop-blur-sm hover:bg-white/20"
                >
                  Browse All Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
