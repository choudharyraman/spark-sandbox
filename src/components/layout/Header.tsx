import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Menu, X, ChevronDown } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Lovable</span>
            <Badge variant="sandbox" className="hidden sm:inline-flex">
              Smart Sandbox
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Templates
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Docs
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Pricing
            </Button>
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              Portfolio
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button variant="ghost" className="hidden sm:inline-flex">
              Sign In
            </Button>
            <Button variant="default" className="hidden sm:inline-flex">
              Get Started
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start">Templates</Button>
            <Button variant="ghost" className="justify-start">Docs</Button>
            <Button variant="ghost" className="justify-start">Pricing</Button>
            <Button variant="ghost" className="justify-start">Portfolio</Button>
            <div className="border-t border-border my-2" />
            <Button variant="ghost" className="justify-start">Sign In</Button>
            <Button variant="default">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
