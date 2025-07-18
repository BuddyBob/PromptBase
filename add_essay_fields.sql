-- Add new fields to essays table
ALTER TABLE essays 
ADD COLUMN essay_type TEXT CHECK (essay_type IN ('common_app', 'supplemental', 'piq')),
ADD COLUMN target_college TEXT,
ADD COLUMN is_admitted BOOLEAN;

-- Add comments for clarity
COMMENT ON COLUMN essays.essay_type IS 'Type of college essay: common_app, supplemental, or piq';
COMMENT ON COLUMN essays.target_college IS 'College the essay was written for (can be different from admitted college)';
COMMENT ON COLUMN essays.is_admitted IS 'Whether the student was admitted to their target college. NULL for high school seniors who haven''t applied yet';
