import { useState } from 'react';
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
  MousePointerClick,
  Rocket,
  CheckCircle2,
  Code2,
  ArrowUpRight
} from 'lucide-react';
import { PromptBuilder } from './PromptBuilder';

interface HeroSectionProps {
  onExploreTemplates: () => void;
  onBuildFromPrompt: (prompt: string) => void;
  isGenerating?: boolean;
}

export function HeroSection({ onExploreTemplates, onBuildFromPrompt, isGenerating = false }: HeroSectionProps) {
  const [activeTab, setActiveTab] = useState<string>('templates');

  const highlights = [
    'Instant preview with real data',
    'One-click deploy to production',
    'Zero configuration needed',
    'Fork and customize anytime'
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-20 min-h-screen">
      {/* Brutalist grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 striped-bg opacity-30" />
        <div className="absolute top-0 left-0 w-1/2 h-full bg-accent/10" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary/10" />
        
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:6rem_6rem] opacity-20" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-6xl mx-auto">
          {/* Announcement banner */}
          <div className="flex justify-start mb-12 animate-fade-in">
            <div className="inline-flex items-center gap-3 px-4 py-2 bg-sandbox text-sandbox-foreground border-2 border-border shadow-md">
              <Sparkles className="w-4 h-4" />
              <span className="font-mono text-sm uppercase tracking-wider font-semibold">
                Introducing Smart Sandbox
              </span>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>

          {/* Main headline - Asymmetric layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
            <div className="lg:col-span-7 animate-slide-up">
              <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter leading-[0.9] uppercase">
                <span className="block">Build</span>
                <span className="block text-primary">Faster</span>
                <span className="block">With</span>
                <span className="inline-block bg-accent text-accent-foreground px-4 py-1 border-2 border-border shadow-lg -rotate-1">
                  Sandboxes
                </span>
              </h1>
            </div>
            
            <div className="lg:col-span-5 flex flex-col justify-end animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <p className="text-xl text-muted-foreground leading-relaxed mb-8 font-serif">
                Pick a template, explore with realistic data, and ship your app — 
                <span className="text-foreground font-semibold"> all without writing a single line of config.</span>
              </p>
              
              {/* Feature pills - stacked */}
              <div className="flex flex-col gap-2">
                {[
                  { icon: Zap, label: 'No setup required', color: 'bg-sandbox' },
                  { icon: Shield, label: 'Safe to experiment', color: 'bg-success' },
                  { icon: Clock, label: '2-hour sandbox', color: 'bg-primary' },
                ].map((pill) => (
                  <div 
                    key={pill.label}
                    className={`flex items-center gap-3 px-4 py-3 ${pill.color} text-foreground border-2 border-border shadow-sm font-mono text-sm uppercase tracking-wide`}
                  >
                    <pill.icon className="w-4 h-4" />
                    <span>{pill.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action tabs - Brutalist style */}
          <div className="max-w-3xl mb-20 animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 h-16 p-0 bg-transparent gap-0 border-2 border-border">
                <TabsTrigger 
                  value="templates" 
                  className="h-full text-base font-semibold uppercase tracking-wide data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=inactive]:bg-background border-r-2 border-border rounded-none"
                >
                  <LayoutTemplate className="w-5 h-5 mr-2" />
                  Browse Templates
                </TabsTrigger>
                <TabsTrigger 
                  value="prompt"
                  className="h-full text-base font-semibold uppercase tracking-wide data-[state=active]:bg-secondary data-[state=active]:text-secondary-foreground data-[state=inactive]:bg-background rounded-none"
                >
                  <Code2 className="w-5 h-5 mr-2" />
                  Build from Prompt
                </TabsTrigger>
              </TabsList>

              <TabsContent value="templates" className="mt-6">
                <div className="flex flex-col sm:flex-row items-start gap-4">
                  <Button 
                    size="lg" 
                    onClick={onExploreTemplates}
                    className="gap-2 group bg-primary text-primary-foreground border-2 border-border shadow-md hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all font-semibold uppercase tracking-wide h-14 px-8"
                  >
                    <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    Explore Templates
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="gap-2 group border-2 border-border shadow-md hover:shadow-lg hover:-translate-x-1 hover:-translate-y-1 transition-all font-semibold uppercase tracking-wide h-14 px-8"
                  >
                    <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                    Watch Demo
                  </Button>
                </div>
              </TabsContent>

              <TabsContent value="prompt" className="mt-6">
                <PromptBuilder 
                  onSubmitPrompt={onBuildFromPrompt} 
                  isGenerating={isGenerating}
                />
              </TabsContent>
            </Tabs>
          </div>

          {/* Hero visual - Brutalist browser mockup */}
          <div className="relative max-w-5xl mx-auto animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {/* Browser mockup */}
            <div className="relative border-2 border-border bg-card shadow-xl">
              {/* Browser chrome */}
              <div className="flex items-center justify-between px-4 py-3 bg-secondary border-b-2 border-border">
                <div className="flex gap-2">
                  <div className="w-4 h-4 bg-destructive border border-border" />
                  <div className="w-4 h-4 bg-accent border border-border" />
                  <div className="w-4 h-4 bg-success border border-border" />
                </div>
                <div className="flex items-center gap-2 px-4 py-1 bg-background border-2 border-border font-mono text-sm">
                  <Shield className="w-3.5 h-3.5 text-success" />
                  <span>sandbox.lovable.app/preview</span>
                </div>
                <Badge className="bg-sandbox text-sandbox-foreground border-2 border-border font-mono text-xs uppercase">
                  <Clock className="w-3 h-3 mr-1" />
                  1:58:30
                </Badge>
              </div>

              {/* Preview content */}
              <div className="relative aspect-[16/9] bg-background overflow-hidden">
                {/* Dashboard mockup */}
                <div className="absolute inset-4 grid grid-cols-12 gap-4">
                  {/* Sidebar */}
                  <div className="col-span-2 bg-card border-2 border-border p-3 space-y-3">
                    <div className="h-10 w-full bg-primary border-2 border-border" />
                    <div className="space-y-2">
                      {[...Array(5)].map((_, i) => (
                        <div 
                          key={i} 
                          className="h-8 bg-muted border border-border"
                          style={{ width: `${60 + Math.random() * 40}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  
                  {/* Main content */}
                  <div className="col-span-10 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="h-10 w-48 bg-muted border-2 border-border" />
                      <div className="flex gap-2">
                        <div className="h-10 w-24 bg-primary border-2 border-border" />
                        <div className="h-10 w-24 bg-success border-2 border-border" />
                      </div>
                    </div>
                    
                    {/* Stats cards */}
                    <div className="grid grid-cols-4 gap-3">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="bg-card border-2 border-border p-4 space-y-2">
                          <div className="h-4 w-16 bg-muted" />
                          <div className="h-8 w-20 bg-accent border-2 border-border" />
                        </div>
                      ))}
                    </div>
                    
                    {/* Chart area */}
                    <div className="bg-card border-2 border-border p-4 h-40">
                      <div className="flex items-end justify-between h-full gap-2">
                        {[...Array(12)].map((_, i) => (
                          <div 
                            key={i}
                            className="flex-1 bg-primary border-2 border-border"
                            style={{ height: `${30 + Math.random() * 70}%` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Interactive overlay */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2 px-4 py-2 bg-sandbox text-sandbox-foreground border-2 border-border shadow-md font-mono text-sm uppercase tracking-wide animate-bounce-slow">
                  <MousePointerClick className="w-4 h-4" />
                  Interactive Preview
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-6 top-1/4 hidden lg:flex items-center gap-2 px-4 py-3 bg-background border-2 border-border shadow-lg rotate-[-2deg] animate-fade-in" style={{ animationDelay: '0.6s' }}>
              <Rocket className="w-5 h-5 text-primary" />
              <span className="font-mono text-sm uppercase tracking-wide">Deploy in seconds</span>
            </div>
            
            <div className="absolute -right-6 top-1/3 hidden lg:flex items-center gap-2 px-4 py-3 bg-accent text-accent-foreground border-2 border-border shadow-lg rotate-[2deg] animate-fade-in" style={{ animationDelay: '0.7s' }}>
              <Zap className="w-5 h-5" />
              <span className="font-mono text-sm uppercase tracking-wide">AI-powered data</span>
            </div>
          </div>

          {/* Highlights list */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4 mt-16 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            {highlights.map((highlight) => (
              <div key={highlight} className="flex items-center gap-2 px-4 py-2 bg-card border-2 border-border shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-success" />
                <span className="font-mono text-sm uppercase tracking-wide">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}