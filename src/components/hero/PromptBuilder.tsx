import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, ArrowRight, Lightbulb } from 'lucide-react';

interface PromptBuilderProps {
  onSubmitPrompt: (prompt: string) => void;
  isGenerating: boolean;
}

const examplePrompts = [
  "A marketplace for vintage vinyl records with seller profiles and wishlist",
  "A project management dashboard with kanban boards and team analytics",
  "A restaurant booking system with table availability and reviews",
  "A fitness tracking app with workout plans and progress charts",
];

export function PromptBuilder({ onSubmitPrompt, isGenerating }: PromptBuilderProps) {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = () => {
    if (prompt.trim()) {
      onSubmitPrompt(prompt.trim());
    }
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <Card className="p-6 border-primary/20 bg-card/50 backdrop-blur">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-primary-foreground" />
        </div>
        <h3 className="font-display font-semibold">Build from Prompt</h3>
        <Badge variant="sandbox" className="ml-auto">AI-Powered</Badge>
      </div>

      <Textarea
        placeholder="Describe what you want to build... e.g., 'A booking platform for yoga studios with class schedules and instructor profiles'"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        className="min-h-[100px] resize-none mb-4"
      />

      <Button 
        variant="hero" 
        className="w-full gap-2 mb-4"
        onClick={handleSubmit}
        disabled={!prompt.trim() || isGenerating}
      >
        {isGenerating ? (
          <>
            <Sparkles className="w-4 h-4 animate-spin" />
            Generating prototype...
          </>
        ) : (
          <>
            <Sparkles className="w-4 h-4" />
            Generate Prototype
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </Button>

      {/* Example prompts */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Lightbulb className="w-3 h-3" />
          <span>Try an example:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {examplePrompts.map((example, i) => (
            <button
              key={i}
              onClick={() => handleExampleClick(example)}
              className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-muted/80 transition-colors text-left truncate max-w-[200px]"
            >
              {example}
            </button>
          ))}
        </div>
      </div>
    </Card>
  );
}
