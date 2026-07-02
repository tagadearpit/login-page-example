# AICM Landing Page

A modern, premium landing page for **aicm** — a decentralized AI-powered marketplace. Built with React 19, Three.js, and Tailwind CSS.

## Overview

This project replicates a sophisticated tech-minimalist design featuring:

- **Asymmetric Layout**: Hero text on the left, immersive 3D visuals on the right
- **3D Animation**: Physics-based rolling coin animation through carved 3D blocks
- **Neon Lighting**: Purple and magenta neon accents with dynamic lighting effects
- **Particle Effects**: Floating bokeh particles for atmospheric depth
- **Premium Typography**: Sora for headlines, Inter for body text
- **Responsive Design**: Fully responsive across all screen sizes

## Tech Stack

- **React 19**: Modern UI framework with hooks
- **Three.js**: 3D graphics and animations
- **Tailwind CSS 4**: Utility-first styling with OKLCH color support
- **TypeScript**: Type-safe development
- **Vite**: Fast build tooling and dev server

## Project Structure

```
aicm-landing-page/
├── client/
│   ├── public/              # Static assets (favicon, robots.txt, etc.)
│   ├── src/
│   │   ├── components/
│   │   │   ├── ThreeDScene.tsx    # 3D animation component
│   │   │   └── ui/                # shadcn/ui components
│   │   ├── pages/
│   │   │   ├── Home.tsx           # Main landing page
│   │   │   └── NotFound.tsx       # 404 page
│   │   ├── App.tsx                # Root component with routing
│   │   ├── main.tsx               # React entry point
│   │   └── index.css              # Global styles and design tokens
│   └── index.html           # HTML template
├── server/                  # Express server (static deployment)
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── vite.config.ts           # Vite configuration
└── ideas.md                 # Design documentation
```

## Installation & Development

### Prerequisites

- Node.js 18+ (or pnpm 10+)
- npm or pnpm package manager

### Setup

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm dev
   ```

   The site will be available at `http://localhost:3000`

3. **Build for production:**
   ```bash
   pnpm build
   ```

4. **Preview production build:**
   ```bash
   pnpm preview
   ```

## Design System

### Color Palette

- **Background**: Off-white/light grey (`oklch(0.97 0.001 286)`)
- **Primary**: Purple neon (`oklch(0.55 0.25 280)`)
- **Secondary**: Magenta neon (`oklch(0.60 0.28 290)`)
- **Accent**: Gold (`oklch(1 0.3 70)`)
- **Foreground**: Dark charcoal (`oklch(0.15 0.02 65)`)

### Typography

- **Headings**: Sora (700 weight) — Bold, modern, geometric
- **Body**: Inter (400-600 weight) — Clean, readable, professional

### Spacing & Radius

- **Base radius**: 0.5rem
- **Container padding**: Responsive (1rem mobile, 1.5rem tablet, 2rem desktop)

## Key Features

### 1. Navigation Bar
- Fixed, transparent header with backdrop blur
- Logo with purple geometric icon
- Navigation links: "Create a store", "Advertise", "Affiliate program", "About"
- "Get started" CTA button

### 2. Hero Section
- **Left side**: Large, bold headline with supporting text and CTA button
- **Right side**: Full-height 3D animated scene

### 3. 3D Animation (ThreeDScene Component)
- **Coin animation**: Physics-based path following through 3D blocks
- **Neon lighting**: Purple and magenta point lights with pulsing intensity
- **Particle system**: 150 floating bokeh particles with organic motion
- **Camera drift**: Subtle, imperceptible camera movement for cinematic feel
- **Block rotation**: Subtle rotation on all 3D blocks
- **Lighting effects**: Dynamic shadows and reflections

## Component Details

### ThreeDScene.tsx

The 3D scene is rendered using Three.js with the following elements:

- **3D Blocks**: Three white boxes with subtle rotation
- **Neon Lines**: Purple and magenta glowing lines on block surfaces
- **Gold Coin**: Metallic coin with high reflectivity, rolling through a curved path
- **Particle System**: 150 points with floating animation
- **Lighting**: Ambient, directional, and two point lights (purple and magenta)

**Animation Loop:**
- Coin follows a Catmull-Rom curve for smooth, physics-based motion
- Camera drifts subtly in x/y axes
- Particles float upward with sine-wave modulation
- Neon lines pulse with opacity changes
- Lights pulse in intensity

### Home.tsx

The main landing page component featuring:

- Fixed navigation bar with logo and links
- Hero section with asymmetric layout
- Integration of ThreeDScene component
- Responsive design with Tailwind utilities

## Customization

### Modifying Colors

Edit the CSS variables in `client/src/index.css`:

```css
:root {
  --primary: oklch(0.55 0.25 280);  /* Purple neon */
  --secondary: oklch(0.55 0.25 280); /* Magenta neon */
  --accent: oklch(1 0.3 70);        /* Gold */
  --background: oklch(0.97 0.001 286); /* Off-white */
  --foreground: oklch(0.15 0.02 65);   /* Dark text */
}
```

### Adjusting 3D Animation

In `client/src/components/ThreeDScene.tsx`:

- **Coin speed**: Modify `time += 0.008` (higher = faster)
- **Particle count**: Change `const particleCount = 150`
- **Light intensity**: Adjust `purpleLight.intensity` and `magentaLight.intensity`
- **Camera drift**: Modify `camera.position.x = Math.sin(time * 0.08) * 0.8`

### Updating Typography

Google Fonts are loaded in `client/index.html`. To change fonts:

1. Update the Google Fonts link
2. Modify font-family in `client/src/index.css`

## Performance Considerations

- **Three.js rendering**: GPU-accelerated, runs at 60fps on modern browsers
- **Particle system**: Uses Points geometry for efficient rendering
- **Responsive canvas**: Automatically scales to container size
- **Memory cleanup**: Proper disposal of Three.js objects on unmount

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Deployment

The project is configured for static deployment. Build and deploy the `dist/` folder to any static hosting service:

- **Vercel**: `vercel deploy`
- **Netlify**: `netlify deploy`
- **GitHub Pages**: Configure in repository settings
- **Manus**: Built-in deployment with custom domain support

## Development Guidelines

### Code Style

- Use TypeScript for type safety
- Follow React best practices (hooks, functional components)
- Leverage Tailwind utilities for styling
- Keep components modular and reusable

### Adding New Sections

1. Create a new component in `client/src/components/`
2. Import and use in `client/src/pages/Home.tsx`
3. Apply design tokens from `index.css` for consistency

### Modifying 3D Scene

The ThreeDScene component is self-contained. To modify:

1. Edit geometry creation (blocks, coin, particles)
2. Adjust lighting setup
3. Modify animation loop logic
4. Test responsiveness across devices

## Troubleshooting

### 3D scene not rendering
- Check browser console for WebGL errors
- Ensure Three.js is properly installed: `pnpm add three`
- Verify GPU acceleration is enabled in browser

### Performance issues
- Reduce particle count in ThreeDScene.tsx
- Lower shadow map resolution
- Disable fog effects if needed

### Styling issues
- Clear browser cache (Ctrl+Shift+Delete)
- Verify Tailwind CSS is compiled
- Check that CSS variables are defined in `:root`

## License

MIT

## Contact

For questions or support, contact the development team.
