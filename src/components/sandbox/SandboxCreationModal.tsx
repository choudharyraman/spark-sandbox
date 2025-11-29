import { useEffect, useState } from 'react';
import { Template } from '@/types/sandbox';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Database, Sparkles, Server, CheckCircle2, Loader2 } from 'lucide-react';

interface SandboxCreationModalProps {
  open: boolean;
  template: Template | null;
  onComplete: () => void;
}

const creationSteps = [
  { id: 'env', label: 'Creating sandbox environment', icon: Server, duration: 800 },
  { id: 'schema', label: 'Setting up database schema', icon: Database, duration: 700 },
  { id: 'data', label: 'Generating realistic test data', icon: Sparkles, duration: 1000 },
];

export function SandboxCreationModal({ open, template, onComplete }: SandboxCreationModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  useEffect(() => {
    if (!open) {
      setCurrentStep(0);
      setProgress(0);
      setCompletedSteps([]);
      return;
    }

    let totalDuration = 0;
    creationSteps.forEach((step, index) => {
      totalDuration += step.duration;
      
      setTimeout(() => {
        setCurrentStep(index);
        setCompletedSteps(prev => [...prev, index]);
      }, totalDuration);
    });

    // Progress bar animation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    // Complete after all steps
    const totalTime = creationSteps.reduce((sum, step) => sum + step.duration, 0);
    const completeTimeout = setTimeout(() => {
      onComplete();
    }, totalTime + 300);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(completeTimeout);
    };
  }, [open, onComplete]);

  if (!template) return null;

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md border-sandbox-border bg-card" hideCloseButton>
        <div className="text-center py-4">
          {/* Animated icon */}
          <div className="relative w-20 h-20 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full bg-sandbox/20 animate-ping" />
            <div className="relative w-20 h-20 rounded-full gradient-sandbox flex items-center justify-center">
              <Sparkles className="w-10 h-10 text-sandbox-foreground" />
            </div>
          </div>

          <Badge variant="sandbox" className="mb-4">
            Creating Sandbox
          </Badge>

          <h3 className="font-display text-xl font-semibold mb-2">
            Spinning up your sandbox
          </h3>
          <p className="text-muted-foreground text-sm mb-6">
            Setting up {template.name} with test data
          </p>

          {/* Progress bar */}
          <div className="mb-6">
            <Progress value={progress} className="h-2 bg-sandbox-muted [&>div]:gradient-sandbox" />
            <p className="text-xs text-muted-foreground mt-2">{Math.round(progress)}%</p>
          </div>

          {/* Steps */}
          <div className="space-y-3 text-left">
            {creationSteps.map((step, index) => {
              const Icon = step.icon;
              const isCompleted = completedSteps.includes(index);
              const isCurrent = currentStep === index && !isCompleted;

              return (
                <div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                    isCompleted ? 'bg-success-muted' : isCurrent ? 'bg-sandbox-muted' : 'bg-muted/50'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-success text-success-foreground' : 
                    isCurrent ? 'bg-sandbox text-sandbox-foreground' : 'bg-muted text-muted-foreground'
                  }`}>
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                  </div>
                  <span className={`text-sm ${isCompleted ? 'text-success' : isCurrent ? 'text-sandbox font-medium' : 'text-muted-foreground'}`}>
                    {step.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
