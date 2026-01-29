import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Link } from "wouter";
import { 
  BookOpen, Users, Target, Lightbulb, Award, TrendingUp, 
  Heart, Globe, Zap, Shield, Star, Sparkles, CheckCircle2,
  GraduationCap, Code, Brain, Telescope, MessageCircle, Mail
} from "lucide-react";

export default function About() {
  const values = [
    {
      icon: Lightbulb,
      title: "Clarity First",
      description: "We break down complex concepts into digestible, intuitive explanations that anyone can understand.",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10"
    },
    {
      icon: Heart,
      title: "Passion for Learning",
      description: "Mathematics is beautiful. We aim to share that beauty and inspire curiosity in every reader.",
      color: "text-red-500",
      bg: "bg-red-500/10"
    },
    {
      icon: Globe,
      title: "Accessible to All",
      description: "Quality mathematics education should be free and available to everyone, everywhere.",
      color: "text-blue-500",
      bg: "bg-blue-500/10"
    },
    {
      icon: Users,
      title: "Community Driven",
      description: "We learn together. Our community of learners and educators makes this platform thrive.",
      color: "text-green-500",
      bg: "bg-green-500/10"
    }
  ];

  const stats = [
    { label: "Articles Published", value: "150+", icon: BookOpen },
    { label: "Active Learners", value: "10K+", icon: Users },
    { label: "Topics Covered", value: "25+", icon: Target },
    { label: "Success Stories", value: "500+", icon: Award }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Founder & Lead Educator",
      specialty: "Calculus & Analysis",
      avatar: "SJ",
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Prof. Michael Chen",
      role: "Pure Mathematics",
      specialty: "Algebra & Group Theory",
      avatar: "MC",
      color: "from-purple-500 to-pink-500"
    },
    {
      name: "Dr. Emily Rodriguez",
      role: "Geometry Specialist",
      specialty: "Euclidean & Non-Euclidean Geometry",
      avatar: "ER",
      color: "from-green-500 to-teal-500"
    },
    {
      name: "Dr. James Wilson",
      role: "Number Theory Expert",
      specialty: "Primes & Cryptography",
      avatar: "JW",
      color: "from-orange-500 to-red-500"
    }
  ];

  const milestones = [
    { year: "2023", event: "MathLog Founded", description: "Started with a vision to make math accessible" },
    { year: "2024", event: "10,000 Learners", description: "Reached our first major milestone of active users" },
    { year: "2025", event: "50 Topics", description: "Expanded coverage across all major mathematical fields" },
    { year: "2026", event: "Global Community", description: "Learners from 100+ countries worldwide" }
  ];

  return (
    <div className="animate-in fade-in duration-500">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary/10 via-accent/5 to-background border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iY3VycmVudENvbG9yIiBzdHJva2Utb3BhY2l0eT0iMC4wNSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="outline" className="mb-6 border-primary/30 text-primary">
              <Sparkles className="mr-1 h-3 w-3" />
              About Us
            </Badge>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 leading-tight">
              Making Mathematics <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Accessible to Everyone
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We are a community of mathematicians, educators, and students dedicated to transforming 
              how the world learns and appreciates mathematics.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={stat.label}
                className="text-center"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-background shadow-lg flex items-center justify-center hover:scale-110 transition-transform duration-300">
                    <stat.icon className="h-8 w-8 text-primary" />
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

      {/* Mission Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Transforming mathematical education through clarity, community, and innovation
            </p>
          </div>

          <div className="prose prose-lg prose-slate dark:prose-invert mx-auto mb-16">
            <p className="text-lg leading-relaxed">
              Mathematics is often seen as a daunting, impenetrable fortress of symbols and abstract logic. 
              At <strong>MathLog</strong>, we believe math is a language of patterns—beautiful, logical, and universally applicable.
              Our mission is to translate complex theorems into intuitive stories that resonate with learners at every level.
            </p>
            
            <p className="text-lg leading-relaxed">
              We prioritize <strong>intuition over rigor</strong> (initially). Before diving into proofs, we explore the "why" and "how" 
              using visual examples and real-world analogies. Once the intuition is built, the formalism becomes a powerful tool 
              rather than a barrier to understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <Card 
                key={value.title}
                className="border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl ${value.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <value.icon className={`h-7 w-7 ${value.color}`} />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base leading-relaxed">
                    {value.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="outline" className="mb-4 border-accent/30 text-accent">
                <Telescope className="mr-1 h-3 w-3" />
                Our Journey
              </Badge>
              <h2 className="text-4xl font-display font-bold mb-4">Milestones & Growth</h2>
              <p className="text-lg text-muted-foreground">
                Building the future of mathematics education, one article at a time
              </p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={milestone.year} className="flex gap-6 items-start group">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                      {milestone.year}
                    </div>
                    {index < milestones.length - 1 && (
                      <div className="w-0.5 h-16 bg-gradient-to-b from-primary/50 to-accent/50 mt-4" />
                    )}
                  </div>
                  <Card className="flex-1 border-2 border-border/50 group-hover:border-primary/30 group-hover:shadow-lg transition-all">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Star className="h-5 w-5 text-primary" />
                        {milestone.event}
                      </CardTitle>
                      <CardDescription className="text-base">{milestone.description}</CardDescription>
                    </CardHeader>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4 border-green-500/30 text-green-600">
              <Users className="mr-1 h-3 w-3" />
              Our Team
            </Badge>
            <h2 className="text-4xl font-display font-bold mb-4">Meet the Educators</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Passionate mathematicians dedicated to making complex concepts simple and engaging
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card 
                key={member.name}
                className="border-2 border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-center"
              >
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <div className={`w-24 h-24 rounded-full bg-gradient-to-br ${member.color} flex items-center justify-center text-white font-bold text-2xl shadow-lg`}>
                      {member.avatar}
                    </div>
                  </div>
                  <CardTitle className="text-xl mb-1">{member.name}</CardTitle>
                  <CardDescription className="text-sm font-semibold text-primary mb-2">
                    {member.role}
                  </CardDescription>
                  <Badge variant="secondary" className="text-xs">
                    {member.specialty}
                  </Badge>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-accent/5 to-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-display font-bold mb-4">What Makes Us Different</h2>
              <p className="text-lg text-muted-foreground">
                Our unique approach to mathematical education
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <Card className="border-2 border-border/50 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Brain className="h-12 w-12 text-blue-500" />
                  </div>
                  <CardTitle className="text-lg">Intuition-First Learning</CardTitle>
                  <CardDescription className="text-sm">
                    Build understanding before diving into formal proofs and complex notation
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-border/50 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <Zap className="h-12 w-12 text-yellow-500" />
                  </div>
                  <CardTitle className="text-lg">Interactive Examples</CardTitle>
                  <CardDescription className="text-sm">
                    Learn by doing with step-by-step walkthroughs and practical applications
                  </CardDescription>
                </CardHeader>
              </Card>

              <Card className="border-2 border-border/50 text-center">
                <CardHeader>
                  <div className="flex justify-center mb-4">
                    <GraduationCap className="h-12 w-12 text-green-500" />
                  </div>
                  <CardTitle className="text-lg">Progressive Difficulty</CardTitle>
                  <CardDescription className="text-sm">
                    Structured paths from beginner to advanced topics for steady growth
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>

            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
              <CardContent className="pt-8 pb-8">
                <div className="flex items-start gap-4">
                  <CheckCircle2 className="h-6 w-6 text-green-500 mt-1 shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold mb-2">Quality Over Quantity</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Every article is carefully crafted, reviewed by experts, and tested with real learners. 
                      We'd rather have 100 excellent articles than 1000 mediocre ones. Our commitment to quality 
                      ensures that your time spent learning is always valuable and rewarding.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Join Community CTA */}
      <section className="py-20 container mx-auto px-4">
        <Card className="border-2 border-border/50 overflow-hidden max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-primary via-accent to-blue-500 p-1">
            <div className="bg-background p-12">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <MessageCircle className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-3xl font-display font-bold mb-4">Join the Community</h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Whether you're a high school student struggling with calculus or a researcher looking for 
                  a fresh perspective, you have a place here. Start your mathematical journey today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link href="/blogs">
                    <Button size="lg" className="rounded-full px-8">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Articles
                    </Button>
                  </Link>
                  <Link href="/topics">
                    <Button variant="outline" size="lg" className="rounded-full px-8 border-2">
                      <Target className="mr-2 h-5 w-5" />
                      Explore Topics
                    </Button>
                  </Link>
                </div>
                
                <Separator className="my-8" />
                
                <div className="flex flex-col items-center gap-4">
                  <p className="text-sm text-muted-foreground">Want to contribute or get in touch?</p>
                  <Button variant="ghost" className="gap-2">
                    <Mail className="h-4 w-4" />
                    contact@mathlog.com
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </section>
    </div>
  );
}
