-- Create saved_essays table for users to save essays
CREATE TABLE IF NOT EXISTS saved_essays (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    essay_id UUID NOT NULL REFERENCES essays(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, essay_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_saved_essays_user_id ON saved_essays(user_id);
CREATE INDEX IF NOT EXISTS idx_saved_essays_essay_id ON saved_essays(essay_id);
CREATE INDEX IF NOT EXISTS idx_saved_essays_created_at ON saved_essays(created_at);

-- Add RLS policies for saved_essays
ALTER TABLE saved_essays ENABLE ROW LEVEL SECURITY;

-- Users can only see their own saved essays
CREATE POLICY "Users can view their own saved essays" ON saved_essays
    FOR SELECT USING (auth.uid() = user_id);

-- Users can only save essays for themselves
CREATE POLICY "Users can save essays for themselves" ON saved_essays
    FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can only unsave their own saved essays
CREATE POLICY "Users can unsave their own essays" ON saved_essays
    FOR DELETE USING (auth.uid() = user_id);

-- Add views and likes count to essays (if not already present)
ALTER TABLE essays ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- Create a function to increment views
CREATE OR REPLACE FUNCTION increment_essay_views(essay_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE essays 
    SET views = COALESCE(views, 0) + 1 
    WHERE id = essay_id;
END;
$$ LANGUAGE plpgsql;
