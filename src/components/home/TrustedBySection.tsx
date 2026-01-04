import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const companies = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'InnovateLab', logo: 'IL' },
  { name: 'BuildFast', logo: 'BF' },
  { name: 'ScaleUp', logo: 'SU' },
  { name: 'DevStudio', logo: 'DS' },
  { name: 'CloudNine', logo: 'C9' },
];

export function TrustedBySection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section className="py-6 border-y border-border/50 bg-muted/20 overflow-hidden">
      <div className="container mx-auto px-4">
        <div 
          ref={ref}
          className={`flex flex-col items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider font-medium">
            Trusted by innovative teams worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {companies.map((company, index) => (
              <div 
                key={company.name}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-all duration-300 group cursor-default hover-scale-subtle"
                style={{ 
                  transitionDelay: isVisible ? `${index * 80}ms` : '0ms',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(10px)'
                }}
              >
                <div className="w-8 h-8 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center font-display font-bold text-xs group-hover:border-primary/30 group-hover:bg-primary/5 group-hover:scale-110 transition-all duration-300">
                  {company.logo}
                </div>
                <span className="font-medium text-sm hidden sm:inline">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
