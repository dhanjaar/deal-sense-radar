import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { TrendingUp, Clock, MessageCircle, ArrowUp, Filter, ExternalLink, Eye, BarChart3 } from 'lucide-react';

// Mock data with views and better structure
const mockTrendingDeals = [
  {
    id: '1',
    title: 'Nintendo Switch OLED Console - 40% Off at Best Buy',
    description: 'Limited time offer on the latest Nintendo Switch OLED model with vibrant 7-inch screen.',
    upvotes: 247,
    comments: 89,
    views: 3420,
    sentiment: 'positive',
    timeAgo: '2h ago',
    category: 'Electronics',
    dealUrl: 'https://bestbuy.ca/nintendo-switch-deal',
    originalPrice: '$449.99',
    dealPrice: '$269.99',
    discount: '40%'
  },
  {
    id: '2',
    title: 'Costco Membership Deal + $20 Cash Card',
    description: 'Annual membership with bonus cash card for new members. Perfect timing for holiday shopping.',
    upvotes: 189,
    comments: 156,
    views: 2890,
    sentiment: 'positive',
    timeAgo: '4h ago',
    category: 'Services',
    dealUrl: 'https://costco.ca/membership-promo',
    originalPrice: '$60.00',
    dealPrice: '$60.00',
    discount: '+$20 Cash Card'
  },
  {
    id: '3',
    title: 'iPhone 15 Pro Max - Trade-in Offer at Apple Store',
    description: 'Get up to $800 off with eligible trade-in. All storage capacities available.',
    upvotes: 312,
    comments: 203,
    views: 5678,
    sentiment: 'neutral',
    timeAgo: '6h ago',
    category: 'Electronics',
    dealUrl: 'https://apple.com/iphone-trade-in',
    originalPrice: '$1,549.00',
    dealPrice: 'From $749.00',
    discount: 'Up to $800 off'
  },
  {
    id: '4',
    title: 'Air Canada Flight Sale - 50% Off Domestic Flights',
    description: 'Book by midnight tonight for travel until March 2025. Major Canadian cities included.',
    upvotes: 156,
    comments: 67,
    views: 1967,
    sentiment: 'positive',
    timeAgo: '8h ago',
    category: 'Travel',
    dealUrl: 'https://aircanada.com/sale',
    originalPrice: 'Varies',
    dealPrice: 'From $149',
    discount: '50% off'
  },
  {
    id: '5',
    title: 'Lululemon Warehouse Sale - Up to 70% Off',
    description: 'Online warehouse sale with free shipping over $150. Limited quantities available.',
    upvotes: 298,
    comments: 124,
    views: 4233,
    sentiment: 'positive',
    timeAgo: '12h ago',
    category: 'Fashion',
    dealUrl: 'https://lululemon.com/warehouse-sale',
    originalPrice: 'Varies',
    dealPrice: 'Sale prices',
    discount: 'Up to 70% off'
  }
];

export const TrendingSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDeal, setSelectedDeal] = useState<typeof mockTrendingDeals[0] | null>(null);

  const getSentimentBadge = (sentiment: string) => {
    const variants = {
      positive: 'bg-green-500/10 text-green-600 border-green-500/20',
      neutral: 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20',
      negative: 'bg-red-500/10 text-red-600 border-red-500/20'
    };
    
    return (
      <Badge variant="outline" className={variants[sentiment as keyof typeof variants]}>
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
              <div className="grid gap-4">
                {mockTrendingDeals.map((deal) => (
                  <Card key={deal.id} className="group hover:shadow-elevated transition-all duration-300 border-l-4 border-l-primary/20 hover:border-l-primary">
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Deal Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <h3 className="font-semibold text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                              {deal.title}
                            </h3>
                            <div className="flex items-center gap-2 shrink-0">
                              <Badge variant="outline" className="text-xs">
                                {deal.category}
                              </Badge>
                              {getSentimentBadge(deal.sentiment)}
                            </div>
                          </div>

                          {/* Description */}
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {deal.description}
                          </p>

                          {/* Stats Row */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-6 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <ArrowUp className="w-4 h-4 text-green-500" />
                                <span className="font-medium">{deal.upvotes}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <MessageCircle className="w-4 h-4 text-blue-500" />
                                <span>{deal.comments}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Eye className="w-4 h-4 text-purple-500" />
                                <span>{deal.views}</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="w-4 h-4" />
                                <span>{deal.timeAgo}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex items-center gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="text-primary hover:bg-primary/10"
                                    onClick={() => setSelectedDeal(deal)}
                                  >
                                    View Deal →
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle className="text-xl leading-tight">
                                      {selectedDeal?.title}
                                    </DialogTitle>
                                    <DialogDescription className="text-base">
                                      {selectedDeal?.description}
                                    </DialogDescription>
                                  </DialogHeader>
                                  
                                  {selectedDeal && (
                                    <div className="space-y-6">
                                      {/* Price Information */}
                                      <div className="grid grid-cols-3 gap-4 p-4 bg-muted/30 rounded-lg">
                                        <div className="text-center">
                                          <p className="text-sm text-muted-foreground">Original Price</p>
                                          <p className="font-semibold">{selectedDeal.originalPrice}</p>
                                        </div>
                                        <div className="text-center">
                                          <p className="text-sm text-muted-foreground">Deal Price</p>
                                          <p className="font-semibold text-green-600">{selectedDeal.dealPrice}</p>
                                        </div>
                                        <div className="text-center">
                                          <p className="text-sm text-muted-foreground">You Save</p>
                                          <p className="font-semibold text-primary">{selectedDeal.discount}</p>
                                        </div>
                                      </div>

                                      {/* Stats */}
                                      <div className="flex items-center justify-center gap-8 py-4 border-y">
                                        <div className="text-center">
                                          <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                                            <ArrowUp className="w-4 h-4" />
                                            <span className="font-bold text-lg">{selectedDeal.upvotes}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground">Upvotes</p>
                                        </div>
                                        <div className="text-center">
                                          <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                            <MessageCircle className="w-4 h-4" />
                                            <span className="font-bold text-lg">{selectedDeal.comments}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground">Comments</p>
                                        </div>
                                        <div className="text-center">
                                          <div className="flex items-center justify-center gap-1 text-purple-500 mb-1">
                                            <Eye className="w-4 h-4" />
                                            <span className="font-bold text-lg">{selectedDeal.views}</span>
                                          </div>
                                          <p className="text-xs text-muted-foreground">Views</p>
                                        </div>
                                      </div>

                                      {/* Actions */}
                                      <div className="flex gap-3">
                                        <Button asChild className="flex-1">
                                          <a href={selectedDeal.dealUrl} target="_blank" rel="noopener noreferrer">
                                            <ExternalLink className="w-4 h-4 mr-2" />
                                            Go to Deal
                                          </a>
                                        </Button>
                                        <Button variant="outline" className="flex-1">
                                          <BarChart3 className="w-4 h-4 mr-2" />
                                          View Analysis
                                        </Button>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                            </div>
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
