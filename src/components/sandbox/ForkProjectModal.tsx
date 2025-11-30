import { useState } from 'react';
import { Sandbox, Template } from '@/types/sandbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Database, 
  Palette, 
  CheckCircle2, 
  ArrowRight,
  Loader2,
  Sparkles,
  Coins,
  Globe
} from 'lucide-react';

interface ForkProjectModalProps {
  open: boolean;
  onClose: () => void;
  sandbox: Sandbox;
  template: Template;
  onFork: (options: ForkOptions) => void;
}

interface ForkOptions {
  projectName: string;
  includeTestData: boolean;
  includeCustomizations: boolean;
}

export function ForkProjectModal({ 
  open, 
  onClose, 
  sandbox, 
  template,
  onFork 
}: ForkProjectModalProps) {
  const [projectName, setProjectName] = useState(
    sandbox.customizations.brandName || template.name
  );
  const [includeTestData, setIncludeTestData] = useState(true);
  const [includeCustomizations, setIncludeCustomizations] = useState(true);
  const [isForking, setIsForking] = useState(false);

  const handleFork = async () => {
    setIsForking(true);
    
    // Simulate fork process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    onFork({
      projectName,
      includeTestData,
      includeCustomizations,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-lg gradient-success flex items-center justify-center">
              <Rocket className="w-5 h-5 text-success-foreground" />
            </div>
            <div>
              <Badge variant="success" className="mb-1 gap-1">
                <Coins className="w-3 h-3" />
                +5 Credits
              </Badge>
              <DialogTitle className="font-display text-xl">
                Go Live
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Project name */}
          <div>
            <Label htmlFor="projectName" className="mb-2 block">
              Project name
            </Label>
            <Input
              id="projectName"
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="My Awesome App"
            />
          </div>

          {/* Options */}
          <div className="space-y-3">
            <p className="text-sm font-medium">What to include:</p>
            
            <label className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
              <Checkbox
                checked={includeTestData}
                onCheckedChange={(checked) => setIncludeTestData(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Database className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Include test data</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Keep the generated sample data for testing. You can clear it later.
                </p>
              </div>
            </label>

            <label className="flex items-start gap-3 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors">
              <Checkbox
                checked={includeCustomizations}
                onCheckedChange={(checked) => setIncludeCustomizations(checked as boolean)}
                className="mt-0.5"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-muted-foreground" />
                  <span className="font-medium">Include customizations</span>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Apply your brand name, colors, and other styling changes.
                </p>
              </div>
            </label>
          </div>

          {/* What happens next */}
          <div className="p-4 rounded-xl bg-success-muted border border-success/20">
            <p className="text-sm font-medium text-success flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4" />
              What happens next
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Your app goes live on lovable.app
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Get a shareable public URL instantly
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Earn 5 Lovable credits for publishing
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-success" />
                Option to feature in Lovable Portfolio
              </li>
            </ul>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3 pt-4 border-t border-border">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleFork}
            disabled={!projectName.trim() || isForking}
            className="flex-1 gap-2"
          >
            {isForking ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Going live...
              </>
            ) : (
              <>
                <Globe className="w-4 h-4" />
                Go Live
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
