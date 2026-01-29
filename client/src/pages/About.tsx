import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-3xl">
      <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">About MathLog</h1>
      
      <div className="prose prose-lg prose-slate dark:prose-invert mx-auto">
        <p className="lead text-xl text-muted-foreground mb-8 text-center">
          We are a community of mathematicians, educators, and students dedicated to making advanced mathematical concepts accessible to everyone.
        </p>

        <h2>Our Mission</h2>
        <p>
          Mathematics is often seen as a daunting, impenetrable fortress of symbols and abstract logic. 
          At MathLog, we believe math is a language of patterns—beautiful, logical, and universally applicable.
          Our mission is to translate complex theorems into intuitive stories.
        </p>

        <h2>How We Learn</h2>
        <p>
          We prioritize <strong>intuition over rigor</strong> (initially). Before diving into proofs, we explore the "why" and "how" using visual examples and real-world analogies. Once the intuition is built, the formalism becomes a powerful tool rather than a barrier.
        </p>

        <div className="my-12 p-8 bg-muted/30 rounded-2xl border border-border">
          <h3 className="mt-0">Join the Community</h3>
          <p>
            Whether you're a high school student struggling with calculus or a researcher looking for a fresh perspective, you have a place here.
          </p>
          <div className="flex gap-4 mt-6">
             <Link href="/blogs">
               <Button>Read Articles</Button>
             </Link>
             <Link href="/topics">
               <Button variant="outline">Explore Topics</Button>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
