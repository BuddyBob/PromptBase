-- Add user_id column to essays table (nullable for anonymous posts)
ALTER TABLE essays ADD COLUMN user_id UUID REFERENCES auth.users (id);

-- Add author information columns
ALTER TABLE essays ADD COLUMN author_name VARCHAR(255);
ALTER TABLE essays ADD COLUMN author_email VARCHAR(255);

-- Remove likes column from essays table
ALTER TABLE essays DROP COLUMN likes;

-- Create likes table to track user likes
CREATE TABLE likes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users (id),
  essay_id UUID REFERENCES essays (id),
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE (user_id, essay_id)
);
