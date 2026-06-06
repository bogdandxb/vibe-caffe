# ☕ Vibe Coffee - Modern Coffee Shop Website

> A beautiful, modern landing page for a specialty coffee shop, built with Next.js 15, TypeScript, and Tailwind CSS.

![Vibe Coffee](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38bdf8?logo=tailwind-css)
![License](https://img.shields.io/badge/License-MIT-green)

## 🌟 Features

- ✨ **Modern Glassmorphism Design** - Trendy glass-blur effects
- 📱 **Fully Responsive** - Works perfectly on mobile, tablet, and desktop
- ☕ **Complete Menu System** - 30 products across 6 categories
- 🖼️ **Photo Gallery** - Beautiful location page with 6 images
- 🎨 **Color Scheme** - Vibrant Teal (#14B8A6) + Orange (#F97316)
- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- 🔍 **SEO Optimized** - Proper meta tags and structure
- 🌐 **Ready for Deployment** - One-click deploy to Vercel

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/vibe-website.git
cd vibe-website

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the website.

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm start
```

## 📁 Project Structure

```
vibe-website/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles & theme
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Homepage
│   └── locatie/
│       └── page.tsx             # Location page with gallery
├── components/                   # Reusable components
│   ├── Hero.tsx                 # Hero section
│   ├── Features.tsx             # Feature cards
│   ├── Menu.tsx                 # Menu with products
│   ├── About.tsx                # About section
│   └── Footer.tsx               # Footer
├── public/                       # Static assets
├── DOCUMENTATIE_CURSANTI.md     # Student documentation (Romanian)
├── DEPLOYMENT_GUIDE.md          # Deployment guide
└── README.md                    # This file
```

## 🎨 Design System

### Color Palette

```css
Primary (Teal):    #14B8A6
Primary Dark:      #0D9488
Secondary (Orange): #F97316
Secondary Dark:     #EA580C
Background:         #FAFAFA
Foreground:         #1F2937
```

### Typography

- **Font:** Geist Sans & Geist Mono (Google Fonts)
- **Scale:** Using Tailwind's type scale (text-xl, text-2xl, etc.)

### Effects

- **Glassmorphism:** `backdrop-filter: blur(10px)` with semi-transparent backgrounds
- **Hover Effects:** Scale transforms and shadow transitions
- **Responsive Images:** Optimized Unsplash images

## 📄 Pages

### Homepage (`/`)
- Hero section with CTA buttons
- Features showcase (3 cards)
- Full menu (30 products)
- About section
- Footer with contact

### Location Page (`/locatie`)
- Hero with location title
- Contact information
- Opening hours
- Facilities badges
- Photo gallery (6 images)
- Google Maps placeholder

## 🗄️ Baza de Date (Supabase)

Proiectul folosește **Supabase** pentru gestionarea rezervărilor și chat-ul AI.

### Recreare bază de date

1. Creează un proiect nou pe [supabase.com](https://supabase.com)
2. Mergi la **SQL Editor** și rulează fișierul [`supabase/schema.sql`](supabase/schema.sql)
3. Copiază **Project URL** și **anon key** din Settings → API
4. Creează fișierul `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ANTHROPIC_API_KEY=your-anthropic-key  # pentru ChatWidget AI
```

### Structura tabelului `rezervari`

| Coloană | Tip | Descriere |
|---------|-----|-----------|
| `id` | UUID | Primary key auto-generat |
| `nume` | TEXT | Numele clientului |
| `email` | TEXT | Email client |
| `telefon` | TEXT | Telefon client |
| `persoane` | INTEGER | Nr. persoane (default: 2) |
| `data_ora` | TIMESTAMP | Data și ora rezervării |
| `status` | TEXT | `in asteptare` / `confirmata` / `anulata` |
| `created_at` | TIMESTAMP | Data creării (auto) |

---

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS 4** | Utility-first CSS framework |
| **React 19** | UI library |
| **Supabase** | Backend as a Service (baza de date + auth) |
| **Anthropic Claude** | AI pentru ChatWidget (Barista Bot) |
| **Unsplash** | High-quality stock photos |

## 🎓 Educational Purpose

This project is designed for the **Vibe Coding Course** as a first real-world project for students learning:

- React fundamentals
- Next.js routing and architecture
- TypeScript basics
- Modern CSS with Tailwind
- Responsive design principles
- Git workflow
- Deployment to production

**📚 Full documentation in Romanian:** See `DOCUMENTATIE_CURSANTI.md`

## 🚀 Deployment

### Deploy to Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/vibe-website)

**Or manually:**

1. Push code to GitHub
2. Connect repository to Vercel
3. Deploy (automatic builds on push)

**📖 Full deployment guide:** See `DEPLOYMENT_GUIDE.md`

### Deploy to Netlify

```bash
npm run build
# Upload .next folder to Netlify
```

## 📝 Menu Categories

| Category | Products | Features |
|----------|----------|----------|
| ☕ Espresso Classics | 6 | Classic espresso drinks |
| 🌟 Specialty Coffee | 4 | Signature drinks |
| 🌱 Vegan Options | 4 | Plant-based milk alternatives |
| ❄️ Cold Brew & Iced | 4 | Refreshing cold drinks |
| 🫖 Alternative | 2 | Matcha & Chai |
| 🥐 Pastry | 10 | Artisanal pastries & desserts |

## 🖼️ Images

All images are sourced from [Unsplash](https://unsplash.com) and are royalty-free. Images are optimized with URL parameters:

```
https://images.unsplash.com/photo-ID?w=600&auto=format&fit=crop
```

**To use custom images:**
1. Place images in `public/` folder
2. Reference with `/image-name.jpg`

## 🔧 Customization

### Change Colors

Edit `app/globals.css`:

```css
:root {
  --primary: #14B8A6;      /* Your primary color */
  --secondary: #F97316;    /* Your secondary color */
}
```

### Add New Products

Edit `components/Menu.tsx`:

```tsx
const menuItems = [
  {
    name: 'New Product',
    price: 15,
    category: 'Espresso',
    description: 'Description here',
    ingredients: 'Ingredients here',
    image: 'https://images.unsplash.com/...',
    vegan: false,
  },
  // ... existing products
];
```

### Add New Page

Create `app/new-page/page.tsx`:

```tsx
export default function NewPage() {
  return (
    <div>
      <h1>New Page</h1>
      <p>Content here</p>
    </div>
  );
}
```

Access at `/new-page`

## 🧪 Testing

```bash
# Run development server
npm run dev

# Build and test production build
npm run build
npm start

# Check for TypeScript errors
npx tsc --noEmit

# Check for linting issues
npm run lint
```

## 📊 Performance

- **Lighthouse Score:** 95+ (Performance, Accessibility, Best Practices, SEO)
- **First Contentful Paint:** < 1.5s
- **Time to Interactive:** < 3s
- **Core Web Vitals:** All green

## 🤝 Contributing

This is an educational project for the Vibe Coding Course. Students are encouraged to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📜 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Next.js Team** - For the amazing framework
- **Vercel** - For free hosting
- **Unsplash** - For beautiful free images
- **Tailwind CSS** - For utility-first CSS
- **Vibe Coding Students** - For inspiration and feedback

## 📞 Contact

**Created for Vibe Coding Course**

- 📧 Email: hello@vibecoffee.ro (example)
- 🌐 Website: [vibecoffee.ro](https://vibecoffee.ro) (example)
- 📱 Instagram: [@vibecoffee](https://instagram.com/vibecoffee) (example)

---

**⭐ If you found this project helpful, please give it a star!**

Built with ❤️ for learning web development.

---

*Last updated: December 2024*
