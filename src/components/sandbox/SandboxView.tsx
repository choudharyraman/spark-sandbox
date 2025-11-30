import { useState } from 'react';
import { Sandbox, Template, DataQualityFeedback as Feedback } from '@/types/sandbox';
import { CustomizationWizard } from '@/components/wizard/CustomizationWizard';
import { DataQualityFeedback } from './DataQualityFeedback';
import { SandboxTimer } from './SandboxTimer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  ExternalLink, 
  RefreshCw, 
  Smartphone, 
  Monitor, 
  Tablet,
  Rocket,
  Code,
  Database,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';

interface SandboxViewProps {
  sandbox: Sandbox;
  template: Template;
  onBack: () => void;
  onUpdateCustomizations: (customizations: Partial<import('@/types/sandbox').SandboxCustomizations>) => void;
  onRegenerateData: () => Promise<void>;
  onSubmitFeedback: (feedback: Feedback) => void;
  onResetSandbox: () => Promise<void>;
  onForkProject: () => void;
}

type DeviceMode = 'desktop' | 'tablet' | 'mobile';

export function SandboxView({
  sandbox,
  template,
  onBack,
  onUpdateCustomizations,
  onRegenerateData,
  onSubmitFeedback,
  onResetSandbox,
  onForkProject,
}: SandboxViewProps) {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [showWizard, setShowWizard] = useState(true);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    await onRegenerateData();
    setIsRegenerating(false);
  };

  const deviceWidths: Record<DeviceMode, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass border-b border-sandbox-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-14">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2">
                <ArrowLeft className="w-4 h-4" />
                Back to templates
              </Button>
              <div className="h-6 w-px bg-border" />
              <div className="flex items-center gap-2">
                <Badge variant="sandbox-solid">Sandbox</Badge>
                <span className="font-medium">{template.name}</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <SandboxTimer expiresAt={sandbox.expiresAt} />
              
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

              <Button variant="outline" size="sm" className="gap-2">
                <ExternalLink className="w-4 h-4" />
                Open in new tab
              </Button>

              <Button variant="success" size="sm" onClick={onForkProject} className="gap-2">
                <Rocket className="w-4 h-4" />
                Go Live
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Main preview area */}
          <div className="flex-1 min-w-0">
            {/* Preview frame */}
            <Card className="overflow-hidden border-sandbox-border">
              <div className="bg-muted/50 p-3 flex items-center justify-between border-b border-border">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/60" />
                    <div className="w-3 h-3 rounded-full bg-sandbox/60" />
                    <div className="w-3 h-3 rounded-full bg-success/60" />
                  </div>
                  <div className="ml-4 px-3 py-1 bg-background rounded-md text-xs text-muted-foreground font-mono">
                    {sandbox.previewUrl}
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => onResetSandbox()}
                  className="gap-2 text-muted-foreground"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  Reset sandbox
                </Button>
              </div>
              
              <div className="flex justify-center bg-muted/30 p-4 min-h-[600px]">
                <div className={`${deviceWidths[deviceMode]} transition-all duration-300 bg-background rounded-lg shadow-xl overflow-hidden`}>
                  {/* Simulated app content */}
                  <div className="h-[600px] overflow-hidden">
                    <SimulatedAppPreview template={template} customizations={sandbox.customizations} />
                  </div>
                </div>
              </div>
            </Card>

            {/* Data feedback */}
            <div className="mt-4">
              <DataQualityFeedback
                feedback={sandbox.dataQuality}
                onSubmitFeedback={onSubmitFeedback}
                onRegenerate={handleRegenerate}
                isRegenerating={isRegenerating}
              />
            </div>
          </div>

          {/* Side panel */}
          <div className="w-[380px] shrink-0 hidden lg:block">
            {showWizard ? (
              <div className="sticky top-20">
                <CustomizationWizard
                  customizations={sandbox.customizations}
                  onUpdate={onUpdateCustomizations}
                  onForkProject={onForkProject}
                  onSkip={() => setShowWizard(false)}
                />
              </div>
            ) : (
              <Card className="p-4 border-sandbox-border sticky top-20">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-display font-semibold">Quick Actions</h3>
                  <Button 
                    variant="sandbox-ghost" 
                    size="sm"
                    onClick={() => setShowWizard(true)}
                  >
                    Open wizard
                  </Button>
                </div>

                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Code className="w-4 h-4" />
                    View generated schema
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Database className="w-4 h-4" />
                    Browse test data
                  </Button>
                  <Button variant="outline" className="w-full justify-start gap-3">
                    <Sparkles className="w-4 h-4" />
                    Customize with AI
                  </Button>
                </div>

                <div className="mt-6 pt-6 border-t border-border">
                  <Button 
                    variant="success" 
                    className="w-full gap-2"
                    onClick={onForkProject}
                  >
                    <Rocket className="w-4 h-4" />
                    Go Live
                    <ChevronRight className="w-4 h-4 ml-auto" />
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Simulated app preview component
function SimulatedAppPreview({ 
  template, 
  customizations 
}: { 
  template: Template; 
  customizations: Sandbox['customizations'];
}) {
  const brandName = customizations.brandName || template.name;
  const primaryColor = customizations.primaryColor || '#6366f1';

  return (
    <div className="h-full flex flex-col" style={{ '--preview-primary': primaryColor } as React.CSSProperties}>
      {/* Simulated navbar */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-primary-foreground font-bold text-sm"
            style={{ backgroundColor: primaryColor }}
          >
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span>Products</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Simulated content */}
      <div className="flex-1 p-6 overflow-auto">
        {template.category === 'E-Commerce' && (
          <EcommercePreview primaryColor={primaryColor} brandName={brandName} />
        )}
        {template.category === 'SaaS' && (
          <SaaSPreview primaryColor={primaryColor} brandName={brandName} />
        )}
        {template.category === 'CRM' && (
          <CRMPreview primaryColor={primaryColor} brandName={brandName} />
        )}
        {!['E-Commerce', 'SaaS', 'CRM'].includes(template.category) && (
          <GenericPreview primaryColor={primaryColor} brandName={brandName} />
        )}
      </div>
    </div>
  );
}

function EcommercePreview({ primaryColor, brandName }: { primaryColor: string; brandName: string }) {
  return (
    <div className="space-y-6">
      <div className="text-center py-8">
        <h1 className="text-2xl font-display font-bold mb-2">Welcome to {brandName}</h1>
        <p className="text-muted-foreground">Discover our curated collection</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-lg border border-border overflow-hidden">
            <div className="aspect-square bg-muted" />
            <div className="p-3">
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-3 bg-muted rounded w-1/2" />
              <div className="mt-3">
                <span className="font-semibold" style={{ color: primaryColor }}>$99.99</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SaaSPreview({ primaryColor, brandName }: { primaryColor: string; brandName: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-display font-bold">Dashboard</h1>
        <Badge style={{ backgroundColor: primaryColor }} className="text-primary-foreground">Live</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['Users', 'Revenue', 'Growth'].map(metric => (
          <Card key={metric} className="p-4">
            <p className="text-sm text-muted-foreground mb-1">{metric}</p>
            <p className="text-2xl font-bold" style={{ color: primaryColor }}>
              {metric === 'Revenue' ? '$12,450' : metric === 'Users' ? '1,234' : '+23%'}
            </p>
          </Card>
        ))}
      </div>
      <Card className="p-4">
        <div className="h-40 bg-gradient-to-t from-muted/50 to-transparent rounded flex items-end">
          <div className="flex items-end gap-2 w-full px-4">
            {[40, 65, 45, 80, 55, 70, 90].map((h, i) => (
              <div 
                key={i}
                className="flex-1 rounded-t"
                style={{ height: `${h}%`, backgroundColor: primaryColor, opacity: 0.6 + (i * 0.05) }}
              />
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
}

function CRMPreview({ primaryColor, brandName }: { primaryColor: string; brandName: string }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-display font-bold">Contacts</h1>
        <Button size="sm" style={{ backgroundColor: primaryColor }} className="text-primary-foreground">
          Add Contact
        </Button>
      </div>
      <div className="space-y-2">
        {['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown'].map(name => (
          <Card key={name} className="p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-medium">
              {name.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="flex-1">
              <p className="font-medium">{name}</p>
              <p className="text-sm text-muted-foreground">{name.toLowerCase().replace(' ', '.')}@example.com</p>
            </div>
            <Badge variant="outline">Lead</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}

function GenericPreview({ primaryColor, brandName }: { primaryColor: string; brandName: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-primary-foreground text-2xl font-bold mb-4"
        style={{ backgroundColor: primaryColor }}
      >
        {brandName.charAt(0)}
      </div>
      <h1 className="text-2xl font-display font-bold mb-2">{brandName}</h1>
      <p className="text-muted-foreground max-w-md">
        This is your sandbox preview. Explore the template and customize it to match your vision.
      </p>
    </div>
  );
}
