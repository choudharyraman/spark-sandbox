import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { 
  Sparkles, 
  Database, 
  Wand2, 
  GitFork, 
  Rocket, 
  Share2,
  Zap,
  Shield,
  Clock
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const features = [
  {
    icon: Sparkles,
    title: 'Live Template Preview',
    description: 'Hover to see templates in action with realistic sample data. Click through pages and test key flows instantly.',
    color: 'text-sandbox',
    bgColor: 'bg-sandbox/10',
  },
  {
    icon: Database,
    title: 'AI Data Generator',
    description: 'Automatically generates domain-appropriate synthetic data. E-commerce gets products, SaaS gets users and metrics.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Wand2,
    title: 'Customization Wizard',
    description: "Tell us what you're building and we'll tailor the data and styling. See your idea come to life in seconds.",
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
  {
    icon: GitFork,
    title: 'One-Click Fork',
    description: 'Turn any sandbox into a real project with a single click. Schema, data, and customizations come with you.',
    color: 'text-sandbox',
    bgColor: 'bg-sandbox/10',
  },
  {
    icon: Rocket,
    title: 'Instant Deploy',
    description: 'Deploy your forked project to a lovable.app subdomain immediately. Go live in minutes, not days.',
    color: 'text-primary',
    bgColor: 'bg-primary/10',
  },
  {
    icon: Share2,
    title: 'Proof Pages',
    description: 'Auto-generated shareable landing pages for your deployed apps. Perfect for showing off your work.',
    color: 'text-success',
    bgColor: 'bg-success/10',
  },
];

const stats = [
  { value: '<10s', label: 'Time to sandbox', icon: Zap },
  { value: '2hr', label: 'Sandbox lifetime', icon: Clock },
  { value: '0', label: 'Credits burned', icon: Shield },
];

export function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-24 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div 
          ref={headerRef}
          className={`text-center mb-16 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <Badge variant="outline" className="mb-4 animate-bounce-soft">How it works</Badge>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            From browsing to shipping in 6 steps
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Smart Sandbox removes every barrier between finding a template and deploying your app.
          </p>
        </div>

        {/* Stats */}
        <div ref={statsRef} className="flex flex-wrap justify-center gap-8 mb-16">
          {stats.map((stat, index) => (
            <div 
              key={stat.label} 
              className="flex items-center gap-3 px-6 py-3 rounded-xl bg-card border border-border hover-lift"
              style={{ 
                transitionDelay: statsVisible ? `${index * 100}ms` : '0ms',
                opacity: statsVisible ? 1 : 0,
                transform: statsVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <stat.icon className="w-5 h-5 text-sandbox" />
              <div>
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={feature.title}
              className="p-6 interactive-card group"
              style={{ 
                transitionDelay: gridVisible ? `${index * 80}ms` : '0ms',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(30px)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <feature.icon className={`w-6 h-6 ${feature.color}`} />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
