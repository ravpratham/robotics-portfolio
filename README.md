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

## Future Supabase Integration

When ready to connect to Supabase:

1. Create a [Supabase account](https://supabase.com)
2. Get your project URL and API key
3. Add them to `.env`:
   ```
   VITE_SUPABASE_URL=your_project_url
   VITE_SUPABASE_ANON_KEY=your_anon_key
   ```
4. Create database tables and queries as needed
5. Update `src/App.tsx` to fetch data from Supabase

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
