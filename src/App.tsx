import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import BlogListing from "@/pages/BlogListing";
import BlogDetail from "@/pages/BlogDetail";
import Topics from "@/pages/Topics";
import About from "@/pages/About";
import { useEffect } from "react";

// Scroll to top on route change
function ScrollToTop() {
  const [location] = useLocation();
  
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  
  return null;
}

function Router() {
  return (
    <div className="flex flex-col min-h-screen bg-background font-sans text-foreground selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/blogs" component={BlogListing} />
          <Route path="/blog/:slug" component={BlogDetail} />
          <Route path="/topics" component={Topics} />
          <Route path="/topics/:topic">
            {(params) => {
              // Redirect /topics/algebra -> /blogs?topic=algebra
              window.location.replace(`/blogs?topic=${params.topic}`);
              return null;
            }}
          </Route>
          <Route path="/about" component={About} />
          <Route path="/tutorials" component={() => (
             <div className="container py-20 text-center">
               <h1 className="text-3xl font-bold mb-4">Tutorials</h1>
               <p className="text-muted-foreground">Interactive tutorials coming soon!</p>
             </div>
          )} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <ScrollToTop />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router />
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
