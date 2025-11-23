# Weather App

A modern, responsive weather application providing real-time data with a clean, polished UI. Built with Next.js, TypeScript, Tailwind CSS, and DaisyUI.

**🌐 Live Site:** [https://opdev-weather.vercel.app](https://opdev-weather.vercel.app)

## 🚀 Tech Stack

**Frontend:** Next.js 16, React 19, TypeScript  
**Styling:** Tailwind CSS 4, DaisyUI 5  
**Animations:** Motion  
**APIs:** OpenWeatherMap

## ✨ Key Features

- **City Search:** Instant weather by city name
- **Live Data:** Temperature, wind speed, and humidity
- **Theme-aware UI:** Light/Dark toggle with persistence
- **Responsive Design:** Mobile-first layout that scales beautifully
- **Smooth Animations:** Subtle motion for state changes

## 🏃 Quick Start

### Prerequisites
- Node.js 18+
- OpenWeatherMap API key

### Setup
```bash
npm install
cp .env.local.example .env.local
# Set OPENWEATHERMAP_API_KEY in .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

**Required Environment Variables:**
- `OPENWEATHERMAP_API_KEY` - API key from [OpenWeatherMap](https://openweathermap.org/api)

## 📁 Project Structure

```
weather-app/
├── src/
│   ├── app/          # Next.js app router pages
│   ├── components/   # UI components
│   ├── hooks/        # Custom React hooks
│   ├── types/        # TypeScript type definitions
│   └── utils/        # Utility functions
└── public/           # Static assets
```

## 🔒 API Integration

- OpenWeatherMap API integration
- Environment variable protection for API keys
- Error handling for API failures
