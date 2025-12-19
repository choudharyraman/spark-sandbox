import { useState } from 'react';
import { Sandbox, Template, DataQualityFeedback as Feedback } from '@/types/sandbox';
import { CustomizationWizard } from '@/components/wizard/CustomizationWizard';
import { DataQualityFeedback } from './DataQualityFeedback';
import { SandboxTimer } from './SandboxTimer';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
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
  Play,
  Pause,
  Zap,
  Eye,
  Layers,
  Settings,
  Terminal,
  Activity,
  Globe,
  Shield,
  Cpu,
  HardDrive,
  Wifi,
  CheckCircle2,
  Clock,
  TrendingUp,
  Users,
  MousePointer,
  Palette,
  LayoutGrid,
  Share2,
  Download,
  Copy,
  MoreHorizontal,
  Maximize2,
  Volume2,
  Bell
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
  const [activePanel, setActivePanel] = useState<'customize' | 'activity' | 'console'>('customize');
  const [isPlaying, setIsPlaying] = useState(true);

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

  const stats = {
    requests: 142,
    latency: '45ms',
    uptime: '99.9%',
    memory: 67
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,hsl(var(--sandbox)/0.15),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--primary)/0.1),transparent_50%)] bg-background">
      {/* Enhanced Header */}
      <header className="sticky top-0 z-50 bg-background/60 backdrop-blur-2xl border-b border-border/40">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 hover:bg-muted/80">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="h-6 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Badge variant="sandbox-solid" className="shadow-sandbox-glow pr-3">
                    <span className="relative flex h-2 w-2 mr-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sandbox-foreground opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-sandbox-foreground"></span>
                    </span>
                    Live Sandbox
                  </Badge>
                </div>
                <span className="font-display font-semibold text-foreground">{template.name}</span>
                <Badge variant="outline" className="text-xs font-mono">{template.category}</Badge>
              </div>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <SandboxTimer expiresAt={sandbox.expiresAt} />
              
              {/* Playback controls */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-muted/40 rounded-xl border border-border/30">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 rounded-lg"
                  onClick={() => onResetSandbox()}
                >
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Device toggle */}
              <div className="hidden md:flex items-center gap-1 p-1 bg-muted/40 rounded-xl border border-border/30">
                {[
                  { mode: 'desktop' as DeviceMode, icon: Monitor },
                  { mode: 'tablet' as DeviceMode, icon: Tablet },
                  { mode: 'mobile' as DeviceMode, icon: Smartphone }
                ].map(({ mode, icon: Icon }) => (
                  <Button
                    key={mode}
                    variant={deviceMode === mode ? 'default' : 'ghost'}
                    size="icon"
                    className={`h-8 w-8 rounded-lg transition-all ${deviceMode === mode ? 'shadow-md' : ''}`}
                    onClick={() => setDeviceMode(mode)}
                  >
                    <Icon className="w-4 h-4" />
                  </Button>
                ))}
              </div>

              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex border-border/50 hover:bg-muted/80">
                <Share2 className="w-4 h-4" />
                Share
              </Button>

              <Button 
                variant="success" 
                size="sm" 
                onClick={onForkProject} 
                className="gap-2 shadow-success-glow hover:shadow-success-glow/80 transition-all hover:scale-105"
              >
                <Rocket className="w-4 h-4" />
                Go Live
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Feature Toolbar */}
      <div className="border-b border-border/30 bg-background/40 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 py-2 overflow-x-auto scrollbar-hide">
            {[
              { icon: Eye, label: 'Preview', active: true },
              { icon: Code, label: 'Code' },
              { icon: Database, label: 'Data' },
              { icon: Terminal, label: 'Console' },
              { icon: Activity, label: 'Metrics' },
              { icon: Shield, label: 'Security' },
              { icon: Settings, label: 'Settings' }
            ].map(({ icon: Icon, label, active }) => (
              <Button
                key={label}
                variant={active ? 'secondary' : 'ghost'}
                size="sm"
                className={`gap-2 shrink-0 ${active ? 'bg-muted/80' : ''}`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </Button>
            ))}
            <div className="flex-1" />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { icon: Zap, label: 'Requests', value: stats.requests, suffix: '/min', color: 'text-sandbox' },
            { icon: Clock, label: 'Latency', value: stats.latency, color: 'text-success' },
            { icon: TrendingUp, label: 'Uptime', value: stats.uptime, color: 'text-primary' },
            { icon: Cpu, label: 'Memory', value: `${stats.memory}%`, color: 'text-amber-500' }
          ].map(({ icon: Icon, label, value, suffix, color }) => (
            <Card key={label} className="p-4 bg-gradient-to-br from-background to-muted/20 border-border/50 hover:border-border transition-colors">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-muted-foreground font-medium">{label}</p>
                  <p className={`text-xl font-bold font-mono ${color}`}>
                    {value}{suffix}
                  </p>
                </div>
                <div className={`p-2 rounded-lg bg-muted/50 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="flex gap-6">
          {/* Main preview area */}
          <div className="flex-1 min-w-0">
            {/* Preview frame */}
            <Card className="overflow-hidden border-border/50 shadow-2xl shadow-black/5 rounded-2xl bg-gradient-to-b from-background to-muted/5">
              {/* Browser chrome */}
              <div className="bg-gradient-to-b from-muted/80 to-muted/40 p-3 flex items-center justify-between border-b border-border/30">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-destructive/80 hover:bg-destructive cursor-pointer transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-sandbox/80 hover:bg-sandbox cursor-pointer transition-colors" />
                    <div className="w-3 h-3 rounded-full bg-success/80 hover:bg-success cursor-pointer transition-colors" />
                  </div>
                  <div className="flex items-center gap-2 ml-2">
                    <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground/50" />
                    <ArrowLeft className="w-3.5 h-3.5 text-muted-foreground/50 rotate-180" />
                    <RefreshCw className="w-3.5 h-3.5 text-muted-foreground/50" />
                  </div>
                </div>
                <div className="flex-1 max-w-xl mx-4">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-background/90 rounded-lg text-xs font-mono border border-border/30">
                    <Shield className="w-3.5 h-3.5 text-success" />
                    <Globe className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-muted-foreground truncate">{sandbox.previewUrl}</span>
                    <div className="ml-auto flex items-center gap-1">
                      <Copy className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-pointer" />
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Download className="w-3.5 h-3.5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
              
              {/* Preview content */}
              <div className="flex justify-center bg-[radial-gradient(circle_at_center,hsl(var(--muted)/0.3),transparent_70%)] p-6 min-h-[600px]">
                <div 
                  className={`${deviceWidths[deviceMode]} transition-all duration-500 ease-out bg-background rounded-xl shadow-2xl shadow-black/10 overflow-hidden border border-border/20 relative`}
                  style={{ 
                    transform: deviceMode !== 'desktop' ? 'perspective(1000px) rotateY(-2deg)' : 'none'
                  }}
                >
                  {/* Device frame decoration for mobile/tablet */}
                  {deviceMode !== 'desktop' && (
                    <div className="absolute inset-0 pointer-events-none">
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-1 bg-muted rounded-b-lg" />
                    </div>
                  )}
                  
                  {/* Simulated app content */}
                  <div className="h-[600px] overflow-hidden">
                    <SimulatedAppPreview template={template} customizations={sandbox.customizations} />
                  </div>
                  
                  {/* Interaction overlay */}
                  <div className="absolute bottom-4 right-4 flex items-center gap-2">
                    <Badge className="bg-background/90 text-foreground border border-border/50 shadow-lg backdrop-blur-sm">
                      <MousePointer className="w-3 h-3 mr-1" />
                      Interactive
                    </Badge>
                  </div>
                </div>
              </div>
            </Card>

            {/* Activity Log */}
            <Card className="mt-6 p-4 bg-gradient-to-br from-background to-muted/10 border-border/50">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-sandbox" />
                  <h3 className="font-display font-semibold">Live Activity</h3>
                  <Badge variant="outline" className="text-xs">Real-time</Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                    <Bell className="w-3 h-3" />
                    Alerts
                  </Button>
                  <Button variant="ghost" size="sm" className="h-7 text-xs gap-1">
                    <Volume2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {[
                  { time: '2s ago', event: 'User session started', type: 'info', icon: Users },
                  { time: '5s ago', event: 'API call: GET /products', type: 'success', icon: CheckCircle2 },
                  { time: '12s ago', event: 'Component rendered: ProductGrid', type: 'info', icon: Layers },
                  { time: '18s ago', event: 'Database query completed (45ms)', type: 'success', icon: Database },
                  { time: '24s ago', event: 'Style update applied', type: 'info', icon: Palette }
                ].map((log, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm p-2 rounded-lg hover:bg-muted/50 transition-colors group">
                    <log.icon className={`w-4 h-4 ${log.type === 'success' ? 'text-success' : 'text-muted-foreground'}`} />
                    <span className="text-muted-foreground font-mono text-xs">{log.time}</span>
                    <span className="flex-1 truncate group-hover:text-foreground transition-colors">{log.event}</span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Data feedback */}
            <div className="mt-6">
              <DataQualityFeedback
                feedback={sandbox.dataQuality}
                onSubmitFeedback={onSubmitFeedback}
                onRegenerate={handleRegenerate}
                isRegenerating={isRegenerating}
              />
            </div>
          </div>

          {/* Enhanced Side panel */}
          <div className="w-[400px] shrink-0 hidden lg:block space-y-4">
            {/* Panel Tabs */}
            <Card className="p-1 bg-muted/30 border-border/50">
              <div className="flex gap-1">
                {[
                  { id: 'customize', icon: Palette, label: 'Customize' },
                  { id: 'activity', icon: Activity, label: 'Activity' },
                  { id: 'console', icon: Terminal, label: 'Console' }
                ].map(({ id, icon: Icon, label }) => (
                  <Button
                    key={id}
                    variant={activePanel === id ? 'secondary' : 'ghost'}
                    size="sm"
                    className={`flex-1 gap-2 ${activePanel === id ? 'bg-background shadow-sm' : ''}`}
                    onClick={() => setActivePanel(id as typeof activePanel)}
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </Button>
                ))}
              </div>
            </Card>

            <div className="sticky top-24">
              {activePanel === 'customize' && (
                showWizard ? (
                  <CustomizationWizard
                    customizations={sandbox.customizations}
                    onUpdate={onUpdateCustomizations}
                    onForkProject={onForkProject}
                    onSkip={() => setShowWizard(false)}
                  />
                ) : (
                  <Card className="p-5 border-border/50 bg-gradient-to-br from-background to-muted/10">
                    <div className="flex items-center justify-between mb-5">
                      <h3 className="font-display font-semibold">Quick Actions</h3>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setShowWizard(true)}
                        className="text-xs"
                      >
                        Open Wizard
                      </Button>
                    </div>

                    <div className="space-y-2">
                      {[
                        { icon: Code, label: 'View Generated Schema', desc: 'Explore the code' },
                        { icon: Database, label: 'Browse Test Data', desc: 'See sample records' },
                        { icon: Sparkles, label: 'Customize with AI', desc: 'Use natural language' },
                        { icon: LayoutGrid, label: 'Component Library', desc: 'Drag & drop blocks' }
                      ].map(({ icon: Icon, label, desc }) => (
                        <Button key={label} variant="ghost" className="w-full justify-start gap-3 h-auto py-3 hover:bg-muted/50">
                          <div className="p-2 rounded-lg bg-muted/50">
                            <Icon className="w-4 h-4" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                        </Button>
                      ))}
                    </div>

                    <div className="mt-6 pt-6 border-t border-border/50">
                      <Button 
                        variant="success" 
                        className="w-full gap-2 shadow-success-glow"
                        onClick={onForkProject}
                      >
                        <Rocket className="w-4 h-4" />
                        Go Live
                        <ChevronRight className="w-4 h-4 ml-auto" />
                      </Button>
                    </div>
                  </Card>
                )
              )}

              {activePanel === 'activity' && (
                <Card className="p-5 border-border/50 bg-gradient-to-br from-background to-muted/10">
                  <h3 className="font-display font-semibold mb-4">Resource Usage</h3>
                  
                  <div className="space-y-4">
                    {[
                      { label: 'CPU Usage', value: 34, color: 'bg-primary' },
                      { label: 'Memory', value: 67, color: 'bg-sandbox' },
                      { label: 'Storage', value: 23, color: 'bg-success' },
                      { label: 'Network', value: 45, color: 'bg-amber-500' }
                    ].map(({ label, value, color }) => (
                      <div key={label}>
                        <div className="flex items-center justify-between text-sm mb-1.5">
                          <span className="text-muted-foreground">{label}</span>
                          <span className="font-mono font-medium">{value}%</span>
                        </div>
                        <Progress value={value} className="h-2" />
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/50">
                    <h4 className="font-medium text-sm mb-3">Active Connections</h4>
                    <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                      <div className="p-2 rounded-lg bg-success/10">
                        <Wifi className="w-4 h-4 text-success" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">3 Active Sessions</p>
                        <p className="text-xs text-muted-foreground">WebSocket connected</p>
                      </div>
                      <Badge variant="outline" className="text-success border-success/30">Live</Badge>
                    </div>
                  </div>
                </Card>
              )}

              {activePanel === 'console' && (
                <Card className="border-border/50 overflow-hidden">
                  <div className="p-3 bg-muted/50 border-b border-border/30 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      <span className="font-mono text-sm">Console</span>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 text-xs">Clear</Button>
                  </div>
                  <div className="p-4 bg-background font-mono text-xs space-y-2 max-h-80 overflow-y-auto">
                    <p className="text-muted-foreground">[INFO] Sandbox initialized</p>
                    <p className="text-success">[OK] Database connected</p>
                    <p className="text-success">[OK] API routes loaded</p>
                    <p className="text-muted-foreground">[INFO] Rendering components...</p>
                    <p className="text-success">[OK] Application ready</p>
                    <p className="text-primary">[DEBUG] User interaction: click</p>
                    <p className="text-muted-foreground">[INFO] Fetching data...</p>
                    <p className="text-success">[OK] Data loaded (45ms)</p>
                  </div>
                </Card>
              )}

              {/* Quick Stats */}
              <Card className="mt-4 p-4 border-border/50 bg-gradient-to-br from-sandbox/5 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-xl bg-sandbox/10">
                    <HardDrive className="w-5 h-5 text-sandbox" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Sandbox Health</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-success"></span>
                      </span>
                      <span className="text-xs text-muted-foreground">All systems operational</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
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
      <div className="px-6 py-4 border-b border-border flex items-center justify-between bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-2">
          <div 
            className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-sm shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer transition-colors">Products</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">About</span>
          <span className="hover:text-foreground cursor-pointer transition-colors">Contact</span>
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
      <div className="text-center py-8 bg-gradient-to-b from-muted/30 to-transparent rounded-2xl">
        <h1 className="text-2xl font-display font-bold mb-2">Welcome to {brandName}</h1>
        <p className="text-muted-foreground">Discover our curated collection</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <div key={i} className="rounded-xl border border-border overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
            <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 group-hover:scale-105 transition-transform" />
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
        <Badge style={{ backgroundColor: primaryColor }} className="text-white">Live</Badge>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['Users', 'Revenue', 'Growth'].map(metric => (
          <Card key={metric} className="p-4 hover:shadow-md transition-shadow">
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
                className="flex-1 rounded-t transition-all hover:opacity-100"
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
        <Button size="sm" style={{ backgroundColor: primaryColor }} className="text-white">
          Add Contact
        </Button>
      </div>
      <div className="space-y-2">
        {['Sarah Johnson', 'Mike Chen', 'Emma Wilson', 'David Brown'].map(name => (
          <Card key={name} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center font-medium">
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
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-4 shadow-lg"
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
