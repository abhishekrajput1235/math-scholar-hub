import { usePosts } from "@/hooks/use-posts";
import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";

export default function BlogListing() {
  const [location] = useLocation();
  const searchParams = new URLSearchParams(window.location.search);
  
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [topic, setTopic] = useState(searchParams.get("topic") || "all");
  const [difficulty, setDifficulty] = useState(searchParams.get("difficulty") || "all");

  // Create filters object only with truthy values (and excluding "all")
  const filters = {
    ...(search && { search }),
    ...(topic !== "all" && { topic }),
    ...(difficulty !== "all" && { difficulty })
  };

  const { data: posts, isLoading, isError } = usePosts(filters);

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <div className="mb-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-display font-bold mb-4">Library</h1>
        <p className="text-muted-foreground text-lg">
          Browse our collection of mathematical articles, tutorials, and deep dives.
        </p>
      </div>

      {/* Filters & Search Toolbar */}
      <div className="bg-card border border-border rounded-xl p-4 mb-10 shadow-sm sticky top-20 z-10 backdrop-blur-lg bg-card/95">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search articles..." 
              className="pl-10 bg-background"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex gap-4">
            <Select value={topic} onValueChange={setTopic}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Topics</SelectItem>
                <SelectItem value="Algebra">Algebra</SelectItem>
                <SelectItem value="Calculus">Calculus</SelectItem>
                <SelectItem value="Geometry">Geometry</SelectItem>
                <SelectItem value="Number Theory">Number Theory</SelectItem>
                <SelectItem value="Probability">Probability</SelectItem>
              </SelectContent>
            </Select>

            <Select value={difficulty} onValueChange={setDifficulty}>
              <SelectTrigger className="w-[160px] bg-background">
                <SelectValue placeholder="Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any Level</SelectItem>
                <SelectItem value="Beginner">Beginner</SelectItem>
                <SelectItem value="Intermediate">Intermediate</SelectItem>
                <SelectItem value="Advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
            
            <Button variant="outline" size="icon" className="shrink-0" title="More filters (coming soon)">
              <SlidersHorizontal className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Loader2 className="w-10 h-10 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading articles...</p>
        </div>
      ) : isError ? (
        <div className="text-center py-20 bg-destructive/5 rounded-2xl border border-destructive/20">
          <h3 className="text-xl font-bold text-destructive mb-2">Failed to load posts</h3>
          <p className="text-muted-foreground">Please try again later or check your connection.</p>
        </div>
      ) : posts && posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-24 bg-muted/30 rounded-3xl border border-dashed border-border">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-xl font-bold mb-2">No articles found</h3>
          <p className="text-muted-foreground max-w-md mx-auto mb-6">
            We couldn't find any articles matching your current filters. Try adjusting your search or clearing filters.
          </p>
          <Button 
            variant="outline" 
            onClick={() => {
              setSearch("");
              setTopic("all");
              setDifficulty("all");
            }}
          >
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
