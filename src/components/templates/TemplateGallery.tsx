import { useState } from 'react';
import { Template } from '@/types/sandbox';
import { mockTemplates, templateCategories } from '@/data/mockTemplates';
import { TemplateCard } from './TemplateCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, Sparkles } from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface TemplateGalleryProps {
  onSelectTemplate: (template: Template) => void;
}

export function TemplateGallery({ onSelectTemplate }: TemplateGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();
  const { ref: gridRef, isVisible: gridVisible } = useScrollAnimation();

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="py-16 overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div 
          ref={headerRef}
          className={`text-center mb-12 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4 animate-bounce-soft">
            <Sparkles className="w-4 h-4" />
            Smart Sandbox Templates
          </div>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Start with a template, ship in minutes
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Every template comes with a sandbox — explore with realistic test data before you commit. No setup required.
          </p>
        </div>

        {/* Filters */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 mb-8 transition-all duration-500 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{ transitionDelay: '200ms' }}
        >
          <div className="relative flex-1 max-w-md group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors duration-300" />
            <Input
              placeholder="Search templates..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 transition-all duration-300 focus:ring-2 focus:ring-primary/20"
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {templateCategories.map((category, index) => (
              <Button
                key={category}
                variant={selectedCategory === category ? 'default' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                className="shrink-0 transition-all duration-300 hover:scale-105"
                style={{ transitionDelay: `${index * 30}ms` }}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Template Grid */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTemplates.map((template, index) => (
            <div
              key={template.id}
              style={{ 
                transitionDelay: gridVisible ? `${index * 100}ms` : '0ms',
                opacity: gridVisible ? 1 : 0,
                transform: gridVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.95)',
                transition: 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            >
              <TemplateCard
                template={template}
                onTrySandbox={onSelectTemplate}
                onPreview={() => {}}
              />
            </div>
          ))}
        </div>

        {filteredTemplates.length === 0 && (
          <div className="text-center py-16 animate-fade-in">
            <Filter className="w-12 h-12 text-muted-foreground mx-auto mb-4 animate-bounce-soft" />
            <h3 className="font-display text-xl font-semibold mb-2">No templates found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
