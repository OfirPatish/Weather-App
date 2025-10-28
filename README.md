# Weather App

A modern, responsive weather application built with Next.js, DaisyUI, and the OpenWeatherMap API.

## Features

- Search weather by city name
- Real-time temperature, wind speed, and humidity data
- Light/Dark theme toggle
- Fully responsive design

## Tech Stack

- **Next.js 16** with React 19 and TypeScript
- **TailwindCSS 4** + **DaisyUI 5** for styling
- **OpenWeatherMap API** for weather data
- **Motion** for animations

## Quick Start

1. Clone and install dependencies:

```bash
git clone https://github.com/yourusername/weather-app.git
cd weather-app
npm install
```

2. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Add your OpenWeatherMap API key to `.env.local`:

```env
OPENWEATHERMAP_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## Deployment

### Render

- **Build Command:** `npm install && npm run build`
- **Start Command:** `npm start`
- Add `OPENWEATHERMAP_API_KEY` environment variable

### Vercel

Deploy directly from your GitHub repository or use:

```bash
npm i -g vercel
vercel
```

---

Get your free API key at [OpenWeatherMap](https://openweathermap.org/api)
