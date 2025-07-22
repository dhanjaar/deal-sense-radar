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
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground">
              vibedealhub.me
            </span>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex items-center flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search deals..."
                className="pl-10 bg-muted/50 border-0 focus:bg-background"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <User className="h-4 w-4" />
                </Button>
                <Badge variant="secondary" className="hidden sm:inline-flex">
                  {user.email}
                </Badge>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  onClick={() => handleAuthClick('signin')}
                  className="text-muted-foreground"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthClick('signup')}
                  className="btn-primary"
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