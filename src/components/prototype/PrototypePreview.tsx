import { useState } from 'react';
import { Prototype, Template } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ArrowLeft, 
  FlaskConical, 
  Monitor, 
  Tablet, 
  Smartphone,
  ExternalLink,
  Sparkles,
  RefreshCw
} from 'lucide-react';

interface PrototypePreviewProps {
  prototype: Prototype;
  template?: Template;
  onBack: () => void;
  onTestInSandbox: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function PrototypePreview({
  prototype,
  template,
  onBack,
  onTestInSandbox,
}: PrototypePreviewProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');

  const deviceWidths: Record<DeviceMode, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Test in Sandbox CTA */}
      <header className="sticky top-0 z-50 glass border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Badge variant="outline">Prototype</Badge>
                <span className="font-medium">{prototype.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Device toggles */}
              <div className="hidden sm:flex items-center gap-1 p-1 bg-muted rounded-lg">
                <Button
                  variant={deviceMode === 'desktop' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDeviceMode('desktop')}
                >
                  <Monitor className="w-4 h-4" />
                </Button>
                <Button
                  variant={deviceMode === 'tablet' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDeviceMode('tablet')}
                >
                  <Tablet className="w-4 h-4" />
                </Button>
                <Button
                  variant={deviceMode === 'mobile' ? 'default' : 'ghost'}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setDeviceMode('mobile')}
                >
                  <Smartphone className="w-4 h-4" />
                </Button>
              </div>

              {/* Primary CTA - Test in Sandbox */}
              <Button 
                variant="sandbox" 
                size="default" 
                onClick={onTestInSandbox}
                className="gap-2 animate-pulse-soft"
              >
                <FlaskConical className="w-4 h-4" />
                Test in Sandbox
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sandbox banner */}
      <div className="bg-sandbox/10 border-b border-sandbox/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-sm">
            <FlaskConical className="w-4 h-4 text-sandbox" />
            <span className="text-sandbox-foreground">
              <strong>Ready for testing!</strong> Click "Test in Sandbox" to try with realistic data, customize, and go live.
            </span>
            <Sparkles className="w-4 h-4 text-sandbox" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Preview frame */}
        <Card className="overflow-hidden border-border">
          <div className="bg-muted/50 p-3 flex items-center justify-between border-b border-border">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-destructive/60" />
                <div className="w-3 h-3 rounded-full bg-sandbox/60" />
                <div className="w-3 h-3 rounded-full bg-success/60" />
              </div>
              <div className="ml-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground font-mono">
                {prototype.previewUrl}
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground">
              <ExternalLink className="w-3.5 h-3.5" />
              Open in new tab
            </Button>
          </div>
          
          <div className="flex justify-center bg-muted/30 p-4 min-h-[600px]">
            <div className={`${deviceWidths[deviceMode]} transition-all duration-300 bg-background rounded-lg shadow-xl overflow-hidden`}>
              {/* Simulated prototype content */}
              <div className="h-[600px] overflow-hidden">
                <PrototypeContent prototype={prototype} template={template} />
              </div>
            </div>
          </div>
        </Card>

        {/* Info cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <Card className="p-4 border-sandbox/20 bg-sandbox/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-sandbox/20 flex items-center justify-center">
                <FlaskConical className="w-5 h-5 text-sandbox" />
              </div>
              <div>
                <p className="font-medium">Test with Real Data</p>
                <p className="text-sm text-muted-foreground">AI generates realistic test data</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-primary/20 bg-primary/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Customize Everything</p>
                <p className="text-sm text-muted-foreground">Brand, colors, content</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-4 border-success/20 bg-success/5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium">No Credit Burn</p>
                <p className="text-sm text-muted-foreground">Safe experimentation</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PrototypeContent({ 
  prototype, 
  template 
}: { 
  prototype: Prototype; 
  template?: Template;
}) {
  return (
    <div className="h-full flex flex-col">
      {/* Simulated navbar */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
            {prototype.name.charAt(0)}
          </div>
          <span className="font-display font-semibold">{prototype.name}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Features</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Content placeholder */}
      <div className="flex-1 p-8 flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-2xl gradient-primary flex items-center justify-center mb-6">
          <Sparkles className="w-10 h-10 text-primary-foreground" />
        </div>
        <h2 className="font-display text-2xl font-bold mb-3">{prototype.name}</h2>
        <p className="text-muted-foreground max-w-md mb-6">
          {prototype.description || "Your prototype is ready! Test it in the sandbox to see it working with realistic data."}
        </p>
        <Badge variant="outline" className="gap-2">
          {template ? `Built from ${template.name}` : 'Built from prompt'}
        </Badge>
      </div>
    </div>
  );
}
