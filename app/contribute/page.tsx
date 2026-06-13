import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contribute',
  description: 'Learn how to add wallpapers, widgets, and apps to Cleanify via GitHub.',
}

const steps = [
  {
    step: '01',
    title: 'Fork the repository',
    description: 'Start by forking the Cleanify GitHub repository to your own account.',
    code: 'https://github.com/your-repo/cleanify',
  },
  {
    step: '02',
    title: 'Add your content',
    description: 'Drop image files into the appropriate content folder.',
    code: `# Wallpapers
content/mobile/wallpapers/your-wallpaper.jpg
content/pc/wallpapers/your-wallpaper.jpg

# Widgets  
content/mobile/widgets/your-widget.png

# Rainmeter
content/pc/rainmeter/your-skin.jpg`,
  },
  {
    step: '03',
    title: 'Add metadata (optional)',
    description: 'Create a JSON file with the same name to add title, tags, and colors.',
    code: `// content/mobile/wallpapers/your-wallpaper.json
{
  "title": "Midnight Mountains",
  "tags": ["nature", "dark", "minimal"],
  "colors": ["dark", "minimal"],
  "featured": false
}`,
  },
  {
    step: '04',
    title: 'Open a Pull Request',
    description: 'Submit your PR and once merged, your content is live instantly on the next build.',
    code: 'git add . && git commit -m "Add: Midnight Mountains wallpaper" && git push',
  },
]

export default function ContributePage() {
  return (
    <div className="pt-28 pb-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <span className="text-4xl mb-4 block">☁️</span>
          <h1 className="text-4xl font-bold tracking-tight mb-3" style={{ color: 'var(--foreground)' }}>
            Contribute
          </h1>
          <p className="text-lg" style={{ color: 'var(--muted)' }}>
            Cleanify is entirely Git-powered. No admin panel, no CMS, no database.
            Just drop files and push.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-6">
          {steps.map((step, i) => (
            <div
              key={step.step}
              className="rounded-2xl p-6"
              style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <div className="flex items-start gap-4">
                <span className="text-xs font-mono font-bold px-2 py-1 rounded-lg shrink-0"
                  style={{ background: 'var(--surface-2)', color: 'var(--muted)' }}>
                  {step.step}
                </span>
                <div className="flex-1">
                  <h2 className="font-semibold text-lg mb-1.5" style={{ color: 'var(--foreground)' }}>
                    {step.title}
                  </h2>
                  <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
                    {step.description}
                  </p>
                  <pre className="text-xs p-4 rounded-xl overflow-x-auto leading-relaxed"
                    style={{ background: 'var(--surface-2)', color: 'var(--foreground)', fontFamily: 'ui-monospace, monospace' }}>
                    <code>{step.code}</code>
                  </pre>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Adding apps */}
        <div className="mt-8 rounded-2xl p-6" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
          <h2 className="font-semibold text-lg mb-3" style={{ color: 'var(--foreground)' }}>
            Adding Apps
          </h2>
          <p className="text-sm mb-4" style={{ color: 'var(--muted)' }}>
            Apps are managed via JSON files in the apps folders:
          </p>
          <pre className="text-xs p-4 rounded-xl overflow-x-auto leading-relaxed"
            style={{ background: 'var(--surface-2)', color: 'var(--foreground)', fontFamily: 'ui-monospace, monospace' }}>
            {`// content/mobile/apps/my-app.json
{
  "name": "My App",
  "description": "A great customization app for iOS.",
  "website": "https://myapp.com",
  "category": "Widgets",
  "thumbnail": "/content/mobile/apps/my-app-thumb.png",
  "tags": ["widgets", "ios"],
  "featured": true,
  "free": false,
  "price": "$2.99"
}`}
          </pre>
        </div>

        {/* Guidelines */}
        <div className="mt-8 rounded-2xl p-6" style={{ background: 'rgba(0,113,227,0.06)', border: '1px solid rgba(0,113,227,0.2)' }}>
          <h2 className="font-semibold mb-3" style={{ color: 'var(--foreground)' }}>
            Content guidelines
          </h2>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--muted)' }}>
            <li>✅ High quality images (min 1080px wide)</li>
            <li>✅ Original work or content you have rights to share</li>
            <li>✅ Appropriate for all audiences</li>
            <li>❌ No copyrighted material without permission</li>
            <li>❌ No NSFW or offensive content</li>
            <li>❌ No promotional spam</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
