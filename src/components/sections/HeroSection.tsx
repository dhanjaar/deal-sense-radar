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
    <section className="relative overflow-hidden bg-background py-20 lg:py-24">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-background" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-8 bg-primary/10 text-primary border-primary/20 px-4 py-2 text-sm font-medium"
          >
            🔥 Where AI Builds Better Deals
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight text-foreground">
            The Launchpad for{' '}
            <span className="text-primary bg-gradient-to-r from-primary to-primary-light bg-clip-text text-transparent">
              AI-Powered
            </span>
            {' '}Deals
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl mb-12 text-muted-foreground leading-relaxed max-w-4xl mx-auto">
            Explore the best deals crafted with advanced sentiment analysis. Vote, comment, and fuel the future of smart shopping.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 lg:gap-6 justify-center mb-20">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 font-semibold px-8 lg:px-10 py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Submit Deal
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="font-semibold px-8 lg:px-10 py-4 text-lg rounded-xl border-2 hover:bg-muted transition-all duration-300"
            >
              Create Free Account
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mb-3">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">{stat.value}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};