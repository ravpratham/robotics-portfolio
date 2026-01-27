# Robotics Portfolio Website

A professional dark-themed portfolio website for "Introduction to Robotics" course, featuring an interactive assignment management system.

## ✨ Features

- 🎨 Dark theme with blue-purple gradient accents
- 🎠 Auto-playing image carousel with robotics/machinery images
- ➕ Dynamic assignment management (add/remove assignments)
- 🗑️ Delete assignments with hover interaction
- 📱 Fully responsive design
- 🎯 Built with React, Tailwind CSS, and shadcn/ui components

## 🚀 Quick Start

### Prerequisites
- Node.js (version 16 or higher)
- Yarn package manager

### Installation

```bash
# Install dependencies
yarn install

# Start development server
yarn start
```

The website will open at `http://localhost:3000`

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── HeroSection.jsx  # Hero section with carousel
│   ├── AssignmentsSection.jsx # Assignment management
│   └── Footer.jsx       # Footer component
├── pages/
│   └── Home.jsx         # Main page
├── data/
│   └── assignmentsData.js # Data structure for future backend
├── App.js
└── index.js
```

## 🎨 Customization

### Update Carousel Images
Edit `src/components/HeroSection.jsx`:
```javascript
const carouselImages = [
  { url: 'YOUR_IMAGE_URL', alt: 'Description' },
  // Add more...
];
```

### Change Colors
Modify gradient colors in components:
- Hero: `from-blue-400 via-purple-500 to-blue-600`
- Buttons: `from-blue-500 to-purple-600`
- Background: `from-black via-gray-950 to-black`

## 🔧 Available Scripts

- `yarn start` - Start development server
- `yarn build` - Build for production
- `yarn test` - Run tests

## 🌐 Deployment

Build the project:
```bash
yarn build
```

Deploy the `build/` folder to:
- Netlify
- Vercel
- GitHub Pages
- Any static hosting service

## 🔮 Future Enhancements

The project is structured for easy backend integration:
- Supabase for database
- Persistent assignment storage
- User authentication
- File uploads for assignments

## 🛠️ Technologies Used

- React 19
- Tailwind CSS
- shadcn/ui components
- Lucide React icons
- React Router DOM

## 📝 License

© 2026 Introduction to Robotics. All rights reserved.

---

**Made with ❤️ for robotics education**
