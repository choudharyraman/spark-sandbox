import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Menu, X, ChevronDown, Moon, Sun } from 'lucide-react';

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'glass shadow-md' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3 animate-fade-in">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-bold text-xl">Lovable</span>
            <Badge variant="sandbox" className="hidden sm:inline-flex animate-bounce-soft">
              Smart Sandbox
            </Badge>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {['Templates', 'Docs', 'Pricing', 'Portfolio'].map((item, index) => (
              <Button 
                key={item}
                variant="ghost" 
                className="text-muted-foreground hover:text-foreground transition-colors duration-300 link-underline"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {item}
                {item === 'Templates' && <ChevronDown className="w-4 h-4 ml-1" />}
              </Button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              className="relative overflow-hidden hover:bg-primary/10 transition-colors duration-300"
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all duration-300 dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all duration-300 dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            <Button variant="ghost" className="hidden sm:inline-flex hover-scale-subtle">
              Sign In
            </Button>
            <Button variant="default" className="hidden sm:inline-flex hover-lift">
              Get Started
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-5 h-5">
                <Menu className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100'}`} />
                <X className={`w-5 h-5 absolute transition-all duration-300 ${mobileMenuOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0'}`} />
              </div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden border-t border-border bg-background overflow-hidden transition-all duration-300 ease-out ${
          mobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col gap-2">
          {['Templates', 'Docs', 'Pricing', 'Portfolio'].map((item, index) => (
            <Button 
              key={item}
              variant="ghost" 
              className="justify-start transition-all duration-300"
              style={{ 
                transitionDelay: mobileMenuOpen ? `${index * 50}ms` : '0ms',
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? 'translateX(0)' : 'translateX(-10px)'
              }}
            >
              {item}
            </Button>
          ))}
          <div className="border-t border-border my-2" />
          <Button variant="ghost" className="justify-start">Sign In</Button>
          <Button variant="default">Get Started</Button>
        </nav>
      </div>
    </header>
  );
}
