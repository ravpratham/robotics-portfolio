# Introduction to Robotics - Portfolio Website

A beautiful, dark-themed portfolio website for showcasing robotics assignments with a professional design, image carousel, and expandable assignment sections.

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
  - This includes **npm** (Node Package Manager)
- **Git** - [Download](https://git-scm.com/)
- A code editor like **Visual Studio Code** - [Download](https://code.visualstudio.com/)

### Verify Installation

Run these commands in your terminal to verify installations:

```bash
node --version
npm --version
git --version
```

All three should return version numbers (e.g., `v18.17.0`).

## Project Setup

### Step 1: Clone or Download the Project

If the project is on GitHub:
```bash
git clone <repository-url>
cd project
```

Or if you have a ZIP file:
```bash
# Extract the ZIP file
unzip project.zip
cd project
```

### Step 2: Install Dependencies

Navigate to the project directory and install all required packages:

```bash
npm install
```

This command reads `package.json` and installs all dependencies listed in the `node_modules` folder. This may take a few minutes on first installation.

### Step 3: Environment Setup (Optional - for Future Supabase Integration)

Create a `.env` file in the root directory if you plan to connect to Supabase:

```bash
# Create the file
touch .env
```

Add the following variables (you'll fill these in when ready to use Supabase):

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

For now, these are optional since the website is static.

## Running the Project

### Development Server

To start the development server and view your website locally:

```bash
npm run dev
```

The terminal will output something like:
```
  VITE v5.4.2  ready in 123 ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

Open your browser and visit `http://localhost:5173/` to see the website.

**Features in dev mode:**
- Hot Module Replacement (HMR) - changes update instantly without page reload
- Development-friendly error messages
- Source maps for easier debugging

### Building for Production

When ready to deploy, create an optimized production build:

```bash
npm run build
```

This creates a `dist` folder containing optimized, minified files ready for deployment.

### Preview Production Build

To test the production build locally:

```bash
npm run preview
```

This serves the files from the `dist` folder at `http://localhost:4173/`.

## Project Structure

```
project/
├── src/
│   ├── App.tsx              # Main component with hero, carousel, assignments
│   ├── main.tsx             # React entry point
│   ├── index.css            # Global styles (Tailwind CSS)
│   └── vite-env.d.ts        # TypeScript declarations for Vite
├── public/                  # Static assets
├── dist/                    # Production build (generated after npm run build)
├── index.html               # HTML template
├── package.json             # Project dependencies and scripts
├── vite.config.ts           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
├── postcss.config.js        # PostCSS configuration
└── README.md               # This file
```

## Tech Stack

- **Vite** - Fast build tool and dev server
- **React 18** - UI library
- **TypeScript** - Typed JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **Supabase** - Backend ready (for future integration)

## Available Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |
| `npm run typecheck` | Check TypeScript types |

## How to Add New Assignments

To add more assignment sections, edit `src/App.tsx`:

1. Find the `assignments` array (around line 14)
2. Add a new object following this format:

```typescript
{
  id: 3,
  title: 'Assignment 3',
  description: 'Content coming soon...',
  section: 'Section 3'
}
```

3. Save the file - changes appear instantly in dev mode
4. The grid will automatically adjust to display all assignments

## Customization Guide

### Change Hero Text

Edit `src/App.tsx` line 68-74:
```typescript
<h1 className="text-7xl md:text-9xl font-bold text-white mb-6 tracking-tight">
  Introduction to
  <br />
  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
    Robotics
  </span>
</h1>
```

### Change Carousel Images

Edit `src/App.tsx` lines 7-12. Replace URLs with your own:
```typescript
const carouselImages = [
  'your-image-url-1',
  'your-image-url-2',
  'your-image-url-3',
  'your-image-url-4'
];
```

### Modify Colors

The theme uses Tailwind CSS color classes:
- `slate-950`, `slate-900` - Dark backgrounds
- `blue-950`, `blue-500`, `blue-400` - Blue tones
- `cyan-400` - Cyan accents

Edit the className values throughout `src/App.tsx` to customize.

## Troubleshooting

### Port Already in Use

If `http://localhost:5173` says port is in use:
```bash
npm run dev -- --port 3000
```

### Dependencies Won't Install

Try clearing npm cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Changes Not Appearing

1. Make sure the dev server is running
2. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check the terminal for error messages

### TypeScript Errors

Run type checking:
```bash
npm run typecheck
```

### Build Fails

Ensure all TypeScript errors are resolved:
```bash
npm run typecheck
npm run lint
npm run build
```

## Deployment

### For Vercel

```bash
# Push code to GitHub
git push origin main

# Connect GitHub repo to Vercel at vercel.com
```

### For Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

### For Other Hosts

1. Run `npm run build`
2. Upload the `dist` folder to your hosting provider
3. Configure the server to serve `index.html` for all routes

## Supabase Integration for Assignments

This project uses Supabase as a backend database to store and sync assignments across all users. The assignments are stored in the cloud and accessible to all visitors.

### Supabase Setup

#### Step 1: Create a Supabase Project

1. Go to [Supabase](https://supabase.com) and sign in
2. Click "New Project" and fill in the details:
   - **Name**: robotics-portfolio (or your choice)
   - **Password**: Generate a strong password
3. Wait for the project to be created (1-2 minutes)

#### Step 2: Create the Assignments Table

In your Supabase project dashboard:

1. Go to **SQL Editor** in the left sidebar
2. Click **New query**
3. Copy and paste the following SQL:

```sql
-- Create assignments table
create table assignments (
  id bigint generated by default as identity primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  title text not null,
  description text,
  section text not null,
  content text,
  youtube_url text
);

-- Enable Row Level Security
alter table assignments enable row level security;

-- Create policies for public access
create policy "Enable read access for all users" on assignments
  for select using (true);
  
create policy "Enable insert for authenticated users only" on assignments
  for insert to authenticated with check (true);

create policy "Enable update for authenticated users only" on assignments
  for update to authenticated using (true);

create policy "Enable delete for authenticated users only" on assignments
  for delete to authenticated using (true);
```

4. Click **Run** to execute the SQL

#### Step 3: Get API Credentials

1. Go to **Project Settings** (gear icon) → **API**
2. Copy the **Project URL** (e.g., `https://abcdefghijklmnop.supabase.co`)
3. Copy the **anon** public key under **Project URL**

#### Step 4: Configure Environment Variables

1. Create a `.env` file in the project root:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and add your credentials:
   ```
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

#### Step 5: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import your GitHub repository
3. In the **Environment Variables** section, add:
   - `VITE_SUPABASE_URL` = your Supabase project URL
   - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Deploy**

### How It Works

- **Data Storage**: Assignments are stored in Supabase cloud database
- **Syncing**: Changes sync automatically when Supabase is configured
- **Fallback**: If Supabase is not configured, data is stored in localStorage (only visible locally)
- **Authentication**: Only authenticated users can add/edit/delete assignments (future feature)

### Database Schema

| Column | Type | Description |
|--------|------|-------------|
| id | bigint | Unique identifier (auto-generated) |
| created_at | timestamp | When the assignment was created |
| title | text | Assignment title |
| description | text | Brief description |
| section | text | Section name/category |
| content | text | Full assignment content (rich text) |
| youtube_url | text | YouTube video URL for embedding |

### Troubleshooting

**Assignments not syncing:**
- Check that environment variables are set in Vercel
- Verify the Supabase table was created correctly
- Check browser console for error messages

**Supabase connection failed:**
- Ensure your Supabase project is active
- Verify the URL and anon key are correct
- Check that the RLS policies allow the operation

## Support & Resources

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [Lucide React Icons](https://lucide.dev/)

## License

This project is open source and available under the MIT License.

---

Happy coding! If you encounter any issues, refer to the Troubleshooting section or check the documentation links above.
