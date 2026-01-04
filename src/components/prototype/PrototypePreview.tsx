import { useState } from 'react';
import { Prototype, Template } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  ArrowLeft, 
  FlaskConical, 
  Monitor, 
  Tablet, 
  Smartphone,
  ExternalLink,
  Sparkles,
  RefreshCw,
  ShoppingCart,
  Star,
  Heart,
  TrendingUp,
  Users,
  DollarSign,
  BarChart3,
  PieChart,
  Activity,
  Calendar,
  Mail,
  Phone,
  Building2,
  Tag,
  Filter,
  Search,
  Bell,
  Settings,
  ChevronRight,
  Play,
  FileText,
  MessageSquare,
  Clock,
  CheckCircle2,
  ArrowUpRight,
  Zap,
  Shield,
  Globe,
  Layers
} from 'lucide-react';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

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
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation();

  const deviceWidths: Record<DeviceMode, string> = {
    desktop: 'w-full',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]',
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,hsl(var(--primary)/0.08),transparent_50%),radial-gradient(ellipse_at_bottom_right,hsl(var(--sandbox)/0.08),transparent_50%)] bg-background">
      {/* Header with Test in Sandbox CTA */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border/50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={onBack} className="gap-2 hover:bg-muted/80">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="h-6 w-px bg-border/50" />
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                  <span className="relative flex h-2 w-2 mr-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                  </span>
                  Prototype Ready
                </Badge>
                <span className="font-display font-semibold text-foreground">{prototype.name}</span>
                {template && (
                  <Badge variant="outline" className="text-xs font-mono hidden sm:inline-flex">{template.category}</Badge>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Device toggles */}
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

              <Button variant="outline" size="sm" className="gap-2 hidden sm:flex border-border/50">
                <ExternalLink className="w-4 h-4" />
                Open
              </Button>

              {/* Primary CTA - Test in Sandbox */}
              <Button 
                variant="sandbox" 
                size="default" 
                onClick={onTestInSandbox}
                className="gap-2 shadow-lg hover:shadow-sandbox/25 transition-all hover:scale-105"
              >
                <FlaskConical className="w-4 h-4" />
                Test in Sandbox
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Sandbox banner */}
      <div className="bg-gradient-to-r from-sandbox/10 via-primary/5 to-sandbox/10 border-b border-sandbox/20">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center gap-3 text-sm">
            <FlaskConical className="w-4 h-4 text-sandbox animate-bounce-soft" />
            <span>
              <strong className="text-foreground">Ready for testing!</strong>
              <span className="text-muted-foreground ml-1">Click "Test in Sandbox" to try with realistic data, customize, and go live.</span>
            </span>
            <Sparkles className="w-4 h-4 text-sandbox animate-pulse" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        {/* Preview frame */}
        <Card className="overflow-hidden border-border/50 shadow-2xl shadow-black/5 rounded-2xl bg-gradient-to-b from-background to-muted/5 animate-fade-in">
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
                <span className="text-muted-foreground truncate">{prototype.previewUrl}</span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="gap-2 text-muted-foreground text-xs">
              <ExternalLink className="w-3.5 h-3.5" />
              Open in new tab
            </Button>
          </div>
          
          <div className="flex justify-center bg-[radial-gradient(circle_at_center,hsl(var(--muted)/0.3),transparent_70%)] p-6 min-h-[650px]">
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
              
              {/* Simulated prototype content based on template */}
              <div className="h-[650px] overflow-hidden">
                <PrototypeContent prototype={prototype} template={template} />
              </div>
            </div>
          </div>
        </Card>

        {/* Feature highlights */}
        <div 
          ref={headerRef}
          className={`grid grid-cols-1 md:grid-cols-4 gap-4 mt-8 transition-all duration-700 ${
            headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {[
            { icon: FlaskConical, title: 'Test with Real Data', desc: 'AI generates realistic test data', color: 'sandbox', delay: 0 },
            { icon: Sparkles, title: 'Customize Everything', desc: 'Brand, colors, and content', color: 'primary', delay: 100 },
            { icon: RefreshCw, title: 'No Credit Burn', desc: 'Safe experimentation zone', color: 'success', delay: 200 },
            { icon: Zap, title: 'Instant Deploy', desc: 'Go live in one click', color: 'amber', delay: 300 }
          ].map(({ icon: Icon, title, desc, color, delay }) => (
            <Card 
              key={title}
              className={`p-5 border-${color}/20 bg-gradient-to-br from-${color}/5 to-transparent hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group cursor-pointer`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl bg-${color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-6 h-6 text-${color}`} />
                </div>
                <div>
                  <p className="font-semibold text-foreground">{title}</p>
                  <p className="text-sm text-muted-foreground">{desc}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Template info card */}
        {template && (
          <Card className="mt-6 p-6 border-border/50 bg-gradient-to-br from-background to-muted/10 animate-fade-in" style={{ animationDelay: '400ms' }}>
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border border-border/50 shadow-lg">
                  <img src={template.thumbnail} alt={template.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg">{template.name}</h3>
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{template.category}</Badge>
                    <span className="text-xs text-muted-foreground">by {template.author}</span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {template.popularity.toLocaleString()} users
                    </span>
                  </div>
                </div>
              </div>
              <Button 
                variant="sandbox" 
                size="lg"
                onClick={onTestInSandbox}
                className="gap-2 shadow-lg hover:shadow-sandbox/25 transition-all hover:scale-105 w-full md:w-auto"
              >
                <FlaskConical className="w-5 h-5" />
                Test in Sandbox
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        )}
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
  const category = template?.category || 'Custom';
  const brandName = prototype.name || template?.name || 'My App';

  // Render different previews based on template category
  if (category === 'E-Commerce') {
    return <EcommercePrototype brandName={brandName} />;
  }
  if (category === 'SaaS') {
    return <SaaSPrototype brandName={brandName} />;
  }
  if (category === 'CRM') {
    return <CRMPrototype brandName={brandName} />;
  }
  if (category === 'Content') {
    return <ContentPrototype brandName={brandName} />;
  }
  if (category === 'Booking') {
    return <BookingPrototype brandName={brandName} />;
  }
  if (category === 'Social') {
    return <SocialPrototype brandName={brandName} />;
  }

  return <GenericPrototype brandName={brandName} description={prototype.description} />;
}

// E-Commerce Prototype Preview
function EcommercePrototype({ brandName }: { brandName: string }) {
  const products = [
    { name: 'Premium Headphones', price: 299, rating: 4.8, reviews: 124, image: 'from-violet-500/20 to-purple-600/20' },
    { name: 'Smart Watch Pro', price: 449, rating: 4.9, reviews: 89, image: 'from-blue-500/20 to-cyan-600/20' },
    { name: 'Wireless Earbuds', price: 159, rating: 4.7, reviews: 203, image: 'from-pink-500/20 to-rose-600/20' },
    { name: 'Portable Speaker', price: 129, rating: 4.6, reviews: 156, image: 'from-amber-500/20 to-orange-600/20' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Navbar */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
              {brandName.charAt(0)}
            </div>
            <span className="font-display font-semibold">{brandName}</span>
          </div>
          <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
            <span className="hover:text-foreground cursor-pointer transition-colors">Shop</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Categories</span>
            <span className="hover:text-foreground cursor-pointer transition-colors">Deals</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-muted/50 rounded-lg text-sm">
            <Search className="w-4 h-4 text-muted-foreground" />
            <span className="text-muted-foreground">Search...</span>
          </div>
          <Button variant="ghost" size="icon" className="relative">
            <Heart className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground rounded-full text-xs flex items-center justify-center">3</span>
          </Button>
        </div>
      </div>

      {/* Hero Banner */}
      <div className="relative mx-4 mt-4 rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-accent/10 p-6 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,...')] opacity-10" />
        <div className="relative z-10">
          <Badge className="mb-3 bg-primary/20 text-primary border-0">New Arrivals</Badge>
          <h1 className="text-2xl font-display font-bold mb-2">Summer Collection 2024</h1>
          <p className="text-muted-foreground text-sm mb-4">Up to 40% off on selected items</p>
          <Button size="sm" className="gap-2">
            Shop Now <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
        <div className="absolute right-4 top-1/2 -translate-y-1/2 w-24 h-24 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-2xl" />
      </div>

      {/* Product Grid */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Trending Products</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Filter className="w-3 h-3" /> Filter
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {products.map((product, i) => (
            <Card key={i} className="overflow-hidden group cursor-pointer hover:shadow-lg transition-all border-border/50">
              <div className={`aspect-square bg-gradient-to-br ${product.image} relative overflow-hidden`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 bg-background/20 backdrop-blur-sm rounded-xl" />
                </div>
                <Button variant="ghost" size="icon" className="absolute top-2 right-2 h-7 w-7 bg-background/80 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
              <div className="p-3">
                <p className="font-medium text-sm truncate">{product.name}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs text-muted-foreground">{product.rating} ({product.reviews})</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-bold text-primary">${product.price}</span>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">
                    <ShoppingCart className="w-3 h-3 mr-1" /> Add
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// SaaS Dashboard Prototype
function SaaSPrototype({ brandName }: { brandName: string }) {
  const metrics = [
    { label: 'Total Revenue', value: '$48,574', change: '+12.5%', icon: DollarSign, color: 'text-success' },
    { label: 'Active Users', value: '2,847', change: '+8.2%', icon: Users, color: 'text-primary' },
    { label: 'Conversion', value: '3.24%', change: '+2.1%', icon: TrendingUp, color: 'text-amber-500' },
    { label: 'Avg. Session', value: '4m 32s', change: '+15%', icon: Clock, color: 'text-blue-500' },
  ];

  return (
    <div className="h-full flex bg-background">
      {/* Sidebar */}
      <div className="w-16 border-r border-border bg-muted/20 flex flex-col items-center py-4 gap-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold shadow-lg">
          {brandName.charAt(0)}
        </div>
        <div className="flex-1 flex flex-col items-center gap-2 mt-4">
          {[BarChart3, Users, Layers, Mail, Settings].map((Icon, i) => (
            <Button key={i} variant={i === 0 ? 'secondary' : 'ghost'} size="icon" className="h-10 w-10 rounded-xl">
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-3 border-b border-border flex items-center justify-between">
          <div>
            <h1 className="font-display font-bold text-lg">Dashboard</h1>
            <p className="text-xs text-muted-foreground">Welcome back! Here's your overview</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center text-sm font-medium">
              JD
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="flex-1 p-4 overflow-auto space-y-4">
          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3">
            {metrics.map((metric, i) => (
              <Card key={i} className="p-3 border-border/50 hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-muted-foreground">{metric.label}</span>
                  <metric.icon className={`w-4 h-4 ${metric.color}`} />
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-xl font-bold">{metric.value}</span>
                  <Badge variant="outline" className="text-xs text-success border-success/20 bg-success/10">
                    {metric.change}
                  </Badge>
                </div>
              </Card>
            ))}
          </div>

          {/* Chart */}
          <Card className="p-4 border-border/50">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Revenue Overview</h3>
              <Badge variant="outline" className="text-xs">Last 7 days</Badge>
            </div>
            <div className="h-32 flex items-end gap-2 px-2">
              {[45, 70, 55, 80, 65, 90, 75].map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div 
                    className="w-full bg-gradient-to-t from-primary to-primary/60 rounded-t-md transition-all hover:from-primary/90"
                    style={{ height: `${h}%` }}
                  />
                  <span className="text-[10px] text-muted-foreground">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-4 border-border/50">
            <h3 className="font-semibold text-sm mb-3">Recent Activity</h3>
            <div className="space-y-3">
              {[
                { action: 'New user signup', time: '2 min ago', icon: Users },
                { action: 'Payment received', time: '15 min ago', icon: DollarSign },
                { action: 'Feature activated', time: '1 hour ago', icon: Zap },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm">
                  <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

// CRM Prototype
function CRMPrototype({ brandName }: { brandName: string }) {
  const contacts = [
    { name: 'Sarah Johnson', company: 'TechCorp', status: 'Lead', value: '$12,500', avatar: 'SJ' },
    { name: 'Michael Chen', company: 'Innovate Inc', status: 'Qualified', value: '$28,000', avatar: 'MC' },
    { name: 'Emma Wilson', company: 'StartupXYZ', status: 'Proposal', value: '$45,000', avatar: 'EW' },
    { name: 'David Brown', company: 'Enterprise Co', status: 'Negotiation', value: '$85,000', avatar: 'DB' },
  ];

  const statusColors: Record<string, string> = {
    Lead: 'bg-blue-500/10 text-blue-600',
    Qualified: 'bg-amber-500/10 text-amber-600',
    Proposal: 'bg-purple-500/10 text-purple-600',
    Negotiation: 'bg-success/10 text-success',
  };

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-3 border-b border-border flex items-center justify-between bg-gradient-to-r from-background to-muted/20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm shadow-lg">
              {brandName.charAt(0)}
            </div>
            <span className="font-display font-semibold">{brandName}</span>
          </div>
          <div className="hidden md:flex items-center gap-3 text-sm">
            <Button variant="ghost" size="sm" className="gap-2">
              <Users className="w-4 h-4" /> Contacts
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Building2 className="w-4 h-4" /> Companies
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Tag className="w-4 h-4" /> Deals
            </Button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button size="sm" className="gap-2">
            <span className="text-lg leading-none">+</span> Add Contact
          </Button>
        </div>
      </div>

      {/* Pipeline Stats */}
      <div className="px-6 py-4 border-b border-border bg-muted/10">
        <div className="flex items-center gap-6">
          <div className="text-center">
            <p className="text-2xl font-bold text-primary">$170,500</p>
            <p className="text-xs text-muted-foreground">Pipeline Value</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">Active Deals</p>
          </div>
          <div className="h-10 w-px bg-border" />
          <div className="text-center">
            <p className="text-2xl font-bold text-success">68%</p>
            <p className="text-xs text-muted-foreground">Win Rate</p>
          </div>
        </div>
      </div>

      {/* Contacts List */}
      <div className="flex-1 p-4 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold">Recent Contacts</h2>
          <Button variant="ghost" size="sm" className="gap-1 text-xs">
            <Filter className="w-3 h-3" /> Filter
          </Button>
        </div>
        <div className="space-y-2">
          {contacts.map((contact, i) => (
            <Card key={i} className="p-4 border-border/50 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-medium text-sm">
                  {contact.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-medium truncate">{contact.name}</p>
                    <Badge className={`text-xs ${statusColors[contact.status]}`}>{contact.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Building2 className="w-3 h-3" />
                    {contact.company}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-success">{contact.value}</p>
                  <p className="text-xs text-muted-foreground">Deal Value</p>
                </div>
                <ChevronRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Content/Blog Prototype
function ContentPrototype({ brandName }: { brandName: string }) {
  const posts = [
    { title: 'Getting Started with AI', excerpt: 'Learn how to integrate AI into your workflow...', date: 'Dec 28', readTime: '5 min', category: 'Tutorial' },
    { title: 'Design Trends 2024', excerpt: 'The hottest design trends to watch this year...', date: 'Dec 25', readTime: '8 min', category: 'Design' },
    { title: 'Building for Scale', excerpt: 'Architecture patterns for growing startups...', date: 'Dec 22', readTime: '12 min', category: 'Engineering' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm">
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span className="hover:text-foreground cursor-pointer">Blog</span>
          <span className="hover:text-foreground cursor-pointer">About</span>
          <Button size="sm" variant="outline">Subscribe</Button>
        </div>
      </div>

      {/* Hero */}
      <div className="px-6 py-8 border-b border-border bg-gradient-to-b from-muted/30 to-transparent">
        <Badge className="mb-3">Featured</Badge>
        <h1 className="text-2xl font-display font-bold mb-2">Welcome to {brandName}</h1>
        <p className="text-muted-foreground text-sm max-w-md">Insights, tutorials, and stories from our team. Stay updated with the latest in tech and design.</p>
      </div>

      {/* Posts */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="font-semibold mb-4">Latest Posts</h2>
        <div className="space-y-4">
          {posts.map((post, i) => (
            <Card key={i} className="p-4 border-border/50 hover:shadow-md hover:border-primary/20 transition-all cursor-pointer group">
              <div className="flex gap-4">
                <div className="w-20 h-20 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center shrink-0">
                  <FileText className="w-8 h-8 text-primary/40" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant="outline" className="text-xs">{post.category}</Badge>
                    <span className="text-xs text-muted-foreground">{post.date}</span>
                  </div>
                  <h3 className="font-semibold group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                    <Clock className="w-3 h-3" />
                    {post.readTime} read
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

// Booking Prototype
function BookingPrototype({ brandName }: { brandName: string }) {
  const timeSlots = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];
  const services = [
    { name: 'Consultation', duration: '30 min', price: 'Free' },
    { name: 'Strategy Session', duration: '60 min', price: '$99' },
    { name: 'Full Workshop', duration: '2 hours', price: '$249' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm">
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <Button variant="ghost" size="icon">
          <Calendar className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-auto">
        <h2 className="text-xl font-display font-bold mb-2">Book an Appointment</h2>
        <p className="text-sm text-muted-foreground mb-6">Select a service and time that works for you</p>

        {/* Services */}
        <div className="space-y-3 mb-6">
          <h3 className="font-semibold text-sm">Select Service</h3>
          {services.map((service, i) => (
            <Card key={i} className={`p-4 border-border/50 cursor-pointer transition-all hover:border-primary/50 ${i === 0 ? 'border-primary bg-primary/5' : ''}`}>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-muted-foreground">{service.duration}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-primary">{service.price}</p>
                  {i === 0 && <CheckCircle2 className="w-5 h-5 text-primary mt-1 ml-auto" />}
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-semibold text-sm mb-3">Available Times - Today</h3>
          <div className="grid grid-cols-3 gap-2">
            {timeSlots.map((time, i) => (
              <Button key={i} variant={i === 2 ? 'default' : 'outline'} size="sm" className="h-10">
                {time}
              </Button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <Button className="w-full mt-6 gap-2" size="lg">
          <CheckCircle2 className="w-5 h-5" />
          Confirm Booking
        </Button>
      </div>
    </div>
  );
}

// Social Prototype
function SocialPrototype({ brandName }: { brandName: string }) {
  const posts = [
    { user: 'Alex Rivera', handle: '@alex', content: 'Just launched my new project! 🚀 Check it out and let me know what you think.', likes: 42, comments: 8, time: '2h' },
    { user: 'Jordan Lee', handle: '@jordan', content: 'Beautiful sunset from the office today. Sometimes you just need to stop and appreciate the view. 🌅', likes: 128, comments: 15, time: '5h' },
  ];

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm">
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon">
            <Search className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </Button>
        </div>
      </div>

      {/* Create Post */}
      <div className="px-6 py-4 border-b border-border">
        <div className="flex gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-medium text-sm">
            You
          </div>
          <div className="flex-1 bg-muted/30 rounded-xl px-4 py-3 text-sm text-muted-foreground cursor-text hover:bg-muted/50 transition-colors">
            What's on your mind?
          </div>
        </div>
      </div>

      {/* Feed */}
      <div className="flex-1 p-4 overflow-auto space-y-4">
        {posts.map((post, i) => (
          <Card key={i} className="p-4 border-border/50">
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center font-medium text-sm shrink-0">
                {post.user.split(' ').map(n => n[0]).join('')}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.user}</span>
                  <span className="text-sm text-muted-foreground">{post.handle}</span>
                  <span className="text-sm text-muted-foreground">· {post.time}</span>
                </div>
                <p className="mt-2 text-sm">{post.content}</p>
                <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Heart className="w-4 h-4" /> {post.likes}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageSquare className="w-4 h-4" /> {post.comments}
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ArrowUpRight className="w-4 h-4" /> Share
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

// Generic/Custom Prototype
function GenericPrototype({ brandName, description }: { brandName: string; description?: string }) {
  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground font-bold text-sm">
            {brandName.charAt(0)}
          </div>
          <span className="font-display font-semibold">{brandName}</span>
        </div>
        <div className="flex items-center gap-3 text-sm text-muted-foreground">
          <span>Features</span>
          <span>About</span>
          <span>Contact</span>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center text-primary-foreground mb-6 shadow-2xl shadow-primary/20 animate-float">
          <Sparkles className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-display font-bold mb-3">{brandName}</h1>
        <p className="text-muted-foreground max-w-md mb-6">
          {description || "Your prototype is ready! Test it in the sandbox to see it working with realistic data and customize it to match your brand."}
        </p>
        <div className="flex items-center gap-4">
          <Button size="lg" className="gap-2">
            Get Started <ChevronRight className="w-5 h-5" />
          </Button>
          <Button size="lg" variant="outline" className="gap-2">
            <Play className="w-5 h-5" /> Watch Demo
          </Button>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-3 gap-4 mt-12 w-full max-w-lg">
          {[
            { icon: Zap, label: 'Fast' },
            { icon: Shield, label: 'Secure' },
            { icon: Layers, label: 'Scalable' },
          ].map(({ icon: Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-2 p-4 rounded-xl bg-muted/30">
              <Icon className="w-6 h-6 text-primary" />
              <span className="text-sm font-medium">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
