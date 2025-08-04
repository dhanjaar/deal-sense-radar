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
    <Card className="bg-card rounded-2xl shadow-soft dark:shadow-[0_4px_25px_-5px_rgba(255,107,53,0.15),0_10px_40px_-15px_rgba(255,107,53,0.1)] overflow-hidden transition-all duration-300 hover:shadow-elevated group border-border">
      <CardContent className="p-4 lg:p-6">
        {/* Header with title and trending badge */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <h3 className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors flex-1">
            {deal.title}
          </h3>
          {getTrendingScore() > 50 && (
            <Badge variant="secondary" className="shrink-0 bg-primary/10 text-primary border-primary/20 text-xs">
              <TrendingUp className="w-3 h-3 mr-1" />
              Hot
            </Badge>
          )}
        </div>
        
        {/* Stats row with better spacing */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <ArrowUp className="w-4 h-4 text-success" />
              <span className="font-medium text-foreground">{deal.upvotes}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <MessageCircle className="w-4 h-4 text-primary" />
              <span>{deal.comment_count}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-muted-foreground" />
              <span>{deal.views}</span>
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{timeAgo(deal.created_at)}</span>
          </div>
        </div>

        {/* Sentiment Analysis */}
        {deal.sentiment ? (
          <div className="mb-4">
            <SentimentDisplay sentiment={deal.sentiment} />
          </div>
        ) : (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-muted/50 border border-dashed border-border mb-4">
            <BarChart3 className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              Sentiment analysis pending
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-9 font-medium transition-all duration-200"
            onClick={handleAnalyze}
            disabled={isAnalyzing}
          >
            <BarChart3 className="w-4 h-4 mr-2" />
            {isAnalyzing ? 'Analyzing...' : 'Analyze'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            className="h-9 w-9 p-0 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            asChild
          >
            <a href={deal.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="w-4 h-4" />
            </a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};