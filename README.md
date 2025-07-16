# PromptBase - College Essay Repository

A modern, database-backed college essay repository built with Next.js and Supabase. Browse real college essays from admitted students, filter by school, major, and prompt type, and contribute your own successful essays.

## Features

- 📚 **Browse Essays**: Read through successful college essays from top universities
- 🔍 **Advanced Filtering**: Filter by college, major, prompt type, and search by keywords
- 📝 **Submit Essays**: Contribute your own successful essays to help others
- 🌙 **Dark Mode**: Beautiful UI with light/dark theme support
- ⚡ **Fast & Modern**: Built with Next.js 15, TypeScript, and Tailwind CSS
- 🗄️ **Database-Backed**: Powered by Supabase for real-time data management

## Tech Stack

- **Frontend**: Next.js 15, TypeScript, Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **UI Components**: shadcn/ui
- **Form Handling**: React Hook Form with Zod validation
- **Deployment**: Vercel (or any Node.js hosting)

## Quick Start

### 1. Clone and Install

```bash
git clone <your-repo>
cd promptbase
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Copy your project URL and anon key
3. Copy `.env.local.example` to `.env.local`:

```bash
cp .env.local.example .env.local
```

4. Update `.env.local` with your Supabase credentials:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-api-key-here
```

### 3. Create Database Schema

Run the following SQL in your Supabase SQL editor:

```sql
CREATE TABLE essays (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  college TEXT NOT NULL,
  prompt TEXT NOT NULL,
  major TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  year INTEGER NOT NULL,
  verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE essays ENABLE ROW LEVEL SECURITY;

-- Allow read access to all essays
CREATE POLICY "Allow read access for all users" ON essays FOR SELECT USING (true);

-- Allow insert access for all users (you may want to restrict this later)
CREATE POLICY "Allow insert access for all users" ON essays FOR INSERT WITH CHECK (true);
```

### 4. Run the Application

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Development Guide

### Project Structure

```
src/
├── app/                    # Next.js app router
│   ├── essays/            # Essay listing and detail pages
│   ├── submit/            # Essay submission page
│   └── layout.tsx         # Root layout with theme provider
├── components/            # Reusable UI components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
└── lib/
    ├── supabase.ts       # Database functions and types
    └── utils.ts          # Utility functions
```

### Key Functions

The `src/lib/supabase.ts` file contains all database operations:

- `getEssays()` - Fetch all essays
- `getEssayById(id)` - Fetch a specific essay
- `createEssay(data)` - Create a new essay
- `updateEssay(id, data)` - Update an essay
- `deleteEssay(id)` - Delete an essay

### Adding New Features

1. **New Essay Fields**: Update the `Essay` type in `supabase.ts` and modify the database schema
2. **Additional Filters**: Add new filter options in `FilterBar` component and update filter logic
3. **User Authentication**: Integrate Supabase Auth for user-specific features

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy!

### Deploy to Other Platforms

Ensure your hosting platform supports:
- Node.js runtime
- Environment variables
- Static file serving

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Ensure tests pass: `npm run build`
5. Submit a pull request

## Jupyter Notebook Migration Guide

See `supabase_essay_migration.ipynb` for a step-by-step guide on setting up Supabase and migrating data.

## License

MIT License - see LICENSE file for details.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
