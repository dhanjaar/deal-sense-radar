export interface Deal {
  id: string;
  title: string;
  description?: string;
  url: string;
  source_url: string;
  upvotes: number;
  comment_count: number;
  scraped_at: string;
  created_at: string;
  updated_at: string;
  sentiment?: SentimentAnalysis;
}

export interface Comment {
  id: string;
  deal_id: string;
  user_id?: string;
  content: string;
  is_scraped: boolean;
  is_anonymous: boolean;
  sentiment_score?: number;
  created_at: string;
  updated_at: string;
  user_profile?: UserProfile;
}

export interface SentimentAnalysis {
  id: string;
  deal_id: string;
  positive_score: number;
  neutral_score: number;
  negative_score: number;
  overall_sentiment: 'positive' | 'neutral' | 'negative';
  confidence_score: number;
  analyzed_at: string;
  comment_count: number;
}

export interface UserProfile {
  id: string;
  display_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TrendingDeal {
  id: string;
  deal_id: string;
  trending_score: number;
  rank: number;
  calculated_at: string;
  deal: Deal;
}