import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, BarChart3, Users, Zap } from 'lucide-react';

export const HeroSection = () => {
  const stats = [
    { label: 'Deals Analyzed', value: '50K+', icon: BarChart3 },
    { label: 'Community Members', value: '25K+', icon: Users },
    { label: 'Sentiment Accuracy', value: '94%', icon: TrendingUp },
    { label: 'Real-time Updates', value: '24/7', icon: Zap },
  ];

  return (
    <section className="relative overflow-hidden bg-background py-16">
      {/* Content */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-primary/10 text-primary border-primary/20"
          >
            🔥 Where AI Builds Better Deals
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-foreground">
            The Launchpad for{' '}
            <span className="text-primary">
              AI-Powered
            </span>
            {' '}Deals
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Explore the best deals crafted with advanced sentiment analysis. Vote, comment, and fuel the future of smart shopping.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-semibold px-8 py-3 text-lg"
            >
              Submit Deal
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="font-semibold px-8 py-3 text-lg"
            >
              Create Free Account
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};