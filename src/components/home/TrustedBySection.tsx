import { Building2 } from 'lucide-react';

const companies = [
  { name: 'TechCorp', logo: 'TC' },
  { name: 'InnovateLab', logo: 'IL' },
  { name: 'BuildFast', logo: 'BF' },
  { name: 'ScaleUp', logo: 'SU' },
  { name: 'DevStudio', logo: 'DS' },
  { name: 'CloudNine', logo: 'C9' },
];

export function TrustedBySection() {
  return (
    <section className="py-12 border-y border-border/50 bg-muted/20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <p className="text-sm text-muted-foreground mb-8 uppercase tracking-wider font-medium">
            Trusted by innovative teams worldwide
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {companies.map((company) => (
              <div 
                key={company.name}
                className="flex items-center gap-2 text-muted-foreground/60 hover:text-muted-foreground transition-colors group cursor-default"
              >
                <div className="w-10 h-10 rounded-lg bg-muted/50 border border-border/50 flex items-center justify-center font-display font-bold text-sm group-hover:border-primary/30 group-hover:bg-primary/5 transition-all">
                  {company.logo}
                </div>
                <span className="font-medium hidden sm:inline">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
