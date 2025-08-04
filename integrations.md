# Supabase Integration Documentation

## Database Schema

### 1. Users Table (auth.users extended with profiles)

```sql
-- Create profiles table
CREATE TABLE public.profiles (
  id uuid REFERENCES auth.users ON DELETE CASCADE,
  email text,
  display_name text,
  avatar_url text,
  role text DEFAULT 'user' CHECK (role IN ('user', 'admin', 'moderator')),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  PRIMARY KEY (id)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);
```

### 2. Deals Table

```sql
CREATE TABLE public.deals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  description text,
  url text NOT NULL,
  source_url text,
  upvotes integer DEFAULT 0,
  comment_count integer DEFAULT 0,
  views integer DEFAULT 0,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected', 'sponsored')),
  category text,
  technology text,
  submitted_by uuid REFERENCES auth.users(id),
  scraped_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Approved deals are viewable by everyone" ON public.deals
  FOR SELECT USING (status = 'approved' OR status = 'sponsored');

CREATE POLICY "Admins can view all deals" ON public.deals
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Users can insert deals" ON public.deals
  FOR INSERT WITH CHECK (auth.uid() = submitted_by);

CREATE POLICY "Admins can update deals" ON public.deals
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );

CREATE POLICY "Admins can delete deals" ON public.deals
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role = 'admin'
    )
  );
```

### 3. Comments Table

```sql
CREATE TABLE public.comments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id uuid REFERENCES public.deals(id) ON DELETE CASCADE,
  user_id uuid REFERENCES auth.users(id),
  content text NOT NULL,
  is_scraped boolean DEFAULT false,
  is_anonymous boolean DEFAULT false,
  sentiment_score numeric,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Comments are viewable by everyone" ON public.comments
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can insert comments" ON public.comments
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own comments" ON public.comments
  FOR UPDATE USING (auth.uid() = user_id);
```

### 4. Sentiment Analysis Table

```sql
CREATE TABLE public.sentiment_analysis (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id uuid REFERENCES public.deals(id) ON DELETE CASCADE,
  positive_score numeric DEFAULT 0,
  neutral_score numeric DEFAULT 0,
  negative_score numeric DEFAULT 0,
  overall_sentiment text CHECK (overall_sentiment IN ('positive', 'neutral', 'negative')),
  confidence_score numeric DEFAULT 0,
  comment_count integer DEFAULT 0,
  analyzed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.sentiment_analysis ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Sentiment analysis is viewable by everyone" ON public.sentiment_analysis
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage sentiment analysis" ON public.sentiment_analysis
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.role IN ('admin', 'moderator')
    )
  );
```

### 5. Trending Deals Table

```sql
CREATE TABLE public.trending_deals (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  deal_id uuid REFERENCES public.deals(id) ON DELETE CASCADE,
  trending_score numeric DEFAULT 0,
  rank integer,
  calculated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS
ALTER TABLE public.trending_deals ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Trending deals are viewable by everyone" ON public.trending_deals
  FOR SELECT USING (true);
```

## Required Queries

### Admin Dashboard Queries

#### 1. Get All Deals with Pagination
```sql
SELECT 
  d.*,
  p.display_name as submitted_by_name,
  p.email as submitted_by_email,
  sa.overall_sentiment,
  sa.confidence_score
FROM deals d
LEFT JOIN profiles p ON d.submitted_by = p.id
LEFT JOIN sentiment_analysis sa ON d.id = sa.deal_id
ORDER BY d.created_at DESC
LIMIT 20 OFFSET $1;
```

#### 2. Update Deal Status
```sql
UPDATE deals 
SET status = $1, updated_at = NOW()
WHERE id = $2;
```

#### 3. Delete Deal
```sql
DELETE FROM deals WHERE id = $1;
```

#### 4. Get Pending Deals Count
```sql
SELECT COUNT(*) FROM deals WHERE status = 'pending';
```

#### 5. Get Deal Statistics
```sql
SELECT 
  COUNT(*) as total_deals,
  COUNT(*) FILTER (WHERE status = 'approved') as approved_deals,
  COUNT(*) FILTER (WHERE status = 'pending') as pending_deals,
  COUNT(*) FILTER (WHERE status = 'sponsored') as sponsored_deals,
  COUNT(*) FILTER (WHERE status = 'rejected') as rejected_deals
FROM deals;
```

### Frontend Queries

#### 1. Get Approved Deals
```sql
SELECT 
  d.*,
  sa.positive_score,
  sa.neutral_score,
  sa.negative_score,
  sa.overall_sentiment,
  sa.confidence_score,
  sa.comment_count as sentiment_comment_count
FROM deals d
LEFT JOIN sentiment_analysis sa ON d.id = sa.deal_id
WHERE d.status IN ('approved', 'sponsored')
ORDER BY 
  CASE WHEN d.status = 'sponsored' THEN 0 ELSE 1 END,
  d.created_at DESC
LIMIT 20 OFFSET $1;
```

#### 2. Search Deals
```sql
SELECT 
  d.*,
  sa.overall_sentiment,
  sa.confidence_score
FROM deals d
LEFT JOIN sentiment_analysis sa ON d.id = sa.deal_id
WHERE d.status IN ('approved', 'sponsored')
AND (
  d.title ILIKE '%' || $1 || '%' 
  OR d.description ILIKE '%' || $1 || '%'
  OR d.category ILIKE '%' || $1 || '%'
  OR d.technology ILIKE '%' || $1 || '%'
)
ORDER BY d.created_at DESC;
```

#### 3. Filter Deals by Category
```sql
SELECT 
  d.*,
  sa.overall_sentiment
FROM deals d
LEFT JOIN sentiment_analysis sa ON d.id = sa.deal_id
WHERE d.status IN ('approved', 'sponsored')
AND ($1 = 'all' OR d.category = $1)
ORDER BY d.created_at DESC;
```

#### 4. Increment Deal Views
```sql
UPDATE deals 
SET views = views + 1 
WHERE id = $1;
```

## Mock Data

### Insert Mock Deals
```sql
INSERT INTO deals (title, description, url, source_url, upvotes, comment_count, views, status, category, technology) VALUES
('Amazing AI Code Assistant', 'Revolutionary AI tool for developers', 'https://example.com/ai-tool', 'https://reddit.com/r/programming', 150, 45, 2300, 'approved', 'Tools', 'AI'),
('Next.js 14 Course Bundle', '50% off comprehensive Next.js course', 'https://example.com/nextjs-course', 'https://twitter.com/nextjs', 89, 23, 1200, 'approved', 'Education', 'Next.js'),
('Free Tailwind Components', 'Premium component library now free', 'https://example.com/tailwind-components', 'https://tailwindui.com', 234, 67, 3400, 'sponsored', 'Resources', 'Tailwind CSS'),
('Docker Desktop Alternative', 'Lightweight container management tool', 'https://example.com/docker-alt', 'https://news.ycombinator.com', 78, 34, 890, 'pending', 'Tools', 'Docker'),
('React Hook Form v8', 'Latest version with performance improvements', 'https://example.com/rhf-v8', 'https://github.com/react-hook-form', 156, 42, 1800, 'approved', 'Libraries', 'React');
```

### Insert Mock Sentiment Analysis
```sql
INSERT INTO sentiment_analysis (deal_id, positive_score, neutral_score, negative_score, overall_sentiment, confidence_score, comment_count) 
SELECT 
  id,
  0.7 + (random() * 0.3),
  0.1 + (random() * 0.2),
  0.0 + (random() * 0.2),
  'positive',
  0.8 + (random() * 0.2),
  comment_count
FROM deals 
WHERE status IN ('approved', 'sponsored');
```

### Create Admin User
```sql
-- After user signs up, update their profile to admin
UPDATE profiles 
SET role = 'admin' 
WHERE email = 'admin@vibedealhub.me';
```

## Functions and Triggers

### Auto-update timestamp trigger
```sql
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_deals_updated_at BEFORE UPDATE ON deals
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

### Auto-create profile trigger
```sql
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, display_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'display_name');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
```