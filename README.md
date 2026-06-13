# ☁️ Cleanify

> Premium wallpapers, widgets, Rainmeter skins, and customization apps. Git-powered. No CMS. No database.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/cleanify)

---

## ✨ What is Cleanify?

Cleanify is a **Git-powered content platform** for desktop and mobile customization. All content lives in the repository — no admin panel, no database, no CMS. Push files to GitHub, Vercel rebuilds automatically.

---

## 🗂 Content Structure

```
content/
├── mobile/
│   ├── wallpapers/     ← Drop .jpg/.png/.webp files here
│   ├── widgets/        ← iOS widget setup screenshots
│   └── apps/           ← JSON files describing iOS apps
└── pc/
    ├── wallpapers/     ← Desktop wallpaper images
    ├── rainmeter/      ← Rainmeter skin screenshots
    └── apps/           ← JSON files describing PC apps
```

---

## ➕ Adding Content

### Add a Wallpaper
Just drop an image file:
```
content/mobile/wallpapers/my-wallpaper.jpg
content/pc/wallpapers/my-desktop.png
```

### Add Optional Metadata
Create a `.json` with the same base name:
```json
{
  "title": "Midnight Aurora",
  "tags": ["dark", "abstract", "minimal"],
  "colors": ["dark", "gradient"],
  "featured": true
}
```

### Add an App
Create a `.json` file in the apps folder:
```json
{
  "name": "WidgetKit Studio",
  "slug": "widgetkit",
  "description": "Create custom widgets for iPhone.",
  "website": "https://widgetkitapp.com",
  "category": "Widgets",
  "thumbnail": "",
  "tags": ["widgets", "ios"],
  "featured": true,
  "free": false,
  "price": "$4.99"
}
```

---

## 🔌 Plugin System

Plugins live in `/plugins` and are enabled in `/config/plugins.json`:

```json
{ "enabled": ["clock", "weather", "quote"] }
```

### Create a Plugin
```
plugins/
└── my-plugin/
    ├── manifest.json
    └── component.tsx
```

**manifest.json:**
```json
{
  "id": "my-plugin",
  "name": "My Plugin",
  "description": "Does something cool.",
  "version": "1.0.0",
  "author": "You"
}
```

---

## 🚀 Deployment

### One-click (recommended)
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-repo/cleanify)

### Manual
```bash
# 1. Clone
git clone https://github.com/your-repo/cleanify
cd cleanify

# 2. Install
npm install

# 3. Configure
cp .env.example .env.local
# Edit .env.local with your values

# 4. Dev server
npm run dev

# 5. Build
npm run build
```

### Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_SITE_URL` | Yes | Your production URL |
| `NEXT_PUBLIC_WEATHER_API_KEY` | No | OpenWeatherMap key for weather plugin |
| `GITHUB_TOKEN` | No | GitHub API token for increased rate limits |

---

## 🏗 Tech Stack

| Tool | Purpose |
|------|---------|
| **Next.js 15** | React framework, static generation |
| **TypeScript** | Type safety |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **next-themes** | Dark/light mode |
| **GitHub** | Content management |
| **Vercel** | Hosting & CI/CD |

---

## 📁 Project Structure

```
cleanify/
├── app/                    # Next.js App Router pages
│   ├── mobile/             # Mobile section pages
│   ├── pc/                 # PC section pages
│   ├── apps/               # Apps directory
│   ├── browse/             # Browse all content
│   ├── search/             # Search page
│   ├── api/search/         # Search API endpoint
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # robots.txt
├── components/
│   ├── layout/             # Header, Footer
│   ├── sections/           # Page sections, Hero
│   ├── wallpapers/         # Wallpaper cards & pages
│   ├── widgets/            # Widget cards & pages
│   ├── rainmeter/          # Rainmeter cards & pages
│   ├── apps/               # App cards & pages
│   ├── search/             # Search components
│   ├── theme/              # Dark/light mode
│   └── ui/                 # Shared UI (MasonryGrid, FilterBar)
├── content/                # 🗂 ALL CONTENT LIVES HERE
│   ├── mobile/
│   └── pc/
├── plugins/                # Widget plugins
├── config/                 # Site & plugin config
├── lib/                    # Content loaders, utilities
├── types/                  # TypeScript types
└── public/                 # Static assets
```

---

## 🤝 Contributing

1. Fork the repo
2. Add your content to the appropriate `content/` folder
3. Commit and open a Pull Request
4. Once merged, it goes live automatically!

See [CONTRIBUTING.md](./CONTRIBUTING.md) for full guidelines.

---

## 📄 License

MIT License — free to use, fork, and deploy your own instance.
