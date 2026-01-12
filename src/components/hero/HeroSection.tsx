import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowRight, 
  Play, 
  Sparkles, 
  Zap, 
  Shield, 
  Clock, 
  LayoutTemplate, 
  MessageSquare,
  MousePointerClick,
  Rocket,
  CheckCircle2,
  Code2
} from 'lucide-react';
import { PromptBuilder } from './PromptBuilder';

interface HeroSectionProps {
  onExploreTemplates: () => void;
  onBuildFromPrompt: (prompt: string) => void;
  isGenerating?: boolean;
}

export function HeroSection({ onExploreTemplates, onBuildFromPrompt, isGenerating = false }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('templates');
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const fadeStart = 0;
      const fadeEnd = 600;
      const opacity = Math.max(0, 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart));
      setScrollOpacity(opacity);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const highlights = [
    'Instant preview with real data',
    'One-click deploy to production',
    'Zero configuration needed',
    'Fork and customize anytime'
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-20">
      {/* Animated background with scroll fade */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-100"
        style={{ opacity: scrollOpacity }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-float" />
        <div className="absolute top-20 right-1/4 w-80 h-80 bg-sandbox/10 rounded-full blur-3xl animate-float-delayed" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border)/0.3)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border)/0.3)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black_70%,transparent_110%)]" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto">
          {/* Announcement badge */}
          <div className="flex justify-center mb-8 animate-slide-up-fade">
            <Badge 
              variant="outline" 
              className="px-4 py-2 text-sm font-medium bg-background/80 backdrop-blur-sm border-primary/20 hover:border-primary/40 transition-all duration-300 cursor-pointer group hover-lift"
            >
              <Sparkles className="w-4 h-4 mr-2 text-primary animate-bounce-soft" />
              <span className="bg-gradient-to-r from-primary to-sandbox bg-clip-text text-transparent">
                Introducing Smart Sandbox
              </span>
              <ArrowRight className="w-4 h-4 ml-2 text-muted-foreground group-hover:translate-x-1 transition-transform duration-300" />
            </Badge>
          </div>

          {/* Main headline */}
          <div className="text-center mb-12 animate-slide-up-fade" style={{ animationDelay: '100ms', animationFillMode: 'backwards' }}>
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              <span className="block">Build faster with</span>
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-primary via-sandbox to-primary bg-[length:200%_auto] animate-gradient-shift bg-clip-text text-transparent">
                  instant sandboxes
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-primary/30" viewBox="0 0 200 10" preserveAspectRatio="none">
                  <path d="M0,5 Q50,0 100,5 T200,5" stroke="currentColor" strokeWidth="2" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Pick a template, explore with realistic data, and ship your app — 
              <span className="text-foreground font-medium"> all without writing a single line of config.</span>
            </p>
          </div>

          {/* Feature pills */}
          <div className="flex flex-wrap justify-center gap-3 mb-10 animate-scale-fade" style={{ animationDelay: '200ms', animationFillMode: 'backwards' }}>
            {[
              { icon: Zap, label: 'No setup required', color: 'text-sandbox' },
              { icon: Shield, label: 'Safe to experiment', color: 'text-success' },
              { icon: Clock, label: '2-hour sandbox', color: 'text-primary' },
            ].map((pill, index) => (
              <div 
                key={pill.label}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border/50 text-sm font-medium shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 cursor-default hover-scale-subtle"
                style={{ animationDelay: `${250 + index * 75}ms` }}
              >
                <pill.icon className={`w-4 h-4 ${pill.color}`} />
                <span>{pill.label}</span>
              </div>
            ))}
          </div>

          {/* Action tabs */}
          <div className="max-w-2xl mx-auto mb-16 animate-scale-fade" style={{ animationDelay: '300ms', animationFillMode: 'backwards' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-14 p-1.5 bg-muted/50 backdrop-blur-sm">
                <TabsTrigger 
                  value="templates" 
                  className="h-full text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300"
                >
                  <LayoutTemplate className="w-4 h-4 mr-2" />
                  Browse Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="prompt"
                  className="h-full text-base font-medium data-[state=active]:bg-background data-[state=active]:shadow-md transition-all duration-300"
                >
                  <Code2 className="w-4 h-4 mr-2" />
                  Build from Prompt
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="mt-6 animate-fade-in">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Button 
                    variant="hero" 
                    size="xl" 
                    onClick={onExploreTemplates}
                    className="w-full sm:w-auto gap-2 group hover-glow"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                    Explore Templates
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="xl" 
                    className="w-full sm:w-auto gap-2 group hover-lift"
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                    Watch Demo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="prompt" className="mt-6 animate-fade-in">
                <PromptBuilder 
                  onSubmitPrompt={onBuildFromPrompt} 
                  isGenerating={isGenerating}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Hero visual */}
          <div className="relative max-w-4xl mx-auto animate-scale-fade" style={{ animationDelay: '400ms', animationFillMode: 'backwards' }}>
            {/* Glow effects */}
            <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 via-sandbox/20 to-primary/20 rounded-3xl blur-2xl opacity-50 animate-glow-pulse" />
            
            {/* Browser mockup */}
            <div className="relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-2xl">
              {/* Browser chrome */}
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/50 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/80" />
                  <div className="w-3 h-3 rounded-full bg-sandbox/80" />
                  <div className="w-3 h-3 rounded-full bg-success/80" />
                </div>
                <div className="flex-1 flex items-center justify-center">
                  <div className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-background/80 border border-border/50 text-sm text-muted-foreground">
                    <Shield className="w-3.5 h-3.5 text-success" />
                    <span>sandbox.lovable.app/preview</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="sandbox" className="text-xs">
                    <Clock className="w-3 h-3 mr-1" />
                    1:58:30
                  </Badge>
                </div>
              </div>

              {/* Preview content */}
              <div className="relative aspect-[16/9] bg-gradient-to-br from-background to-muted/30 overflow-hidden">
                {/* Dashboard mockup */}
                <div className="absolute inset-4 grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-2 bg-card/50 backdrop-blur-sm rounded-xl border border-border/30 p-3 space-y-3">
                    <div className="h-8 w-full rounded-lg bg-primary/20 animate-pulse" />
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h-6 rounded-md bg-muted/50"
                          style={{ width: `${60 + Math.random() * 40}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="col-span-10 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-48 rounded-lg bg-muted/50" />
                      <div className="flex gap-2">
                        <div className="h-8 w-24 rounded-lg bg-primary/20" />
                        <div className="h-8 w-24 rounded-lg bg-success/20" />
                      </div>
                    </div>
                    
                    {/* Stats cards */}
                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/30 p-4 space-y-2">
                          <div className="h-4 w-16 rounded bg-muted/50" />
                          <div className="h-6 w-20 rounded bg-primary/30" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Chart area */}
                    <div className="bg-card/50 backdrop-blur-sm rounded-xl border border-border/30 p-4 h-40">
                      <div className="flex items-end justify-between h-full gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i}
                            className="flex-1 rounded-t-lg bg-gradient-to-t from-primary/40 to-primary/20"
                            style={{ height: `${30 + Math.random() * 70}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2 rounded-lg bg-sandbox/90 backdrop-blur-sm text-sandbox-foreground text-sm font-medium shadow-lg animate-bounce-soft">
                  <MousePointerClick className="w-4 h-4" />
                  Interactive Preview
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg animate-slide-right-fade animate-float" style={{ animationDelay: '600ms', animationFillMode: 'backwards' }}>
              <Rocket className="w-5 h-5 text-primary" />
              <span className="text-sm font-medium">Deploy in seconds</span>
            </div>
            
            <div className="absolute -right-4 top-1/3 hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-card/90 backdrop-blur-sm border border-border/50 shadow-lg animate-slide-left-fade animate-float-delayed" style={{ animationDelay: '700ms', animationFillMode: 'backwards' }}>
              <Zap className="w-5 h-5 text-sandbox" />
              <span className="text-sm font-medium">AI-powered data</span>
            </div>
          </div>

          {/* Highlights list */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mt-12 text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '800ms', animationFillMode: 'backwards' }}>
            {highlights.map((highlight, index) => (
              <div 
                key={highlight} 
                className="flex items-center gap-2"
                style={{ animationDelay: `${850 + index * 50}ms` }}
              >
                <CheckCircle2 className="w-4 h-4 text-success" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
