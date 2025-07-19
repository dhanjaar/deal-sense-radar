import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrendingSection } from '@/components/sections/TrendingSection';
import { DealList } from '@/components/deals/DealList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '@/types/deal';
import { BarChart3, Target, Zap, Shield } from 'lucide-react';

// Mock data for demonstration
const mockDeals: Deal[] = [
  {
    id: '1',
    title: 'MacBook Air M2 - Student Discount Available',
    description: 'Apple MacBook Air with M2 chip, 8GB RAM, 256GB SSD. Educational pricing available.',
    url: 'https://example.com/deal1',
    source_url: 'https://forums.redflagdeals.com/deal1',
    upvotes: 156,
    comment_count: 89,
    scraped_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(), // 2 hours ago
    updated_at: new Date().toISOString(),
    sentiment: {
      id: '1',
      deal_id: '1',
      positive_score: 0.65,
      neutral_score: 0.25,
      negative_score: 0.10,
      overall_sentiment: 'positive',
      confidence_score: 0.87,
      analyzed_at: new Date().toISOString(),
      comment_count: 89
    }
  },
  {
    id: '2',
    title: 'Costco Gas Price Drop - All Locations',
    description: 'Significant price reduction at all Costco gas stations across Canada.',
    url: 'https://example.com/deal2',
    source_url: 'https://forums.redflagdeals.com/deal2',
    upvotes: 234,
    comment_count: 156,
    scraped_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(), // 4 hours ago
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Samsung Galaxy S24 Ultra Pre-order Bonus',
    description: 'Free Galaxy Buds Pro and storage upgrade with pre-order.',
    url: 'https://example.com/deal3',
    source_url: 'https://forums.redflagdeals.com/deal3',
    upvotes: 89,
    comment_count: 67,
    scraped_at: new Date().toISOString(),
    created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), // 6 hours ago
    updated_at: new Date().toISOString(),
    sentiment: {
      id: '3',
      deal_id: '3',
      positive_score: 0.45,
      neutral_score: 0.35,
      negative_score: 0.20,
      overall_sentiment: 'neutral',
      confidence_score: 0.72,
      analyzed_at: new Date().toISOString(),
      comment_count: 67
    }
  }
];

const Index = () => {
  const [deals] = useState<Deal[]>(mockDeals);
  const [isLoading, setIsLoading] = useState(false);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more deals
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const features = [
    {
      icon: BarChart3,
      title: 'AI Sentiment Analysis',
      description: 'Advanced natural language processing to analyze community sentiment on every deal.'
    },
    {
      icon: Target,
      title: 'Smart Deal Discovery',
      description: 'Find the best deals based on community engagement and sentiment scores.'
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Live scraping and analysis of RedFlagDeals forum posts and comments.'
    },
    {
      icon: Shield,
      title: 'Community Verified',
      description: 'Leverage the wisdom of thousands of deal hunters and their discussions.'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Features Section */}
      <section className="py-16 lg:py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Why Choose DealAnalyzer?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Get the edge in deal hunting with our advanced AI-powered platform
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <Card key={index} className="glass-card group hover:shadow-elevated transition-all duration-300">
                  <CardHeader className="text-center">
                    <div className="w-12 h-12 mx-auto mb-4 rounded-lg bg-gradient-primary flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <TrendingSection />
      
      {/* Latest Deals Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold mb-4">
                Latest Analyzed Deals
              </h2>
              <p className="text-xl text-muted-foreground">
                Fresh deals with sentiment analysis from our community
              </p>
            </div>
            
            <DealList
              deals={deals}
              hasNextPage={true}
              onLoadMore={handleLoadMore}
              isLoading={isLoading}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
