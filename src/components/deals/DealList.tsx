import { useState } from 'react';
import { DealCard } from './DealCard';
import { Deal } from '@/types/deal';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface DealListProps {
  deals: Deal[];
  hasNextPage: boolean;
  onLoadMore: () => void;
  isLoading?: boolean;
}

export const DealList = ({ deals, hasNextPage, onLoadMore, isLoading = false }: DealListProps) => {
  const [analyzingDeals, setAnalyzingDeals] = useState<Set<string>>(new Set());

  const handleAnalyze = async (dealId: string) => {
    setAnalyzingDeals(prev => new Set(prev).add(dealId));
    
    try {
      // Simulate API call for sentiment analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In real implementation, this would call the sentiment analysis API
      console.log('Analyzing deal:', dealId);
    } finally {
      setAnalyzingDeals(prev => {
        const newSet = new Set(prev);
        newSet.delete(dealId);
        return newSet;
      });
    }
  };

  if (deals.length === 0 && !isLoading) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No deals found.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Deal Cards Grid - More condensed */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {deals.map((deal) => (
          <DealCard
            key={deal.id}
            deal={deal}
            onAnalyze={handleAnalyze}
          />
        ))}
      </div>

      {/* Load More Button */}
      {hasNextPage && (
        <div className="flex justify-center pt-8">
          <Button
            onClick={onLoadMore}
            disabled={isLoading}
            variant="outline"
            size="lg"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Loading more deals...
              </>
            ) : (
              'Load More Deals'
            )}
          </Button>
        </div>
      )}

      {/* Loading State */}
      {isLoading && deals.length === 0 && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="h-40 rounded-xl bg-muted/50 animate-pulse"
            />
          ))}
        </div>
      )}
    </div>
  );
};