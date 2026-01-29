# 📐 Math Scholar Hub

A modern, intuitive platform for learning and exploring advanced mathematical concepts. Built with React, TypeScript, and Tailwind CSS, Math Scholar Hub transforms complex theorems into engaging, accessible content for learners at all levels.

![Mathematics](https://img.shields.io/badge/Mathematics-Education-blue)
![React](https://img.shields.io/badge/React-18-61dafb)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38bdf8)

## ✨ Features

- **📚 Comprehensive Articles**: In-depth mathematical content covering Calculus, Algebra, Geometry, Number Theory, Probability, and more
- **🎯 Progressive Learning Paths**: Structured content from beginner to advanced levels
- **🔍 Smart Search & Filtering**: Find topics by difficulty, category, or keywords
- **📊 Interactive Examples**: Step-by-step walkthroughs with mathematical notation (KaTeX)
- **🎨 Modern UI/UX**: Beautiful, responsive design with dark mode support
- **📱 Mobile Friendly**: Fully responsive across all devices
- **⚡ Fast & Performant**: Built with Vite for optimal performance

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/abhishekrajput1235/math-scholar-hub.git
cd math-scholar-hub
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
npm run preview
```

## 🏗️ Project Structure

```
math-scholar-hub/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui components
│   │   ├── BlogCard.tsx    # Article card component
│   │   ├── Navbar.tsx      # Navigation bar
│   │   └── Footer.tsx      # Footer component
│   ├── pages/              # Page components
│   │   ├── Home.tsx        # Landing page
│   │   ├── Topics.tsx      # Topics browser
│   │   ├── BlogListing.tsx # Article listing
│   │   ├── BlogDetail.tsx  # Article reader
│   │   └── About.tsx       # About page
│   ├── hooks/              # Custom React hooks
│   │   ├── use-posts.ts    # Posts data & fetching
│   │   └── use-toast.ts    # Toast notifications
│   ├── lib/                # Utility functions
│   │   ├── utils.ts        # Helper functions
│   │   └── types.ts        # TypeScript types
│   ├── App.tsx             # Main app component
│   └── main.tsx            # App entry point
├── public/                 # Static assets
├── index.html             # HTML template
└── package.json           # Dependencies
```

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui
- **Icons**: Lucide React
- **Routing**: Wouter
- **Data Fetching**: TanStack Query (React Query)
- **Math Rendering**: ReactMarkdown + KaTeX
- **Build Tool**: Vite
- **Date Formatting**: date-fns

## 📖 Content Topics

### Covered Topics

- **Calculus**: Fundamental Theorem, Derivatives, Integrals
- **Algebra**: Group Theory, Linear Algebra, Vector Spaces
- **Geometry**: Euclidean Geometry, Non-Euclidean Spaces
- **Number Theory**: Prime Numbers, Riemann Hypothesis
- **Probability**: Probability Theory, Statistics
- **And more...**

## 🎨 Key Pages

### Home
- Hero section with animated background
- Featured topics and statistics
- Learning paths (Beginner → Advanced)
- Testimonials and community showcase

### Topics
- Browse all mathematical topics
- Filter by difficulty (Beginner/Intermediate/Advanced)
- Search functionality
- Learning path recommendations

### Blog Listing
- View all articles in grid or list mode
- Advanced filtering (topic, difficulty, search)
- Sort by date or alphabetically
- Active filters display

### Blog Detail
- Full article with mathematical notation
- Reading progress indicator
- Interactive floating actions (bookmark, scroll-to-top)
- Key takeaways section
- Related articles
- Author information

### About
- Mission and values
- Team members
- Platform statistics
- Milestone timeline
- Community call-to-action

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 👤 Author

**Abhishek Rajput**
- GitHub: [@abhishekrajput1235](https://github.com/abhishekrajput1235)

## 🌟 Acknowledgments

- UI components from [Shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)
- Math rendering with [KaTeX](https://katex.org/)

## 📧 Contact

For questions or feedback, feel free to reach out at: contact@mathlog.com

---

Made with ❤️ for mathematics education
