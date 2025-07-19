import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Clock, MessageCircle, ArrowUp, Filter } from 'lucide-react';

// Mock data - replace with real data from your API
const mockTrendingDeals = [
  {
    id: '1',
    title: 'Nintendo Switch OLED Console - 40% Off at Best Buy',
    upvotes: 247,
    comments: 89,
    sentiment: 'positive',
    timeAgo: '2h ago',
    category: 'Electronics'
  },
  {
    id: '2',
    title: 'Costco Membership Deal + $20 Cash Card',
    upvotes: 189,
    comments: 156,
    sentiment: 'positive',
    timeAgo: '4h ago',
    category: 'Services'
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max - Trade-in Offer at Apple Store',
    upvotes: 312,
    comments: 203,
    sentiment: 'neutral',
    timeAgo: '6h ago',
    category: 'Electronics'
  },
  {
    id: '4',
    title: 'Air Canada Flight Sale - 50% Off Domestic Flights',
    upvotes: 156,
    comments: 67,
    sentiment: 'positive',
    timeAgo: '8h ago',
    category: 'Travel'
  },
  {
    id: '5',
    title: 'Lululemon Warehouse Sale - Up to 70% Off',
    upvotes: 298,
    comments: 124,
    sentiment: 'positive',
    timeAgo: '12h ago',
    category: 'Fashion'
  }
];

export const TrendingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      positive: 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400',
      neutral: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400',
      negative: 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
    };
    
    return (
      <Badge variant="secondary" className={variants[sentiment as keyof typeof variants]}>
        {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
      </Badge>
    );
  };

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <TrendingUp className="w-6 h-6 text-primary" />
              <Badge variant="outline" className="text-primary border-primary/20">
                Live Updates
              </Badge>
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Trending Deals Right Now
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover the hottest deals based on community engagement and our AI sentiment analysis
            </p>
          </div>

          {/* Filters */}
          <Tabs defaultValue="trending" className="mb-8">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4 mx-auto">
              <TabsTrigger value="trending">
                <TrendingUp className="w-4 h-4 mr-2" />
                Trending
              </TabsTrigger>
              <TabsTrigger value="recent">
                <Clock className="w-4 h-4 mr-2" />
                Recent
              </TabsTrigger>
              <TabsTrigger value="discussed">
                <MessageCircle className="w-4 h-4 mr-2" />
                Most Discussed
              </TabsTrigger>
              <TabsTrigger value="positive">
                <ArrowUp className="w-4 h-4 mr-2" />
                Most Positive
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trending" className="mt-8">
              <div className="grid gap-4 lg:gap-6">
                {mockTrendingDeals.map((deal, index) => (
                  <Card key={deal.id} className="group hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Rank */}
                        <div className="shrink-0 w-8 h-8 rounded-full bg-gradient-primary text-white text-sm font-bold flex items-center justify-center">
                          {index + 1}
                        </div>

                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors">
                              {deal.title}
                            </h3>
                            <Badge variant="outline" className="shrink-0">
                              {deal.category}
                            </Badge>
                          </div>

                          <div className="flex items-center gap-6 text-sm text-muted-foreground mb-3">
                            <div className="flex items-center gap-1">
                              <ArrowUp className="w-4 h-4" />
                              <span className="font-medium">{deal.upvotes}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageCircle className="w-4 h-4" />
                              <span>{deal.comments}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{deal.timeAgo}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between">
                            {getSentimentBadge(deal.sentiment)}
                            <Button variant="ghost" size="sm" className="text-primary">
                              View Deal →
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Other tab contents would be similar */}
            <TabsContent value="recent" className="mt-8">
              <div className="text-center py-12 text-muted-foreground">
                Recent deals content would go here
              </div>
            </TabsContent>
            
            <TabsContent value="discussed" className="mt-8">
              <div className="text-center py-12 text-muted-foreground">
                Most discussed deals content would go here
              </div>
            </TabsContent>
            
            <TabsContent value="positive" className="mt-8">
              <div className="text-center py-12 text-muted-foreground">
                Most positive deals content would go here
              </div>
            </TabsContent>
          </Tabs>

          {/* View All Button */}
          <div className="text-center">
            <Button size="lg" variant="outline" className="px-8">
              <Filter className="w-4 h-4 mr-2" />
              View All Deals
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
