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
  BarChart3,
  Eye
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
    <Card className="deal-card glass-card group hover:shadow-elevated transition-all duration-300">
      <CardContent className="p-4">
        {/* Header with title and trending badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <h3 className="font-semibold text-base leading-tight line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {deal.title}
          </h3>
          {getTrendingScore() > 50 && (
            <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-primary/20">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>
        
        {/* Compact stats row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <ArrowUp className="w-3 h-3 text-green-500" />
              <span className="font-medium">{deal.upvotes}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3 text-blue-500" />
              <span>{deal.comment_count}</span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="w-3 h-3 text-purple-500" />
              <span>{deal.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            <span>{timeAgo(deal.created_at)}</span>
          </div>
        </div>

        {/* Sentiment Analysis - more compact */}
        {deal.sentiment ? (
          <div className="mb-3">
            <SentimentDisplay sentiment={deal.sentiment} />
          </div>
        ) : (
          <div className="flex items-center gap-2 p-2 rounded-md bg-muted/30 border border-dashed mb-3">
            <BarChart3 className="w-3 h-3 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">
              Sentiment analysis pending
            </span>
          </div>
        )}

        {/* Action buttons - more compact */}
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <BarChart3 className="w-3 h-3 mr-1" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0"
            asChild
          >
            <a href={deal.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-3 h-3" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};