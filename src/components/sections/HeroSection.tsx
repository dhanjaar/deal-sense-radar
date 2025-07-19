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
    <section className="relative overflow-hidden">
      {/* Background Gradient */}
      <div className="absolute inset-0 hero-gradient" />
      
      {/* Content */}
      <div className="relative container mx-auto px-4 py-20 lg:py-32">
        <div className="max-w-4xl mx-auto text-center text-white">
          {/* Badge */}
          <Badge 
            variant="secondary" 
            className="mb-6 bg-white/20 text-white border-white/20 backdrop-blur-sm"
          >
            <TrendingUp className="w-3 h-3 mr-1" />
            Real-time Deal Intelligence
          </Badge>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover{' '}
            <span className="relative">
              <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                Smart Deals
              </span>
              <svg
                className="absolute -bottom-2 left-0 w-full h-3 text-yellow-300/60"
                viewBox="0 0 100 12"
                fill="currentColor"
              >
                <path d="M0 8c30-6 70-6 100 0v4H0z" />
              </svg>
            </span>
            {' '}with AI-Powered Sentiment Analysis
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl mb-8 text-white/90 leading-relaxed max-w-3xl mx-auto">
            Join thousands of smart shoppers using advanced sentiment analysis to discover 
            the best deals from RedFlagDeals community discussions.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-white text-purple-600 hover:bg-white/90 font-semibold px-8 py-6 text-lg"
            >
              Start Analyzing Deals
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white/30 text-white bg-white/10 hover:bg-white/20 backdrop-blur-sm font-semibold px-8 py-6 text-lg"
            >
              View Live Demo
            </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <Card key={index} className="glass-card border-white/20">
                <CardContent className="p-6 text-center">
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <div className="text-2xl font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-300/20 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
    </section>
  );
};