import { SentimentAnalysis } from '@/types/deal';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { SmilePlus, Meh, Frown } from 'lucide-react';

interface SentimentDisplayProps {
  sentiment: SentimentAnalysis;
  showDetails?: boolean;
}

export const SentimentDisplay = ({ sentiment, showDetails = true }: SentimentDisplayProps) => {
  const getSentimentIcon = (overall: string) => {
    switch (overall) {
      case 'positive':
        return <SmilePlus className="w-4 h-4" />;
      case 'negative':
        return <Frown className="w-4 h-4" />;
      default:
        return <Meh className="w-4 h-4" />;
    }
  };

  const getSentimentClass = (overall: string) => {
    switch (overall) {
      case 'positive':
        return 'sentiment-positive';
      case 'negative':
        return 'sentiment-negative';
      default:
        return 'sentiment-neutral';
    }
  };

  const getSentimentLabel = (overall: string) => {
    switch (overall) {
      case 'positive':
        return 'Positive';
      case 'negative':
        return 'Negative';
      default:
        return 'Neutral';
    }
  };

  return (
    <div className="space-y-3">
      {/* Overall Sentiment */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge
            variant="secondary"
            className={`${getSentimentClass(sentiment.overall_sentiment)} font-medium`}
          >
            {getSentimentIcon(sentiment.overall_sentiment)}
            {getSentimentLabel(sentiment.overall_sentiment)}
          </Badge>
          <span className="text-sm text-muted-foreground">
            {Math.round(sentiment.confidence_score * 100)}% confidence
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          {sentiment.comment_count} comments analyzed
        </span>
      </div>

      {/* Detailed Breakdown */}
      {showDetails && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <SmilePlus className="w-3 h-3 text-green-600" />
              <span>Positive</span>
            </div>
            <span className="font-medium">{Math.round(sentiment.positive_score * 100)}%</span>
          </div>
          <Progress 
            value={sentiment.positive_score * 100} 
            className="h-2 bg-green-100 dark:bg-green-900/20"
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Meh className="w-3 h-3 text-yellow-600" />
              <span>Neutral</span>
            </div>
            <span className="font-medium">{Math.round(sentiment.neutral_score * 100)}%</span>
          </div>
          <Progress 
            value={sentiment.neutral_score * 100} 
            className="h-2 bg-yellow-100 dark:bg-yellow-900/20"
          />

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2">
              <Frown className="w-3 h-3 text-red-600" />
              <span>Negative</span>
            </div>
            <span className="font-medium">{Math.round(sentiment.negative_score * 100)}%</span>
          </div>
          <Progress 
            value={sentiment.negative_score * 100} 
            className="h-2 bg-red-100 dark:bg-red-900/20"
          />
        </div>
      )}
    </div>
  );
};