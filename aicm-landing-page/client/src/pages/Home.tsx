import React from 'react';
import { Button } from '@/components/ui/button';
import ThreeDScene from '@/components/ThreeDScene';

/**
 * Design Philosophy: Tech-Minimalist / Neo-Futurist
 * - Asymmetric layout: text on left, 3D visuals on right
 * - Premium motion graphics as the hero
 * - Purple/magenta neon accents with gold highlights
 * - Clean, minimalist aesthetic with sophisticated typography
 */

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* Navigation Bar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm">
        <div className="container flex items-center justify-between py-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-magenta-600 rounded-lg transform rotate-45" />
            <span className="text-xl font-bold font-sora">aicm</span>
          </div>

          {/* Center Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Create a store
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Advertise
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              Affiliate program
            </a>
            <a href="#" className="text-sm font-medium hover:text-primary transition-colors">
              About
            </a>
          </div>

          {/* CTA Button */}
          <Button
            variant="outline"
            className="border-foreground/30 hover:border-primary hover:text-primary transition-all"
          >
            Get started
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative w-full h-screen flex items-center">
        {/* Left: Hero Text */}
        <div className="absolute left-0 top-0 bottom-0 w-full md:w-2/5 flex flex-col justify-center px-6 md:px-12 lg:px-16 z-10">
          <div className="max-w-lg">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold font-sora leading-tight mb-6">
              The Smarter, AI Powered Decentralized Marketplace.
            </h1>
            <p className="text-lg md:text-xl text-foreground/70 font-light mb-8 leading-relaxed">
              Experience the future of commerce with intelligent, decentralized trading powered by cutting-edge AI technology.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-base"
            >
              Get started
            </Button>
          </div>
        </div>

        {/* Right: 3D Scene */}
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-3/5 bg-gradient-to-l from-background via-background/50 to-transparent">
          <ThreeDScene />
        </div>
      </div>
    </div>
  );
}
