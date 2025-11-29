import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Play, Sparkles, Zap, Shield, Clock } from 'lucide-react';

interface HeroSectionProps {
  onExploreTemplates: () => void;
}

export function HeroSection({ onExploreTemplates }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden gradient-hero pt-24 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/4 w-[800px] h-[800px] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-1/2 -left-1/4 w-[600px] h-[600px] rounded-full bg-sandbox/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass mb-6 animate-fade-in">
            <Badge variant="sandbox-solid" className="gap-1">
              <Sparkles className="w-3 h-3" />
              New
            </Badge>
            <span className="text-sm">Smart Sandbox — Try any template with real data</span>
            <ArrowRight className="w-4 h-4 text-muted-foreground" />
          </div>

          {/* Headline */}
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-bold mb-6 animate-slide-up">
            From template to{' '}
            <span className="text-primary">production</span>
            {' '}in minutes
          </h1>

          {/* Subheadline */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
            Stop watching tutorials. Start shipping. Every template comes with a sandbox — 
            explore with realistic test data, customize, and deploy when you're ready.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Button variant="hero" size="xl" onClick={onExploreTemplates} className="gap-2 w-full sm:w-auto">
              <Sparkles className="w-5 h-5" />
              Explore templates
            </Button>
            <Button variant="outline" size="xl" className="gap-2 w-full sm:w-auto">
              <Play className="w-5 h-5" />
              Watch how it works
            </Button>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Zap className="w-4 h-4 text-sandbox" />
              <span className="text-sm">No setup required</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Shield className="w-4 h-4 text-success" />
              <span className="text-sm">Safe to experiment</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-card border border-border">
              <Clock className="w-4 h-4 text-primary" />
              <span className="text-sm">No credit burn</span>
            </div>
          </div>
        </div>

        {/* Visual preview */}
        <div className="mt-16 max-w-5xl mx-auto animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <div className="relative">
            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-sandbox/20 to-success/20 rounded-3xl blur-2xl opacity-50" />
            
            {/* Preview frame */}
            <div className="relative rounded-2xl overflow-hidden border border-border bg-card shadow-xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-sandbox/60" />
                  <div className="w-3 h-3 rounded-full bg-success/60" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="px-4 py-1 bg-background rounded-md text-xs text-muted-foreground font-mono">
                    sandbox-ecommerce.lovable.app
                  </div>
                </div>
                <Badge variant="sandbox" className="text-xs">
                  Sandbox Mode
                </Badge>
              </div>
              
              {/* Content preview */}
              <div className="aspect-[16/9] bg-gradient-to-br from-background to-muted/30 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-2xl gradient-sandbox flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8 text-sandbox-foreground" />
                  </div>
                  <p className="text-muted-foreground">Interactive sandbox preview</p>
                </div>
              </div>
            </div>

            {/* Floating elements */}
            <div className="absolute -right-4 top-1/4 glass p-3 rounded-xl shadow-lg animate-pulse-soft hidden lg:block">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-success/20 flex items-center justify-center">
                  <Zap className="w-4 h-4 text-success" />
                </div>
                <div>
                  <p className="text-xs font-medium">Data generated</p>
                  <p className="text-xs text-muted-foreground">50 products ready</p>
                </div>
              </div>
            </div>

            <div className="absolute -left-4 bottom-1/4 glass p-3 rounded-xl shadow-lg animate-pulse-soft hidden lg:block" style={{ animationDelay: '0.5s' }}>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-medium">Safe sandbox</p>
                  <p className="text-xs text-muted-foreground">No credits used</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
