import { usePosts } from "@/hooks/use-posts";
import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, SlidersHorizontal, Loader2, LayoutGrid, List, 
  TrendingUp, Clock, BookOpen, Filter, X, Sparkles,
  Calendar, Eye, ArrowUpDown, Flame, Star, CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";

export default function BlogListing() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [topic, setTopic] = useState(searchParams.get("topic") || "all");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Create filters object only with truthy values (and excluding "all")
  const filters = {
    ...(search && { search }),
    ...(topic !== "all" && { topic }),
    ...(difficulty !== "all" && { difficulty })
  };

  const { data: posts, isLoading, isError } = usePosts(filters);

  // Sort posts
  const sortedPosts = posts ? [...posts].sort((a, b) => {
    switch (sortBy) {
      case "oldest":
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case "title":
        return a.title.localeCompare(b.title);
      default: // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
  }) : [];

  const activeFiltersCount = 
    (search ? 1 : 0) + 
    (topic !== "all" ? 1 : 0) + 
    (difficulty !== "all" ? 1 : 0);

  const clearAllFilters = () => {
    setSearch("");
    setTopic("all");
    setDifficulty("all");
  };

  const topics = [
    { value: "Algebra", icon: "🔢" },
    { value: "Calculus", icon: "📈" },
    { value: "Geometry", icon: "📐" },
    { value: "Number Theory", icon: "🔢" },
    { value: "Probability", icon: "🎲" },
    { value: "Statistics", icon: "📊" },
    { value: "Linear Algebra", icon: "📐" },
    { value: "Trigonometry", icon: "📐" }
  ];

  const quickFilters = [
    { label: "Popular", icon: Flame, color: "text-orange-500" },
    { label: "New", icon: Sparkles, color: "text-blue-500" },
    { label: "Trending", icon: TrendingUp, color: "text-green-500" },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-16 bg-gradient-to-br from-primary/5 via-accent/5 to-background border-b border-border/50">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <Badge variant="outline" className="mb-4 border-primary/30 text-primary">
              <BookOpen className="mr-1 h-3 w-3" />
              Article Library
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-4">
              Discover <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Mathematics</span>
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Browse our collection of {posts?.length || 0}+ mathematical articles, tutorials, and deep dives.
            </p>

            {/* Quick Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {quickFilters.map((filter) => (
                <Button 
                  key={filter.label}
                  variant="outline" 
                  size="sm"
                  className="rounded-full border-border/50 hover:border-primary/50 hover:bg-primary/5"
                >
                  <filter.icon className={`h-3.5 w-3.5 mr-1.5 ${filter.color}`} />
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        {/* Filters & Search Toolbar */}
        <div className="bg-card border-2 border-border/50 rounded-2xl p-6 mb-8 shadow-lg sticky top-20 z-10 backdrop-blur-xl bg-card/95">
          <div className="flex flex-col gap-4">
            {/* Main Search and View Controls */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search articles by title, topic, or content..." 
                  className="pl-11 h-12 bg-background border-2 focus:border-primary rounded-xl text-base"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-muted"
                    onClick={() => setSearch("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              
              <div className="flex gap-2 shrink-0">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className="h-12 w-12"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-12 w-12 relative"
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4" />
                  {activeFiltersCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs">
                      {activeFiltersCount}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>

            {/* Extended Filters */}
            {showFilters && (
              <div className="pt-4 border-t border-border/50 animate-in slide-in-from-top-2 duration-300">
                <div className="flex flex-col md:flex-row gap-4">
                  <Select value={topic} onValueChange={setTopic}>
                    <SelectTrigger className="md:w-[200px] h-11 bg-background border-2">
                      <SelectValue placeholder="Topic" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Topics</SelectItem>
                      {topics.map((t) => (
                        <SelectItem key={t.value} value={t.value}>
                          {t.icon} {t.value}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={difficulty} onValueChange={setDifficulty}>
                    <SelectTrigger className="md:w-[200px] h-11 bg-background border-2">
                      <SelectValue placeholder="Difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Any Level</SelectItem>
                      <SelectItem value="Beginner">🟢 Beginner</SelectItem>
                      <SelectItem value="Intermediate">🟡 Intermediate</SelectItem>
                      <SelectItem value="Advanced">🔴 Advanced</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="md:w-[200px] h-11 bg-background border-2">
                      <ArrowUpDown className="h-4 w-4 mr-2" />
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="title">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>

                  {activeFiltersCount > 0 && (
                    <Button
                      variant="ghost"
                      className="md:w-auto text-destructive hover:text-destructive hover:bg-destructive/10"
                      onClick={clearAllFilters}
                    >
                      <X className="h-4 w-4 mr-2" />
                      Clear All
                    </Button>
                  )}
                </div>
              </div>
            )}

            {/* Active Filters Display */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-muted-foreground">Active filters:</span>
                {search && (
                  <Badge variant="secondary" className="gap-1">
                    Search: {search}
                    <button onClick={() => setSearch("")} className="hover:bg-muted rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {topic !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Topic: {topic}
                    <button onClick={() => setTopic("all")} className="hover:bg-muted rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
                {difficulty !== "all" && (
                  <Badge variant="secondary" className="gap-1">
                    Level: {difficulty}
                    <button onClick={() => setDifficulty("all")} className="hover:bg-muted rounded-full p-0.5">
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Results Info Bar */}
        {!isLoading && !isError && (
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-4 border-b border-border/50">
            <div>
              <p className="text-sm text-muted-foreground">
                {sortedPosts.length === 0 ? (
                  "No articles found"
                ) : (
                  <>
                    Showing <span className="font-semibold text-foreground">{sortedPosts.length}</span> {sortedPosts.length === 1 ? 'article' : 'articles'}
                    {activeFiltersCount > 0 && <span> with active filters</span>}
                  </>
                )}
              </p>
            </div>
            
            {sortedPosts.length > 0 && (
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">
                  Avg. read time: 5-10 min
                </span>
              </div>
            )}
          </div>
        )}

        {/* Grid */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
            <p className="text-muted-foreground text-lg">Loading articles...</p>
            <p className="text-sm text-muted-foreground/60 mt-2">This won't take long</p>
          </div>
        ) : isError ? (
          <Card className="border-2 border-destructive/20 bg-destructive/5">
            <CardContent className="text-center py-20">
              <div className="w-16 h-16 rounded-full bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                <X className="h-8 w-8 text-destructive" />
              </div>
              <h3 className="text-xl font-bold text-destructive mb-2">Failed to load articles</h3>
              <p className="text-muted-foreground mb-6">Please try again later or check your connection.</p>
              <Button variant="outline" onClick={() => window.location.reload()}>
                Retry
              </Button>
            </CardContent>
          </Card>
        ) : sortedPosts && sortedPosts.length > 0 ? (
          <div className={cn(
            viewMode === "grid" 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" 
              : "flex flex-col gap-6"
          )}>
            {sortedPosts.map((post, index) => (
              <div
                key={post.id}
                className="animate-in fade-in-up duration-500"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <BlogCard post={post} />
              </div>
            ))}
          </div>
        ) : (
          <Card className="border-2 border-dashed border-border/50 bg-muted/20">
            <CardContent className="text-center py-24">
              <div className="w-20 h-20 rounded-full bg-muted flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-2xl font-bold mb-3">No articles found</h3>
              <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
                We couldn't find any articles matching your current filters. Try adjusting your search or clearing filters.
              </p>
              {activeFiltersCount > 0 ? (
                <Button size="lg" onClick={clearAllFilters} className="rounded-full">
                  <X className="mr-2 h-4 w-4" />
                  Clear All Filters
                </Button>
              ) : (
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">Try browsing by topic:</p>
                  <div className="flex flex-wrap gap-2 justify-center max-w-2xl mx-auto">
                    {topics.slice(0, 6).map((t) => (
                      <Button
                        key={t.value}
                        variant="outline"
                        size="sm"
                        onClick={() => setTopic(t.value)}
                        className="rounded-full"
                      >
                        {t.icon} {t.value}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Load More / Pagination Placeholder */}
        {sortedPosts && sortedPosts.length > 0 && (
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col items-center gap-4 p-8 rounded-2xl bg-muted/30 border border-border/50">
              <CheckCircle2 className="h-12 w-12 text-green-500" />
              <div>
                <p className="font-semibold text-lg mb-1">You've reached the end!</p>
                <p className="text-sm text-muted-foreground">
                  You've seen all {sortedPosts.length} articles matching your filters
                </p>
              </div>
              <Link href="/topics">
                <Button variant="outline" className="rounded-full">
                  Explore More Topics
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
