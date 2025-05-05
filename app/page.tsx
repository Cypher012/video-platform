import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { LoginModal } from '@/components/auth/login-modal';
import { SignupModal } from '@/components/auth/signup/signup-modal';
import { Heart, Users, Flame, Star, ChevronRight } from 'lucide-react';
import { ModelCard } from '@/components/model-card';
import { ModelCarousel } from '@/components/model-carousel';
import { FeaturedModel } from '@/components/featured-model';
import { TestimonialCarousel } from '@/components/testimonial-carousel';
import { AuthComponent } from '@/components/auth/auth-component';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      {/* Gradient overlay for the entire page */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-black to-rose-950 opacity-80 z-[-1]"></div>

      {/* Animated background elements */}
      <div className="fixed inset-0 z-[-1]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose-500 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
        <div className="absolute top-1/2 right-1/4 w-80 h-80 bg-rose-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-15 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-rose-700 rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      <header className="sticky top-0 z-50 w-full border-b border-rose-900/30 bg-black/80 backdrop-blur supports-[backdrop-filter]:bg-black/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Flame className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold text-white">HotConnect</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#featured"
              className="text-sm font-medium text-rose-100/70 hover:text-rose-500 transition-colors"
            >
              Featured
            </Link>
            <Link
              href="#models"
              className="text-sm font-medium text-rose-100/70 hover:text-rose-500 transition-colors"
            >
              Models
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-rose-100/70 hover:text-rose-500 transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium text-rose-100/70 hover:text-rose-500 transition-colors"
            >
              Pricing
            </Link>
          </nav>
          <AuthComponent />
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with Background Image */}
        <section className="relative min-h-[80vh] flex items-center overflow-hidden">
          {/* Hero background image */}
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/20 to-transparent z-10"></div>
            <img
              src="/bg-simonsayys-lg.webp"
              height={1080}
              width={1920}
              alt="Hot model background"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="container relative z-10">
            <div className="max-w-2xl">
              <div className="inline-block rounded-lg bg-rose-900/30 px-3 py-1 text-sm text-rose-400 mb-6 backdrop-blur-sm">
                Adults Only (18+)
              </div>
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-white">
                DISCOVER YOUR NEXT{' '}
                <span className="text-rose-500 glow-text">HOT CONNECTION</span>
              </h1>
              <p className="text-xl text-rose-100/80 max-w-xl mb-10">
                Connect with stunning models for private 1-on-1 video sessions.
                Experience intimate moments with the hottest performers online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                <Button
                  size="lg"
                  className="w-full bg-rose-600 hover:bg-rose-700 text-white border-rose-500/50 border shadow-glow-sm"
                >
                  Get Started
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full border-rose-500/50 text-rose-400 hover:bg-rose-950/50 hover:text-rose-300"
                >
                  Browse Models
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Models Carousel */}
        <section id="featured" className="py-16 bg-black/80 overflow-hidden">
          <div className="container">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white glow-text-sm">
                TRENDING NOW <span className="text-rose-500">🔥</span>
              </h2>
              <Link
                href="#models"
                className="flex items-center text-rose-500 hover:text-rose-400 transition-colors"
              >
                View All
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </div>

            <ModelCarousel />
          </div>
        </section>

        {/* Featured Model Spotlight */}
        <section className="py-16 bg-gradient-to-b from-black to-rose-950/30 overflow-hidden">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              MODEL OF THE MONTH
            </h2>

            <FeaturedModel />
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-16 bg-black">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              EXPLORE CATEGORIES
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                {
                  name: 'Newcomers',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Most Popular',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Couples',
                  image: '/placeholder.svg?height=400&width=300',
                },
                {
                  name: 'Special Shows',
                  image: '/placeholder.svg?height=400&width=300',
                },
              ].map((category, index) => (
                <div
                  key={index}
                  className="relative overflow-hidden rounded-lg aspect-square group cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent z-10"></div>
                  <img
                    src={category.image || '/placeholder.svg'}
                    alt={category.name}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                    <h3 className="text-xl font-bold text-white">
                      {category.name}
                    </h3>
                  </div>
                  <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity z-5"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* What Makes Us Unique */}
        <section id="features" className="py-16 bg-black/80">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              WHAT MAKES HOTCONNECT UNIQUE?
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="flex flex-col items-start p-6 bg-rose-950/30 rounded-lg border border-rose-900/30 backdrop-blur-sm hover:bg-rose-950/40 transition-colors">
                <Heart className="h-10 w-10 text-rose-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">
                  Private Sessions
                </h3>
                <p className="text-rose-100/70">
                  Enjoy completely private 1-on-1 video sessions with your
                  favorite performers. What happens in your session stays there.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-rose-950/30 rounded-lg border border-rose-900/30 backdrop-blur-sm hover:bg-rose-950/40 transition-colors">
                <Users className="h-10 w-10 text-rose-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">
                  Verified Models
                </h3>
                <p className="text-rose-100/70">
                  All our performers are verified adults who have been screened
                  to ensure authenticity and quality experiences.
                </p>
              </div>

              <div className="flex flex-col items-start p-6 bg-rose-950/30 rounded-lg border border-rose-900/30 backdrop-blur-sm hover:bg-rose-950/40 transition-colors">
                <Star className="h-10 w-10 text-rose-500 mb-4" />
                <h3 className="text-xl font-bold mb-2 text-white">
                  Custom Experiences
                </h3>
                <p className="text-rose-100/70">
                  Request personalized experiences tailored to your desires. Our
                  performers can fulfill your fantasies.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-gradient-to-b from-black to-rose-950/20">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              WHAT OUR MEMBERS SAY
            </h2>

            <TestimonialCarousel />
          </div>
        </section>

        {/* Featured Models Grid */}
        <section id="models" className="py-16 bg-black">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              OUR HOTTEST MODELS
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <ModelCard key={i} />
              ))}
            </div>

            <div className="flex justify-center mt-12">
              <Button className="bg-rose-600 hover:bg-rose-700 text-white px-8 shadow-glow-sm border border-rose-500/50">
                View All Models
              </Button>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="py-16 bg-gradient-to-b from-black to-rose-950/30"
        >
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-white glow-text-sm">
              HOW HOTCONNECT WORKS
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black/60 p-6 rounded-xl border border-rose-900/30 shadow-glow-sm flex flex-col items-center text-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-rose-900/30 rounded-full flex items-center justify-center mb-6 border border-rose-500/30">
                  <span className="text-2xl font-bold text-rose-500">1</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  CREATE AN ACCOUNT
                </h3>
                <p className="text-rose-100/70">
                  Sign up in seconds and verify your age to access all our
                  features. Browse models for free.
                </p>
              </div>

              <div className="bg-black/60 p-6 rounded-xl border border-rose-900/30 shadow-glow-sm flex flex-col items-center text-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-rose-900/30 rounded-full flex items-center justify-center mb-6 border border-rose-500/30">
                  <span className="text-2xl font-bold text-rose-500">2</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  CHOOSE A MODEL
                </h3>
                <p className="text-rose-100/70">
                  Find your perfect match from our diverse selection of verified
                  performers ready to connect.
                </p>
              </div>

              <div className="bg-black/60 p-6 rounded-xl border border-rose-900/30 shadow-glow-sm flex flex-col items-center text-center backdrop-blur-sm">
                <div className="w-20 h-20 bg-rose-900/30 rounded-full flex items-center justify-center mb-6 border border-rose-500/30">
                  <span className="text-2xl font-bold text-rose-500">3</span>
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">
                  ENJOY PRIVATE SHOWS
                </h3>
                <p className="text-rose-100/70">
                  Connect in high-definition video calls for intimate, private
                  experiences tailored to your desires.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-16 bg-black">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white glow-text-sm">
              MEMBERSHIP OPTIONS
            </h2>
            <p className="text-center text-rose-100/70 max-w-2xl mx-auto mb-12">
              Choose the plan that fits your desires. All plans include access
              to our model directory and basic features.
            </p>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black/60 p-6 rounded-xl border border-rose-900/30 flex flex-col backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">Basic</h3>
                <div className="text-3xl font-bold text-white mb-4">FREE</div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> Browse model
                    profiles
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> Public chat
                    access
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> Limited
                    messaging
                  </li>
                </ul>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white">
                  Get Started
                </Button>
              </div>

              <div className="bg-rose-950/30 p-6 rounded-xl border border-rose-500/50 flex flex-col backdrop-blur-sm shadow-glow-sm relative">
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-rose-600 text-white text-xs font-bold py-1 px-3 rounded-full">
                  MOST POPULAR
                </div>
                <h3 className="text-xl font-bold mb-2 text-white">Premium</h3>
                <div className="text-3xl font-bold text-white mb-4">
                  $29.99<span className="text-lg font-normal">/mo</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center text-rose-100/80">
                    <span className="text-rose-500 mr-2">✓</span> All Basic
                    features
                  </li>
                  <li className="flex items-center text-rose-100/80">
                    <span className="text-rose-500 mr-2">✓</span> Unlimited
                    private messaging
                  </li>
                  <li className="flex items-center text-rose-100/80">
                    <span className="text-rose-500 mr-2">✓</span> HD video
                    quality
                  </li>
                  <li className="flex items-center text-rose-100/80">
                    <span className="text-rose-500 mr-2">✓</span> 20% discount
                    on private shows
                  </li>
                </ul>
                <Button className="w-full bg-rose-600 hover:bg-rose-700 text-white shadow-glow-sm">
                  Join Now
                </Button>
              </div>

              <div className="bg-black/60 p-6 rounded-xl border border-rose-900/30 flex flex-col backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-2 text-white">VIP</h3>
                <div className="text-3xl font-bold text-white mb-4">
                  $49.99<span className="text-lg font-normal">/mo</span>
                </div>
                <ul className="space-y-2 mb-6 flex-1">
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> All Premium
                    features
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> Priority
                    support
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> 4K video
                    quality
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> 30% discount
                    on private shows
                  </li>
                  <li className="flex items-center text-rose-100/70">
                    <span className="text-rose-500 mr-2">✓</span> Exclusive VIP
                    shows
                  </li>
                </ul>
                <Button className="w-full bg-black hover:bg-rose-950/50 text-rose-400 hover:text-rose-300 border border-rose-500/50">
                  Upgrade to VIP
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-t from-black to-rose-950/30 relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute bottom-0 left-1/3 w-96 h-96 bg-rose-600 rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-pulse"></div>
          </div>
          <div className="container text-center relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white glow-text-sm">
              JOIN THE HOTTEST COMMUNITY
            </h2>
            <p className="text-rose-500 text-2xl font-bold italic mb-12 glow-text-xs">
              THOUSANDS OF MODELS WAITING FOR YOU
            </p>

            <div className="flex justify-center">
              <Button
                size="lg"
                className="bg-rose-600 hover:bg-rose-700 text-white px-8 shadow-glow-sm border border-rose-500/50"
              >
                Create Your Profile
              </Button>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-rose-900/30 py-6 md:py-8 bg-black">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flame className="h-5 w-5 text-rose-500" />
            <span className="font-bold text-white">HotConnect</span>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <Link
              href="#"
              className="text-rose-100/50 hover:text-rose-500 transition-colors"
            >
              Home
            </Link>
            <Link
              href="#"
              className="text-rose-100/50 hover:text-rose-500 transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-rose-100/50 hover:text-rose-500 transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-rose-100/50 hover:text-rose-500 transition-colors"
            >
              Support
            </Link>
            <Link
              href="#"
              className="text-rose-100/50 hover:text-rose-500 transition-colors"
            >
              Contact Us
            </Link>
          </div>

          <div className="text-sm text-rose-100/50">
            © {new Date().getFullYear()} HotConnect | Adults Only (18+)
          </div>
        </div>
      </footer>
    </div>
  );
}
