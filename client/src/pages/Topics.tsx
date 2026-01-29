import { Link } from "wouter";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sigma, TrendingUp, Pi, Calculator, Shapes, Binary, BarChart3, FunctionSquare } from "lucide-react";

export default function Topics() {
  const topics = [
    { 
      name: "Algebra", 
      description: "Equations, structures, and symmetries.",
      icon: Sigma, 
      color: "text-blue-500", 
      bg: "bg-blue-500/10",
      count: 12
    },
    { 
      name: "Calculus", 
      description: "Limits, derivatives, integrals, and series.",
      icon: TrendingUp, 
      color: "text-green-500", 
      bg: "bg-green-500/10",
      count: 8 
    },
    { 
      name: "Geometry", 
      description: "Shapes, sizes, relative positions, and space.",
      icon: Shapes, 
      color: "text-purple-500", 
      bg: "bg-purple-500/10",
      count: 5 
    },
    { 
      name: "Number Theory", 
      description: "Properties of integers and prime numbers.",
      icon: Calculator, 
      color: "text-orange-500", 
      bg: "bg-orange-500/10",
      count: 7
    },
    { 
      name: "Probability", 
      description: "Analysis of random phenomena.",
      icon: Binary, 
      color: "text-pink-500", 
      bg: "bg-pink-500/10",
      count: 4
    },
    { 
      name: "Statistics", 
      description: "Data collection, organization, and interpretation.",
      icon: BarChart3, 
      color: "text-cyan-500", 
      bg: "bg-cyan-500/10",
      count: 6
    },
    { 
      name: "Linear Algebra", 
      description: "Vectors, vector spaces, and linear mappings.",
      icon: FunctionSquare, 
      color: "text-yellow-500", 
      bg: "bg-yellow-500/10",
      count: 9
    },
    { 
      name: "Trigonometry", 
      description: "Relationships between side lengths and angles.",
      icon: Pi, 
      color: "text-indigo-500", 
      bg: "bg-indigo-500/10",
      count: 3
    },
  ];

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl font-display font-bold mb-4">Explore by Topic</h1>
        <p className="text-xl text-muted-foreground">
          Navigate the mathematical landscape through our curated categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {topics.map((topic) => (
          <Link key={topic.name} href={`/blogs?topic=${topic.name}`}>
            <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer border-border/50 group h-full">
              <CardHeader>
                <div className={`w-12 h-12 rounded-lg ${topic.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <topic.icon className={`h-6 w-6 ${topic.color}`} />
                </div>
                <div className="flex justify-between items-center mb-2">
                  <CardTitle className="text-xl font-bold">{topic.name}</CardTitle>
                  <span className="text-xs font-mono bg-muted px-2 py-1 rounded text-muted-foreground">{topic.count} articles</span>
                </div>
                <CardDescription className="text-sm leading-relaxed">
                  {topic.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
