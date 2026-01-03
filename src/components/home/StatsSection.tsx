import { Zap, Users, Rocket, Clock } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const stats = [
  {
    icon: Users,
    value: '50K+',
    label: 'Active Developers',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  },
  {
    icon: Rocket,
    value: '100K+',
    label: 'Apps Deployed',
    color: 'text-success',
    bgColor: 'bg-success/10'
  },
  {
    icon: Zap,
    value: '<10s',
    label: 'Sandbox Creation',
    color: 'text-sandbox',
    bgColor: 'bg-sandbox/10'
  },
  {
    icon: Clock,
    value: '99.9%',
    label: 'Uptime',
    color: 'text-primary',
    bgColor: 'bg-primary/10'
  }
];

export function StatsSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  return (
    <section className="py-20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-72 h-72 bg-sandbox/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Built for speed, designed for scale
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Join thousands of developers shipping faster with Smart Sandbox
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`group relative p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50 interactive-card transition-all duration-500`}
              style={{ 
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div className={`w-12 h-12 rounded-xl ${stat.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
              <p className="font-display text-3xl md:text-4xl font-bold mb-1">{stat.value}</p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
