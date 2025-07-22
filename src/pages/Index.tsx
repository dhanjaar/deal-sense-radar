import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrendingSection } from '@/components/sections/TrendingSection';
import { DealList } from '@/components/deals/DealList';
import { FilterTabs } from '@/components/ui/filter-tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '@/types/deal';
import { BarChart3, Target, Zap, Shield, Search, Grid, List, SlidersHorizontal, Heart, Flame, Clock, Award } from 'lucide-react';

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
    views: 2340,
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
    views: 4567,
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
    views: 1892,
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
  const [activeTab, setActiveTab] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('all-time');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more deals
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const categoryTabs = [
    { id: 'all', label: 'All', icon: <Flame className="w-4 h-4" />, count: deals.length },
    { id: 'tech', label: 'Tech', icon: <Target className="w-4 h-4" />, count: 12 },
    { id: 'grocery', label: 'Grocery', icon: <Heart className="w-4 h-4" />, count: 8 },
    { id: 'fashion', label: 'Fashion', icon: <Award className="w-4 h-4" />, count: 6 }
  ];

  const timeTabs = [
    { id: 'today', label: 'Today' },
    { id: 'this-week', label: 'This Week' },
    { id: 'this-month', label: 'This Month' },
    { id: 'all-time', label: 'All Time' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <HeroSection />
      
      {/* Filter Section */}
      <section className="py-8 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
              <FilterTabs 
                tabs={categoryTabs}
                activeTab={activeTab}
                onTabChange={setActiveTab}
              />
            </div>
            
            {/* Time Filters and Controls */}
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <FilterTabs 
                  tabs={timeTabs}
                  activeTab={activeTimeFilter}
                  onTabChange={setActiveTimeFilter}
                />
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  <SlidersHorizontal className="w-4 h-4 mr-2" />
                  Technologies
                </Button>
                <Button variant="ghost" size="sm" className="text-muted-foreground">
                  Categories
                </Button>
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <input 
                    type="text" 
                    placeholder="Search deals..." 
                    className="pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm w-64 focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
                >
                  {viewMode === 'grid' ? <List className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <TrendingSection />
      
      {/* Latest Deals Section */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
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
