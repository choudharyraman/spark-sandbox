import { Button } from '@/components/ui/button';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface CTASectionProps {
  onExploreTemplates: () => void;
}

export function CTASection({ onExploreTemplates }: CTASectionProps) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-sandbox/5" />
      
      {/* Animated background orbs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-sandbox/10 rounded-full blur-3xl animate-float-delayed" />
      </div>
      
      <div className="container mx-auto px-4 relative">
        <div 
          ref={ref}
          className={`max-w-3xl mx-auto text-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}
        >
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 animate-float"
            style={{ transitionDelay: '100ms' }}
          >
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          
          <h2 
            className="font-display text-3xl md:text-4xl font-bold mb-4"
            style={{ 
              transitionDelay: '200ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 200ms'
            }}
          >
            Ready to stop watching and start shipping?
          </h2>
          
          <p 
            className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto"
            style={{ 
              transitionDelay: '300ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 300ms'
            }}
          >
            Pick a template, play in the sandbox, and deploy your app — all in the time it takes to watch another tutorial.
          </p>
          
          <div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            style={{ 
              transitionDelay: '400ms',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1) 400ms'
            }}
          >
            <Button 
              variant="hero" 
              size="xl" 
              onClick={onExploreTemplates} 
              className="gap-2 group hover-glow"
            >
              <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
              Explore templates
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
            <Button 
              variant="outline" 
              size="xl" 
              className="gap-2 group hover-lift"
            >
              View documentation
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>
          </div>

          <p 
            className="text-sm text-muted-foreground mt-6"
            style={{ 
              transitionDelay: '500ms',
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 500ms'
            }}
          >
            No credit card required. Sandboxes are free.
          </p>
        </div>
      </div>
    </section>
  );
}
