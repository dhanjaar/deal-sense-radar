import { useState } from 'react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { SentimentDisplay } from './SentimentDisplay';
import { Deal } from '@/types/deal';
import {
  ArrowUp,
  MessageCircle,
  ExternalLink,
  TrendingUp,
  Clock,
  BarChart3
} from 'lucide-react';

interface DealCardProps {
  deal: Deal;
  onAnalyze: (dealId: string) => void;
}

export const DealCard = ({ deal, onAnalyze }: DealCardProps) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalyze = async () => {
    setIsAnalyzing(true);
    await onAnalyze(deal.id);
    setIsAnalyzing(false);
  };

  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  const getTrendingScore = () => {
    // Simple trending algorithm based on upvotes and recency
    const hoursOld = (new Date().getTime() - new Date(deal.created_at).getTime()) / (1000 * 60 * 60);
    return Math.max(0, deal.upvotes - hoursOld * 0.1);
  };

  return (
    <Card className="deal-card glass-card group">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
            {deal.title}
          </h3>
          {getTrendingScore() > 50 && (
            <Badge variant="secondary" className="shrink-0">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>
        
        {deal.description && (
          <p className="text-muted-foreground text-sm line-clamp-2 mt-2">
            {deal.description}
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Deal Stats */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <ArrowUp className="w-4 h-4" />
            <span>{deal.upvotes}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageCircle className="w-4 h-4" />
            <span>{deal.comment_count}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(deal.created_at)}</span>
          </div>
        </div>

        {/* Sentiment Analysis */}
        {deal.sentiment ? (
          <SentimentDisplay sentiment={deal.sentiment} />
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-dashed">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              No sentiment analysis yet
            </span>
          </div>
        )}
      </CardContent>

      <CardFooter className="pt-0 flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={handleAnalyze}
          disabled={isAnalyzing}
        >
          <BarChart3 className="w-4 h-4 mr-2" />
          {isAnalyzing ? 'Analyzing...' : 'Analyze Sentiment'}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          asChild
        >
          <a href={deal.url} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};