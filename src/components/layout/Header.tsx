import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { AuthModal } from '@/components/auth/AuthModal';
import { Search, TrendingUp, Bell, User } from 'lucide-react';

interface HeaderProps {
  user?: any;
}

export const Header = ({ user }: HeaderProps) => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');

  const handleAuthClick = (mode: 'signin' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-16 lg:h-20 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-gradient-primary rounded-xl flex items-center justify-center shadow-lg">
              <TrendingUp className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl lg:text-2xl text-foreground">
              vibedealhub.me
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search deals, technologies, categories..."
                className="pl-12 pr-4 py-3 bg-muted/50 border border-border rounded-xl focus:bg-background focus:ring-2 focus:ring-primary/20 transition-all duration-200"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-3 lg:gap-4">
            {user ? (
              <div className="flex items-center gap-2 lg:gap-3">
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="rounded-xl">
                  <User className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="hidden sm:inline-flex px-3 py-1 rounded-full">
                  {user.email}
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2 lg:gap-3">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthClick('signin')}
                  className="text-muted-foreground hover:text-foreground rounded-xl"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-semibold px-6 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Sign Up
                </Button>
              </div>
            )}
          </nav>
        </div>
      </header>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        mode={authMode}
      />
    </>
  );
};