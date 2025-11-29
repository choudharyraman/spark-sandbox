import { DataQualityFeedback as Feedback } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { ThumbsUp, ThumbsDown, RefreshCw, Sparkles } from 'lucide-react';

interface DataQualityFeedbackProps {
  feedback: Feedback | undefined;
  onSubmitFeedback: (feedback: Feedback) => void;
  onRegenerate: () => void;
  isRegenerating: boolean;
}

export function DataQualityFeedback({ 
  feedback, 
  onSubmitFeedback, 
  onRegenerate,
  isRegenerating 
}: DataQualityFeedbackProps) {
  return (
    <div className="p-4 rounded-xl bg-sandbox-muted border border-sandbox-border">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="w-4 h-4 text-sandbox" />
        <span className="text-sm font-medium text-sandbox">AI-Generated Test Data</span>
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        This data was generated to match your template's schema. Does it look realistic?
      </p>

      <div className="flex items-center gap-2">
        <Button
          variant={feedback?.rating === 'positive' ? 'success' : 'outline'}
          size="sm"
          onClick={() => onSubmitFeedback({ rating: 'positive' })}
          className="gap-2"
        >
          <ThumbsUp className="w-4 h-4" />
          Looks good
        </Button>
        <Button
          variant={feedback?.rating === 'negative' ? 'destructive' : 'outline'}
          size="sm"
          onClick={() => onSubmitFeedback({ rating: 'negative' })}
          className="gap-2"
        >
          <ThumbsDown className="w-4 h-4" />
          Not great
        </Button>
        <Button
          variant="sandbox-ghost"
          size="sm"
          onClick={onRegenerate}
          disabled={isRegenerating}
          className="gap-2 ml-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isRegenerating ? 'animate-spin' : ''}`} />
          Regenerate
        </Button>
      </div>

      {feedback?.rating === 'positive' && (
        <p className="text-sm text-success mt-3 flex items-center gap-2">
          <ThumbsUp className="w-3 h-3" />
          Thanks for the feedback!
        </p>
      )}

      {feedback?.rating === 'negative' && (
        <p className="text-sm text-muted-foreground mt-3">
          We'll improve our data generation. Try regenerating for different data.
        </p>
      )}
    </div>
  );
}
