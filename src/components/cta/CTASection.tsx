import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CTASectionProps {
  onExploreTemplates: () => void;
}

export function CTASection({ onExploreTemplates }: CTASectionProps) {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sandbox/5" />
      
      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Ready to stop watching and start shipping?
          </h2>
          
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Pick a template, play in the sandbox, and deploy your app — all in the time it takes to watch another tutorial.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button variant="hero" size="xl" onClick={onExploreTemplates} className="gap-2">
              <Sparkles className="w-5 h-5" />
              Explore templates
            </Button>
            <Button variant="outline" size="xl" className="gap-2">
              View documentation
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          <p className="text-sm text-muted-foreground mt-6">
            No credit card required. Sandboxes are free.
          </p>
        </div>
      </div>
    </section>
  );
}
