import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Palette,
  SearchCode,
  BarChart3,
  Wand2,
  FolderKanban,
  UploadCloud,
  MousePointerSquareDashed,
  FileOutput,
  CheckCircle2,
  Lightbulb
} from 'lucide-react';

const featureIconProps = { size: 28, className: "mb-4 text-blue-600 dark:text-blue-400" };
const valueIconProps = { size: 20, className: "mr-2 text-green-500" };

export function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-50">
      {/* Hero Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Revolutionize Your Ad Creatives with AI
          </h1>
          <p className="mt-6 mx-auto max-w-2xl text-lg md:text-xl text-gray-600 dark:text-gray-300">
            Effortlessly generate high-performing, on-brand ad creatives. Leverage AI insights, competitor benchmarks, and seamless asset management to maximize your campaign impact.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600">
              Get Started Free
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto text-lg px-8 py-6 border-blue-600 text-blue-600 hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-gray-800">
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Unique Value Proposition Section */}
      <section id="why-us" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">The Smarter Way to Create Ads</h2>
            <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-300">
              Stop wrestling with generic tools. AdCreativeAI is built for results.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="shadow-lg dark:bg-gray-800/50">
              <CardHeader>
                <Lightbulb {...featureIconProps} />
                <CardTitle className="text-xl font-semibold">AI Tailored to Your Brand</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  OpenAI-powered image generation fine-tuned with your unique brand assets, ensuring every creative feels authentic.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg dark:bg-gray-800/50">
              <CardHeader>
                <BarChart3 {...featureIconProps} />
                <CardTitle className="text-xl font-semibold">Competitor-Informed Creatives</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  On-demand competitor ad benchmarks to inspire and guide your creative decisions, giving you a strategic edge.
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-lg dark:bg-gray-800/50">
              <CardHeader>
                <FolderKanban {...featureIconProps} />
                <CardTitle className="text-xl font-semibold">Streamlined Workflow</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-400">
                  Full asset management and lightweight editing, all in one platform. From idea to export in minutes, not hours.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 bg-gray-100 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Create Stunning Ads in 3 Simple Steps</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <UploadCloud size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">1. Define Your Brand</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Easily upload logos, colors, fonts, and website content. Our AI learns your visual identity.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <MousePointerSquareDashed size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">2. Prompt & Generate</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Use our intuitive chat-style interface. AI generates multiple options in seconds.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="bg-blue-100 dark:bg-blue-900/50 p-4 rounded-full mb-4">
                <FileOutput size={32} className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2">3. Refine & Export</h3>
              <p className="text-gray-600 dark:text-gray-400">
                Review AI creatives, make quick edits, and export high-resolution assets.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Features Section */}
      <section id="features" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">Everything You Need, All In One Place</h2>
            <p className="mt-4 max-w-xl mx-auto text-gray-600 dark:text-gray-300">
              Powerful features designed to streamline your creative workflow and boost ad performance.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[ 
              { title: "Brand Asset Ingestion", description: "Centralize your brand identity. Upload logos, define color palettes, and specify fonts to ensure every AI-generated creative is perfectly on-brand.", icon: Palette },
              { title: "Automated Brand Discovery", description: "Let our AI crawl your website to automatically pull product details, key messaging, and brand copy, enriching its understanding of your business.", icon: SearchCode },
              { title: "Competitor Ad Insights", description: "Stay ahead of the curve. Fetch competitor ad examples and performance metrics for inspiration and strategic advantage.", icon: BarChart3 },
              { title: "Natural Language Ad Creation", description: "No complex design tools. Simply chat with our AI on a blank canvas, describe your ad, and watch previews generate dynamically.", icon: Wand2 },
              { title: "Integrated Asset Management", description: "Organize your creatives effortlessly with versioning, folders, and tagging. Export final assets in PNG format, ready for launch.", icon: FolderKanban },
              { title: "Built for Modern Teams", description: "Empowering in-house marketers, agile agencies, and startup founders to overcome inconsistent branding and lengthy design cycles.", icon: CheckCircle2 }
            ].map(feature => (
              <Card key={feature.title} className="shadow-lg dark:bg-gray-800/50">
                <CardHeader className="items-center text-center sm:items-start sm:text-left">
                  <feature.icon {...featureIconProps} />
                  <CardTitle className="text-xl font-semibold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400 text-center sm:text-left">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-10 border-t border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            &copy; {new Date().getFullYear()} AdCreativeAI. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}