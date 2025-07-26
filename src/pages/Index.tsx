import { useState, useEffect } from 'react';
import { Header } from '@/components/layout/Header';
import { HeroSection } from '@/components/sections/HeroSection';
import { TrendingSection } from '@/components/sections/TrendingSection';
import { DealList } from '@/components/deals/DealList';
import { FilterTabs } from '@/components/ui/filter-tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Deal } from '@/types/deal';
import { BarChart3, Target, Zap, Shield, Search, Grid, List, SlidersHorizontal, Heart, Flame, Clock, Award, MoreHorizontal, Wrench, Grid3X3, Grid2X2, ChevronDown } from 'lucide-react';

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
  const [allDeals] = useState<Deal[]>(mockDeals);
  const [deals, setDeals] = useState<Deal[]>(mockDeals);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [activeTimeFilter, setActiveTimeFilter] = useState('all-time');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Filter deals based on active filters
  const filterDeals = () => {
    let filtered = [...allDeals];
    
    // Filter by category
    if (activeTab !== 'all') {
      filtered = filtered.filter(deal => {
        const title = deal.title.toLowerCase();
        switch (activeTab) {
          case 'tech':
            return title.includes('macbook') || title.includes('samsung') || title.includes('tech') || title.includes('phone') || title.includes('laptop');
          case 'grocery':
            return title.includes('costco') || title.includes('grocery') || title.includes('food') || title.includes('gas');
          case 'fashion':
            return title.includes('fashion') || title.includes('clothing') || title.includes('shoes');
          default:
            return true;
        }
      });
    }
    
    // Filter by time
    if (activeTimeFilter !== 'all-time') {
      const now = new Date();
      filtered = filtered.filter(deal => {
        const dealDate = new Date(deal.created_at);
        const diffTime = now.getTime() - dealDate.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        switch (activeTimeFilter) {
          case 'today':
            return diffDays <= 1;
          case 'this-week':
            return diffDays <= 7;
          case 'this-month':
            return diffDays <= 30;
          default:
            return true;
        }
      });
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      filtered = filtered.filter(deal =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    setDeals(filtered);
  };

  // Apply filters whenever filter states change
  useEffect(() => {
    filterDeals();
  }, [activeTab, activeTimeFilter, searchQuery, allDeals]);

  const handleLoadMore = () => {
    setIsLoading(true);
    // Simulate loading more deals
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const getCategoryCount = (category: string) => {
    if (category === 'all') return allDeals.length;
    return allDeals.filter(deal => {
      const title = deal.title.toLowerCase();
      switch (category) {
        case 'tech':
          return title.includes('macbook') || title.includes('samsung') || title.includes('tech') || title.includes('phone') || title.includes('laptop');
        case 'grocery':
          return title.includes('costco') || title.includes('grocery') || title.includes('food') || title.includes('gas');
        case 'fashion':
          return title.includes('fashion') || title.includes('clothing') || title.includes('shoes');
        default:
          return false;
      }
    }).length;
  };

  const categoryTabs = [
    { id: 'all', label: 'All', icon: <Flame className="w-4 h-4" />, count: getCategoryCount('all') },
    { id: 'tech', label: 'Tech', icon: <Target className="w-4 h-4" />, count: getCategoryCount('tech') },
    { id: 'grocery', label: 'Grocery', icon: <Heart className="w-4 h-4" />, count: getCategoryCount('grocery') },
    { id: 'fashion', label: 'Fashion', icon: <Award className="w-4 h-4" />, count: getCategoryCount('fashion') }
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
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <div className="bg-card rounded-2xl lg:rounded-3xl shadow-card dark:shadow-[0_4px_25px_-5px_rgba(255,107,53,0.15),0_10px_40px_-15px_rgba(255,107,53,0.1)] overflow-hidden mb-6 lg:mb-8">
              {/* Tab Navigation */}
              <div className="border-b border-border">
                <div className="flex items-center overflow-x-auto">
                  {categoryTabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap flex-shrink-0 ${
                        activeTab === tab.id
                          ? 'border-primary text-primary bg-primary/10'
                          : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary'
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                  <button className="flex items-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 text-sm font-medium transition-all duration-200 border-b-2 whitespace-nowrap border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary">
                    <MoreHorizontal className="w-5 h-5" />
                    <span className="hidden sm:inline">More</span>
                  </button>
                </div>
              </div>

              {/* Controls */}
              <div className="p-4 lg:p-6">
                {/* Desktop Layout */}
                <div className="hidden xl:flex items-center gap-4 lg:gap-6">
                  {/* Time Filter Pills */}
                  <div className="flex-shrink-0">
                    <div className="flex flex-wrap gap-2">
                      {timeTabs.map((tab) => (
                        <button
                          key={tab.id}
                          onClick={() => setActiveTimeFilter(tab.id)}
                          className={`px-3 lg:px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            activeTimeFilter === tab.id
                              ? 'bg-primary text-white shadow-card'
                              : 'bg-secondary text-secondary-foreground hover:bg-border'
                          }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Technology/Category Buttons */}
                  <div className="flex-shrink-0">
                    <div className="flex gap-4">
                      <Button
                        variant="outline"
                        className="w-full justify-between border-border text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <Wrench className="w-4 h-4" />
                          Technologies
                        </span>
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full justify-between border-border text-sm"
                      >
                        <span className="flex items-center gap-2">
                          <Grid3X3 className="w-4 h-4" />
                          Categories
                        </span>
                      </Button>
                    </div>
                  </div>

                  {/* Search */}
                  <div className="flex-grow">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search deals..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="flex h-10 rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-background border-border text-sm w-full"
                      />
                    </div>
                  </div>

                  {/* View Toggle */}
                  <div className="flex-shrink-0">
                    <div className="flex items-center">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 rounded-r-none border-r-0 ${
                          viewMode === 'grid'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <Grid2X2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 rounded-l-none ${
                          viewMode === 'list'
                            ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                            : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                        }`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mobile Layout */}
                <div className="flex flex-col gap-4 xl:hidden">
                  <div className="flex gap-4 w-full">
                    <div className="flex-1">
                      <Button
                        variant="outline"
                        className="w-full justify-between border-border text-sm"
                      >
                        <span>All Time</span>
                        <ChevronDown className="w-4 h-4" />
                      </Button>
                    </div>
                    <div className="flex-shrink-0">
                      <div className="flex items-center">
                        <button
                          onClick={() => setViewMode('grid')}
                          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 rounded-r-none border-r-0 ${
                            viewMode === 'grid'
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <Grid2X2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setViewMode('list')}
                          className={`inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-9 rounded-md px-3 rounded-l-none ${
                            viewMode === 'list'
                              ? 'bg-primary text-primary-foreground hover:bg-primary/90'
                              : 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
                          }`}
                        >
                          <List className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-4 w-full">
                    <Button
                      variant="outline"
                      className="flex-1 justify-between border-border text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <Wrench className="w-4 h-4" />
                        Technologies
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="flex-1 justify-between border-border text-sm"
                    >
                      <span className="flex items-center gap-2">
                        <Grid3X3 className="w-4 h-4" />
                        Categories
                      </span>
                    </Button>
                  </div>

                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search deals..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="flex h-10 rounded-md border px-3 py-2 ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-10 bg-background border-border text-sm w-full"
                    />
                  </div>
                </div>
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
            {/* Results indicator */}
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  {searchQuery ? `Search results for "${searchQuery}"` : 'Latest Deals'}
                </h2>
                <span className="text-sm text-muted-foreground">
                  {deals.length} deal{deals.length !== 1 ? 's' : ''} found
                </span>
              </div>
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
