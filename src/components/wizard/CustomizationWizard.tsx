import { useState } from 'react';
import { SandboxCustomizations, WizardStep } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Palette, 
  Rocket,
  CheckCircle2,
  Sparkles
} from 'lucide-react';

interface CustomizationWizardProps {
  customizations: SandboxCustomizations;
  onUpdate: (customizations: Partial<SandboxCustomizations>) => void;
  onForkProject: () => void;
  onSkip: () => void;
}

const categories = [
  'E-Commerce', 'SaaS', 'Marketplace', 'Portfolio', 'Blog', 
  'Agency', 'Healthcare', 'Education', 'Finance', 'Other'
];

const colorPresets = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Sky', value: '#0ea5e9' },
  { name: 'Violet', value: '#8b5cf6' },
];

export function CustomizationWizard({ 
  customizations, 
  onUpdate, 
  onForkProject,
  onSkip 
}: CustomizationWizardProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const steps: WizardStep[] = [
    { id: 0, title: 'Your Idea', description: "What are you building?", isCompleted: !!customizations.description, isActive: currentStep === 0 },
    { id: 1, title: 'Look & Feel', description: 'Customize the style', isCompleted: !!customizations.primaryColor || !!customizations.brandName, isActive: currentStep === 1 },
    { id: 2, title: 'Launch', description: 'Create your project', isCompleted: false, isActive: currentStep === 2 },
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="description" className="text-base font-medium mb-2 block">
                Describe what you're building
              </Label>
              <Textarea
                id="description"
                placeholder="e.g., A marketplace for handmade jewelry where artisans can sell directly to customers..."
                value={customizations.description || ''}
                onChange={(e) => onUpdate({ description: e.target.value })}
                className="min-h-[100px] resize-none"
              />
              <p className="text-xs text-muted-foreground mt-2">
                We'll use this to generate more relevant test data for your sandbox.
              </p>
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">
                Select a category
              </Label>
              <div className="flex flex-wrap gap-2">
                {categories.map(category => (
                  <Button
                    key={category}
                    variant={customizations.category === category ? 'sandbox' : 'outline'}
                    size="sm"
                    onClick={() => onUpdate({ category })}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="brandName" className="text-base font-medium mb-2 block">
                Brand name
              </Label>
              <Input
                id="brandName"
                placeholder="Your App Name"
                value={customizations.brandName || ''}
                onChange={(e) => onUpdate({ brandName: e.target.value })}
              />
            </div>

            <div>
              <Label className="text-base font-medium mb-3 block">
                Primary color
              </Label>
              <div className="flex flex-wrap gap-3">
                {colorPresets.map(color => (
                  <button
                    key={color.value}
                    onClick={() => onUpdate({ primaryColor: color.value })}
                    className={`w-12 h-12 rounded-xl transition-all duration-200 hover:scale-110 ${
                      customizations.primaryColor === color.value 
                        ? 'ring-2 ring-offset-2 ring-primary scale-110' 
                        : ''
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
                <div className="relative">
                  <input
                    type="color"
                    value={customizations.primaryColor || '#6366f1'}
                    onChange={(e) => onUpdate({ primaryColor: e.target.value })}
                    className="w-12 h-12 rounded-xl cursor-pointer appearance-none border-2 border-dashed border-border"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border">
              <p className="text-sm text-muted-foreground">
                <Sparkles className="w-4 h-4 inline mr-2 text-sandbox" />
                Changes will be applied live in the sandbox preview.
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="text-center py-6">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <Rocket className="w-10 h-10 text-primary-foreground" />
            </div>

            <h3 className="font-display text-2xl font-bold mb-2">
              Ready to make it real?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
              Convert this sandbox into a live Lovable project. Your customizations and test data will be preserved.
            </p>

            <div className="space-y-3">
              <Button 
                variant="hero" 
                size="xl" 
                onClick={onForkProject}
                className="w-full gap-2"
              >
                <Rocket className="w-5 h-5" />
                Go Live
              </Button>
              
              <p className="text-xs text-muted-foreground">
                🎉 Earn 5 credits when you publish!
              </p>
            </div>
          </div>
        );
    }
  };

  const StepIcon = [Lightbulb, Palette, Rocket][currentStep];

  return (
    <Card className="p-6 border-sandbox-border bg-card">
      {/* Progress steps */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div 
              className={`flex items-center gap-2 cursor-pointer transition-colors ${
                step.isActive ? 'text-sandbox' : 
                step.isCompleted ? 'text-success' : 'text-muted-foreground'
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step.isActive ? 'bg-sandbox text-sandbox-foreground' :
                step.isCompleted ? 'bg-success text-success-foreground' : 'bg-muted'
              }`}>
                {step.isCompleted ? <CheckCircle2 className="w-4 h-4" /> : index + 1}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{step.title}</span>
            </div>
            {index < steps.length - 1 && (
              <div className={`w-8 sm:w-16 h-0.5 mx-2 ${
                step.isCompleted ? 'bg-success' : 'bg-border'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step header */}
      {currentStep < 2 && (
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-sandbox-muted flex items-center justify-center">
            <StepIcon className="w-5 h-5 text-sandbox" />
          </div>
          <div>
            <Badge variant="sandbox" className="mb-1">Step {currentStep + 1} of 3</Badge>
            <h3 className="font-display text-lg font-semibold">{steps[currentStep].description}</h3>
          </div>
        </div>
      )}

      {/* Step content */}
      {renderStepContent()}

      {/* Navigation */}
      {currentStep < 2 && (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="ghost"
            onClick={() => currentStep > 0 ? setCurrentStep(currentStep - 1) : onSkip()}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            {currentStep > 0 ? 'Back' : 'Skip wizard'}
          </Button>
          <Button
            variant="sandbox"
            onClick={() => setCurrentStep(currentStep + 1)}
            className="gap-2"
          >
            Continue
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      )}
    </Card>
  );
}
