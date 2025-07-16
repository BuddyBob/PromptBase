
SUPABASE_URL = "https://picdlbmovjvgoczyxngh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY2RsYm1vdmp2Z29jenl4bmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDQ3NjQsImV4cCI6MjA2ODIyMDc2NH0.6OXNQHILWGfbFS9BRNOmIQEx3gwcs7WM1ozzaiJ5yIM"

# Import required libraries
from supabase import create_client, Client
import json
from datetime import datetime

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

#create a new column 'like' in the 'essays' table
def add_like_column():

        response = supabase.table('essays')

add_like_column()