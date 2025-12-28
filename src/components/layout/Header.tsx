import { useState } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-2 border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary border-2 border-border shadow-md flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-display font-extrabold text-2xl uppercase tracking-tight">Lovable</span>
              </div>
              <span className="font-serif italic text-sm text-muted-foreground ml-[52px] -mt-1">~ Raman</span>
            </div>
            <Badge className="hidden sm:inline-flex bg-accent text-accent-foreground border-2 border-border shadow-sm font-mono text-xs uppercase tracking-wider">
              Smart Sandbox
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-0">
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground font-semibold uppercase text-sm tracking-wide">
              Templates
              <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground font-semibold uppercase text-sm tracking-wide">
              Docs
            </Button>
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground font-semibold uppercase text-sm tracking-wide">
              Pricing
            </Button>
            <Button variant="ghost" className="text-foreground hover:bg-accent hover:text-accent-foreground font-semibold uppercase text-sm tracking-wide">
              Portfolio
            </Button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              size="icon"
              onClick={toggleTheme}
              className="border-2 border-border shadow-sm hover:shadow-md hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" className="hidden sm:inline-flex font-semibold uppercase text-sm tracking-wide">
              Sign In
            </Button>
            <Button className="hidden sm:inline-flex bg-secondary text-secondary-foreground border-2 border-border shadow-md hover:shadow-lg hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all font-semibold uppercase text-sm tracking-wide">
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
        <div className="md:hidden border-t-2 border-border bg-background animate-slide-up">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
            <Button variant="ghost" className="justify-start font-semibold uppercase text-sm tracking-wide">Templates</Button>
            <Button variant="ghost" className="justify-start font-semibold uppercase text-sm tracking-wide">Docs</Button>
            <Button variant="ghost" className="justify-start font-semibold uppercase text-sm tracking-wide">Pricing</Button>
            <Button variant="ghost" className="justify-start font-semibold uppercase text-sm tracking-wide">Portfolio</Button>
            <div className="border-t-2 border-border my-2" />
            <Button variant="ghost" className="justify-start font-semibold uppercase text-sm tracking-wide">Sign In</Button>
            <Button className="bg-secondary text-secondary-foreground border-2 border-border shadow-md font-semibold uppercase text-sm tracking-wide">Get Started</Button>
          </nav>
        </div>
      )}
    </header>
  );
}