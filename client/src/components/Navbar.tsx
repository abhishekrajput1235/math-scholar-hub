import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X, BookOpen, Search } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Topics", href: "/topics" },
    { name: "Blogs", href: "/blogs" },
    { name: "About", href: "/about" },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/blogs?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setIsMobileOpen(false);
    }
  };

  const isActive = (path: string) => {
    if (path === "/" && location !== "/") return false;
    return location.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="bg-primary/10 p-2 rounded-lg group-hover:bg-primary/20 transition-colors">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <span className="text-xl font-bold font-display tracking-tight text-foreground">
                MathLog<span className="text-primary">.</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link 
                key={link.href} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  isActive(link.href) ? "text-primary font-semibold" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
             <form onSubmit={handleSearch} className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search topics..."
                  className="w-64 pl-9 bg-secondary/50 border-transparent focus:bg-background focus:border-primary/50 transition-all rounded-full h-9"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
             </form>
             <Button size="sm" className="rounded-full px-6 font-semibold shadow-lg shadow-primary/20 hover:shadow-primary/30">
               Subscribe
             </Button>
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-6">
                  <Link href="/" onClick={() => setIsMobileOpen(false)} className="flex items-center gap-2 mb-4">
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="text-xl font-bold font-display">MathLog.</span>
                  </Link>
                  
                  <form onSubmit={handleSearch} className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </form>

                  <div className="flex flex-col gap-4">
                    {navLinks.map((link) => (
                      <Link 
                        key={link.href} 
                        href={link.href}
                        className={`text-lg font-medium py-2 border-b border-border/50 ${
                          isActive(link.href) ? "text-primary" : "text-foreground"
                        }`}
                        onClick={() => setIsMobileOpen(false)}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>

                  <div className="mt-auto">
                    <Button className="w-full" size="lg">Subscribe to Newsletter</Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
