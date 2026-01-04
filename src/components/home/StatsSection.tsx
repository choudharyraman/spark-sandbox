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
    <section className="py-10 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-48 h-48 bg-sandbox/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className={`text-center mb-6 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <h2 className="font-display text-2xl md:text-3xl font-bold mb-2">
            Built for speed, designed for scale
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Join thousands of developers shipping faster with Smart Sandbox
          </p>
        </div>

        <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {stats.map((stat, index) => (
            <div 
              key={stat.label}
              className={`group relative p-4 rounded-xl bg-card/50 backdrop-blur-sm border border-border/50 interactive-card transition-all duration-500`}
              style={{ 
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0)' : 'translateY(30px)'
              }}
            >
              <div className={`w-10 h-10 rounded-lg ${stat.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <p className="font-display text-2xl md:text-3xl font-bold mb-0.5">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
