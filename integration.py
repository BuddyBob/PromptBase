
SUPABASE_URL = "https://picdlbmovjvgoczyxngh.supabase.co"
SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBpY2RsYm1vdmp2Z29jenl4bmdoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI2NDQ3NjQsImV4cCI6MjA2ODIyMDc2NH0.6OXNQHILWGfbFS9BRNOmIQEx3gwcs7WM1ozzaiJ5yIM"

# Import required libraries
from supabase import create_client, Client
import json
from datetime import datetime

# Initialize the Supabase client
supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

# Your essay data (converted from TypeScript to Python)
essays_data = [
    {
        "title": "Common App - Personal Growth",
        "college": "Stanford University",
        "prompt": "Common App - Personal Growth",
        "major": "Computer Science",
        "word_count": 650,
        "year": 2023,
        "content": "The first time I wrote code, I was thirteen years old. My father, a software engineer, had shown me a simple Python script that printed 'Hello, World!' to the console. That moment sparked a curiosity that would grow into a passion. But my journey with programming wasn't always smooth...",
        "verified": True,
    },
    {
        "title": "Stanford Roommate Essay",
        "college": "Stanford University",
        "prompt": "Stanford Roommate",
        "major": "Biology",
        "word_count": 250,
        "year": 2022,
        "content": "Dear future roommate, I want to introduce myself beyond the typical resume and application. I'm the person who alphabetizes their spice rack but leaves laundry unfolded for days. I'm the night owl who functions best after midnight, fueled by chamomile tea and the playlist I've curated for late-night study sessions...",
        "verified": True,
    },
    {
        "title": "UC Personal Insight Question 2",
        "college": "UC Berkeley",
        "prompt": "UC PIQ - Creative Expression",
        "major": "English Literature",
        "word_count": 350,
        "year": 2023,
        "content": "My creativity expresses itself in unexpected ways. While I've never considered myself an artist in the traditional sense, words have always been my medium. I started writing short stories when I was nine, filling notebooks with tales of adventure and mystery...",
        "verified": False,
    },
    {
        "title": "Harvard 'What You Would Contribute'",
        "college": "Harvard University",
        "prompt": "Community Contribution",
        "major": "Economics",
        "word_count": 500,
        "year": 2022,
        "content": "Community has always been central to my identity. Growing up in a small town in rural Minnesota, I learned early on that collective effort creates resilience. When our local library faced budget cuts, I organized a fundraising campaign that ultimately saved three staff positions...",
        "verified": True,
    },
    {
        "title": "MIT 'World You Come From'",
        "college": "MIT",
        "prompt": "Background and Identity",
        "major": "Physics",
        "word_count": 400,
        "year": 2023,
        "content": "The sound of my grandmother's sewing machine is the soundtrack of my childhood. In our two-bedroom apartment in Queens, she would work late into the night, transforming fabric into clothing for our family and neighbors. I would sit at her feet, collecting scraps and learning to see potential in what others might discard...",
        "verified": True,
    }
]

print(f"📊 Prepared {len(essays_data)} essays for insertion")

# Insert essays into Supabase
try:
    response = supabase.table('essays').insert(essays_data).execute()
    print(f"✅ Successfully inserted {len(response.data)} essays!")
    
    # Display the first inserted essay for verification
    if response.data:
        first_essay = response.data[0]
        print(f"\n📝 First essay inserted:")
        print(f"   ID: {first_essay['id']}")
        print(f"   Title: {first_essay['title']}")
        print(f"   College: {first_essay['college']}")
        
except Exception as e:
    print(f"❌ Error inserting essays: {e}")
    print("Make sure the 'essays' table exists in your Supabase database.")