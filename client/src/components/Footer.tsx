import { Link } from "wouter";
import { Github, Twitter, Linkedin, BookOpen } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-muted/30 border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="bg-primary/10 p-1.5 rounded-md">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xl font-bold font-display">MathLog.</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">
              Making complex mathematics accessible, understandable, and beautiful for everyone.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Explore</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/blogs" className="hover:text-primary transition-colors">Latest Articles</Link></li>
              <li><Link href="/topics" className="hover:text-primary transition-colors">Topics</Link></li>
              <li><Link href="/tutorials" className="hover:text-primary transition-colors">Tutorials</Link></li>
              <li><Link href="/about" className="hover:text-primary transition-colors">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Topics</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/topics/calculus" className="hover:text-primary transition-colors">Calculus</Link></li>
              <li><Link href="/topics/algebra" className="hover:text-primary transition-colors">Linear Algebra</Link></li>
              <li><Link href="/topics/number-theory" className="hover:text-primary transition-colors">Number Theory</Link></li>
              <li><Link href="/topics/probability" className="hover:text-primary transition-colors">Probability</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4 text-foreground">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get the latest math insights delivered to your inbox weekly.
            </p>
            {/* The actual form would go here, hooked to useCreateSubscriber */}
            <div className="text-xs text-muted-foreground/60">
              © {new Date().getFullYear()} MathLog. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
