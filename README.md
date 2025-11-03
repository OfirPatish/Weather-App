## Weather App

A modern, responsive weather application providing real-time data with a clean, polished UI. Built with Next.js, TypeScript, Tailwind CSS, and DaisyUI.

## 🌐 Live Site

Visit the app → https://opdev-weather.vercel.app

## 👇 About

Quickly search any city and view current weather conditions with smooth motion and a theme-aware design. The app is optimized for speed, accessibility, and a consistent experience across devices.

## ✨ Key Features

- **City search**: Instant weather by city name
- **Live data**: Temperature, wind speed, and humidity
- **Theme-aware UI**: Light/Dark toggle with persistence
- **Responsive**: Mobile-first layout that scales beautifully
- **Smooth animations**: Subtle motion for state changes

## 🛠️ Tech Stack

- **Frontend**: Next.js 16 (React 19), TypeScript
- **Styling**: Tailwind CSS 4, DaisyUI 5
- **Animations**: Motion
- **APIs**: OpenWeatherMap

## 🚀 Getting Started

1. Clone and install:

```bash
git clone https://github.com/OfirPatish/Weather-App.git
cd weather-app
npm install
```

2. Configure environment:

```bash
cp .env.local.example .env.local
```

Set your OpenWeatherMap API key in `.env.local`:

```env
OPENWEATHERMAP_API_KEY=your_api_key_here
```

3. Run locally:

```bash
npm run dev
```

Open http://localhost:3000

## 📦 Scripts

- `npm run dev`: Start the development server
- `npm run build`: Create a production build
- `npm run start`: Run the production server
- `npm run lint`: Lint the codebase

## 🌩️ Environment Variables

- `OPENWEATHERMAP_API_KEY` (required): API key from OpenWeatherMap

Get a free key at https://openweathermap.org/api

## ☁️ Deployment

Deploy with Vercel from your repository:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/OfirPatish/Weather-App.git)

Or via CLI:

```bash
npm i -g vercel
vercel
```

Remember to add `OPENWEATHERMAP_API_KEY` in your Vercel Project Environment Variables.

## 📄 License

MIT — see `LICENSE` for details.

---

Built with ❤️ using Next.js
