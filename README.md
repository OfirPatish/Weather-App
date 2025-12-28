# Weather App

A modern, production-ready weather application built with Next.js 15, React 19, and TypeScript. Features real-time weather data, smooth animations, and a polished user experience.

**🌐 Live Demo:** [View Live](https://opdev-weather.vercel.app)

## Tech Stack

- **Framework:** Next.js 15.5.9 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS 4, DaisyUI 5
- **Animations:** Motion (Framer Motion)
- **Testing:** Jest, React Testing Library
- **API:** OpenWeatherMap

## Key Features

- **Real-time Weather Data** - Current conditions, temperature, wind, humidity, pressure, and visibility
- **Advanced Animations** - 3D card effects, staggered entrances, animated number counting using Motion
- **Defensive Programming** - Comprehensive input validation, API response validation, and error handling
- **Type Safety** - Full TypeScript coverage with runtime validation
- **Responsive Design** - Mobile-first approach with adaptive layouts
- **Dark/Light Theme** - System preference detection with manual toggle
- **Accessibility** - ARIA labels, keyboard navigation, semantic HTML
- **Test Coverage** - Unit tests for utilities, hooks, and components

## Quick Start

```bash
npm install
# Create .env.local with OPENWEATHERMAP_API_KEY
npm run dev
```

## Project Highlights

- **API Route Protection** - Server-side validation, timeout handling, and sanitization
- **Error Handling** - User-friendly inline notifications with auto-dismiss
- **Performance** - Optimized images, lazy loading, and efficient state management
- **Code Quality** - ESLint, TypeScript strict mode, comprehensive test suite

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Production build
- `npm run test` - Run test suite
- `npm run lint` - Lint code

## Environment Variables

```env
OPENWEATHERMAP_API_KEY=your_api_key_here
```
