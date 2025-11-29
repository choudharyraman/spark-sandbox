import { useState } from 'react';
import { Template } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Play, Eye, Star, Users, ArrowRight } from 'lucide-react';

interface TemplateCardProps {
  template: Template;
  onTrySandbox: (template: Template) => void;
  onPreview: (template: Template) => void;
}

export function TemplateCard({ template, onTrySandbox, onPreview }: TemplateCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="group relative overflow-hidden bg-card border border-border hover:border-primary/30 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Thumbnail */}
      <div className="relative aspect-[16/10] bg-muted overflow-hidden">
        <img 
          src={template.thumbnail} 
          alt={template.name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5" />
        
        {/* Preview overlay on hover */}
        <div className={`absolute inset-0 bg-foreground/80 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <Button 
            variant="sandbox" 
            size="sm"
            onClick={() => onTrySandbox(template)}
            className="gap-2"
          >
            <Play className="w-4 h-4" />
            Try with test data
          </Button>
          <Button 
            variant="glass" 
            size="sm"
            onClick={() => onPreview(template)}
            className="gap-2 text-primary-foreground"
          >
            <Eye className="w-4 h-4" />
            Preview
          </Button>
        </div>

        {/* Category badge */}
        <Badge className="absolute top-3 left-3 bg-background/90 backdrop-blur-sm text-foreground border-0">
          {template.category}
        </Badge>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-display font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
            {template.name}
          </h3>
          <div className="flex items-center gap-1 text-muted-foreground text-sm shrink-0">
            <Users className="w-3.5 h-3.5" />
            <span>{template.popularity.toLocaleString()}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
          {template.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {template.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-secondary rounded-md text-secondary-foreground"
            >
              {tag}
            </span>
          ))}
          {template.tags.length > 3 && (
            <span className="text-xs px-2 py-0.5 text-muted-foreground">
              +{template.tags.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-sm text-muted-foreground">
            by {template.author}
          </span>
          <Button 
            variant="ghost" 
            size="sm" 
            className="gap-1 text-primary hover:text-primary"
            onClick={() => onTrySandbox(template)}
          >
            Start sandbox
            <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </Card>
  );
}
