import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    content: "Smart Sandbox completely changed how we prototype. What used to take days now takes minutes. The AI-generated data feels so real, our clients can't tell it's a demo.",
    author: 'Sarah Chen',
    role: 'Lead Developer',
    company: 'TechCorp',
    avatar: 'SC',
    rating: 5
  },
  {
    content: "The one-click deploy feature is a game changer. I built and shipped my SaaS MVP in a single afternoon. No backend setup, no database configuration—it just works.",
    author: 'Marcus Johnson',
    role: 'Founder',
    company: 'BuildFast',
    avatar: 'MJ',
    rating: 5
  },
  {
    content: "As a designer who codes, I love that I can experiment with real data without any setup. The sandbox environment gives me the confidence to try bold ideas.",
    author: 'Emily Rodriguez',
    role: 'Product Designer',
    company: 'InnovateLab',
    avatar: 'ER',
    rating: 5
  }
];

export function TestimonialsSection() {
  return (
    <section className="py-24 bg-muted/20 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm text-primary font-medium uppercase tracking-wider mb-3">Testimonials</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Loved by developers everywhere
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            See what others are saying about their experience with Smart Sandbox
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={testimonial.author}
              className="relative p-6 bg-card/80 backdrop-blur-sm border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-300 group"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Quote icon */}
              <Quote className="absolute top-4 right-4 w-8 h-8 text-primary/10 group-hover:text-primary/20 transition-colors" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-sandbox text-sandbox" />
                ))}
              </div>

              {/* Content */}
              <p className="text-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary/10 text-primary font-medium">
                    {testimonial.avatar}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role} at {testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
