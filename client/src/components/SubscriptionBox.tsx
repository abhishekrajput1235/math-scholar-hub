import { useState } from "react";
import { useCreateSubscriber } from "@/hooks/use-subscribers";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function SubscriptionBox() {
  const [email, setEmail] = useState("");
  const { mutate, isPending, isSuccess } = useCreateSubscriber();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    mutate({ email }, {
      onSuccess: () => {
        setEmail("");
        toast({
          title: "Subscribed!",
          description: "You've successfully joined our newsletter.",
        });
      },
      onError: (error) => {
        toast({
          variant: "destructive",
          title: "Error",
          description: error.message,
        });
      }
    });
  };

  if (isSuccess) {
    return (
      <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center animate-in fade-in zoom-in duration-300">
        <div className="mx-auto w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-2">You're on the list!</h3>
        <p className="text-muted-foreground">Thanks for subscribing. Keep an eye on your inbox for fresh math content.</p>
      </div>
    );
  }

  return (
    <div className="bg-primary rounded-2xl p-8 md:p-12 text-center text-primary-foreground relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 rounded-full bg-white/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-16 -mb-16 w-48 h-48 rounded-full bg-indigo-500/30 blur-2xl pointer-events-none" />
      
      <div className="relative z-10 max-w-xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">Join the Math Community</h2>
        <p className="text-primary-foreground/80 mb-8 text-lg">
          Get weekly articles, theorem breakdowns, and problem sets delivered straight to your inbox.
        </p>
        
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
          <Input 
            type="email" 
            placeholder="enter@email.com" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 focus:border-white/40 h-12"
            required
          />
          <Button 
            type="submit" 
            size="lg" 
            disabled={isPending}
            className="bg-white text-primary hover:bg-white/90 h-12 font-semibold shadow-lg shadow-black/5"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
            Subscribe
          </Button>
        </form>
        <p className="text-xs text-primary-foreground/50 mt-4">
          No spam, ever. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
