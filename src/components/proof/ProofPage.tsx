import { useState } from 'react';
import { ProofPage as ProofPageType, Project } from '@/types/sandbox';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  ExternalLink, 
  Copy, 
  Check, 
  Share2, 
  Twitter, 
  Linkedin,
  Sparkles,
  Rocket,
  Globe,
  ArrowRight
} from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface ProofPageViewProps {
  project: Project;
  proofPage: ProofPageType;
  onClose: () => void;
}

export function ProofPageView({ project, proofPage, onClose }: ProofPageViewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    await navigator.clipboard.writeText(proofPage.shareLinks.direct);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Share your creation with the world.",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShareTwitter = () => {
    window.open(proofPage.shareLinks.twitter, '_blank');
  };

  const handleShareLinkedIn = () => {
    window.open(proofPage.shareLinks.linkedin, '_blank');
  };

  return (
    <div className="min-h-screen gradient-hero">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Success header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full gradient-success mb-6">
              <Rocket className="w-10 h-10 text-success-foreground" />
            </div>
            <Badge variant="success-solid" className="mb-4">
              🎉 Successfully deployed!
            </Badge>
            <h1 className="font-display text-4xl font-bold mb-4">
              {project.name} is live!
            </h1>
            <p className="text-muted-foreground text-lg">
              Your app is now publicly accessible. Share it with the world!
            </p>
          </div>

          {/* Preview card */}
          <Card className="overflow-hidden mb-8 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="aspect-video bg-muted relative">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="w-16 h-16 text-muted-foreground/50 mx-auto mb-4" />
                  <p className="text-muted-foreground">App preview</p>
                </div>
              </div>
              <Badge variant="live" className="absolute top-4 left-4">
                <span className="w-2 h-2 rounded-full bg-success-foreground mr-2 animate-pulse" />
                Live
              </Badge>
            </div>
            
            <div className="p-6">
              <h2 className="font-display text-2xl font-bold mb-2">
                {proofPage.title}
              </h2>
              <p className="text-muted-foreground mb-4">
                {proofPage.description}
              </p>
              
              {proofPage.templateAttribution && (
                <p className="text-sm text-muted-foreground">
                  Built from <span className="font-medium text-foreground">{proofPage.templateAttribution.templateName}</span>
                  {' '}by {proofPage.templateAttribution.authorName}
                </p>
              )}
            </div>
          </Card>

          {/* Live URL */}
          <Card className="p-4 mb-8 animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Label className="text-sm font-medium mb-2 block">Your live URL</Label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  value={proofPage.liveUrl} 
                  readOnly 
                  className="pl-10 font-mono text-sm"
                />
              </div>
              <Button variant="outline" size="icon" onClick={handleCopyLink}>
                {copied ? <Check className="w-4 h-4 text-success" /> : <Copy className="w-4 h-4" />}
              </Button>
              <Button onClick={() => window.open(proofPage.liveUrl, '_blank')}>
                <ExternalLink className="w-4 h-4 mr-2" />
                Open
              </Button>
            </div>
          </Card>

          {/* Share section */}
          <Card className="p-6 animate-slide-up" style={{ animationDelay: '0.3s' }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Share2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-display font-semibold">Share your creation</h3>
                <p className="text-sm text-muted-foreground">Let the world know what you built!</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-3"
                onClick={handleShareTwitter}
              >
                <div className="w-10 h-10 rounded-lg bg-[#1DA1F2]/10 flex items-center justify-center">
                  <Twitter className="w-5 h-5 text-[#1DA1F2]" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Share on X</p>
                  <p className="text-xs text-muted-foreground">Tweet your app</p>
                </div>
              </Button>
              
              <Button 
                variant="outline" 
                className="justify-start gap-3 h-auto py-3"
                onClick={handleShareLinkedIn}
              >
                <div className="w-10 h-10 rounded-lg bg-[#0077B5]/10 flex items-center justify-center">
                  <Linkedin className="w-5 h-5 text-[#0077B5]" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Share on LinkedIn</p>
                  <p className="text-xs text-muted-foreground">Post to your network</p>
                </div>
              </Button>
            </div>

            {/* Add to showcase */}
            <div className="mt-6 p-4 rounded-xl bg-primary/5 border border-primary/10">
              <div className="flex items-center gap-3">
                <Sparkles className="w-5 h-5 text-primary" />
                <div className="flex-1">
                  <p className="font-medium">Add to Lovable Showcase</p>
                  <p className="text-sm text-muted-foreground">Get featured and inspire others</p>
                </div>
                <Button variant="outline" size="sm">
                  Submit
                </Button>
              </div>
            </div>
          </Card>

          {/* Continue editing */}
          <div className="text-center mt-8 animate-slide-up" style={{ animationDelay: '0.4s' }}>
            <Button variant="ghost" onClick={onClose} className="gap-2">
              Continue editing
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
