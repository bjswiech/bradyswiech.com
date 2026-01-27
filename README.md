# bradyswiech.com

Personal website and portfolio for Brady Swiech, showcasing projects, skills, disc golf achievements, and faith journey.

## 🚀 Features

- **Portfolio Showcase**: Display of projects including Vigil and Sprout
- **Skills & Technologies**: Interactive technology stack organized by category
- **Disc Golf Section**: 
  - Auto-updating PDGA rating (fetches on the 14th of each month)
  - Rating change indicators with up/down arrows
  - Disc bag inventory with links to Infinite Discs
  - Social media links for disc golf content
- **Faith Testimony**: Personal testimony and scripture
- **Responsive Design**: Mobile-friendly navigation with hamburger menu
- **Smooth Scrolling**: Section-based navigation with active section highlighting

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: CSS3 with custom animations and gradients
- **Icons**: FontAwesome, Lucide React
- **Deployment**: GitHub Pages / Vercel ready

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:
```bash
git clone https://github.com/bjswiech/bradyswiech.com.git
cd bradyswiech.com
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Project Structure

```
bradyswiech.com/
├── app/
│   ├── about/          # About page
│   ├── api/
│   │   └── pdga-rating/  # API route for PDGA rating fetching
│   ├── contact/        # Contact page
│   ├── disc-golf/      # Disc golf page
│   ├── faith/          # Faith testimony page
│   ├── portfolio/      # Portfolio page
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Main homepage
├── components/
│   ├── footer.tsx      # Footer component
│   ├── header.tsx      # Navigation header
│   └── project-card.tsx # Project card component
├── public/             # Static assets
├── styles/
│   └── globals.css     # Global styles
└── data/               # Cached PDGA rating data (gitignored)
```

## 🔧 Key Features Explained

### PDGA Rating Auto-Update

The website automatically fetches the PDGA rating from the PDGA website:
- Fetches on the 14th of each month (when ratings are updated)
- Caches data locally to reduce API calls
- Shows rating change from previous month with visual indicators
- Falls back to cached data if fetch fails

### Responsive Navigation

- Desktop: Horizontal navigation bar with active section highlighting
- Mobile: Hamburger menu with full-screen overlay
- Smooth scroll to sections with offset for fixed header

## 📝 Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Deployment

The site can be deployed to:
- **Vercel**: Recommended for Next.js apps
- **GitHub Pages**: Configured for static export
- **Netlify**: Compatible with Next.js

## 📧 Contact

- **Email**: bjswiech.bs@gmail.com
- **LinkedIn**: [brady-swiech-1a8a59239](https://linkedin.com/in/brady-swiech-1a8a59239)
- **GitHub**: [bjswiech](https://github.com/bjswiech)

## 📄 License

This project is private and personal.
