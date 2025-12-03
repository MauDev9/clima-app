# 🌤️ Weather App

A modern, beautiful and responsive weather application built with React and Vite. Get real-time weather information for any city in the world.

![Weather App](https://img.shields.io/badge/React-19.1.1-blue)
![Vite](https://img.shields.io/badge/Vite-7.1.7-purple)
![License](https://img.shields.io/badge/license-MIT-green)

## ✨ Features

- 🌍 **Real-time weather data** from OpenWeatherMap API
- 🎨 **Modern glassmorphism UI** with smooth animations
- 🌞🌙 **Day/Night indicator** based on local time
- 🕐 **Local time display** for searched cities
- 🏳️ **Country flags** with emoji support
- 📱 **Fully responsive** design for all devices
- ⚡ **Fast and optimized** with React hooks and memoization
- 🎭 **Dynamic weather icons** based on conditions
- 🔄 **Loading states** and error handling
- 🌈 **Animated gradients** and floating effects

## 🚀 Quick Start

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- OpenWeatherMap API key ([Get it free here](https://openweathermap.org/api))

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/MauDev9/clima-app.git
cd clima-app
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory:
```env
VITE_APP_ID=your_openweathermap_api_key_here
```

4. **Run the development server**
```bash
npm run dev
```

5. **Open your browser** at `http://localhost:5173`

## 📦 Build for Production

```bash
npm run build
```

The optimized files will be in the `dist/` directory.

## 🛠️ Tech Stack

- **React 19.1.1** - UI library
- **Vite 7.1.7** - Build tool and dev server
- **OpenWeatherMap API** - Weather data
- **CSS3** - Modern animations and glassmorphism

## 📁 Project Structure

```
clima-app/
├── src/
│   ├── assets/          # Weather icons
│   ├── components/      # React components
│   │   ├── Weather.jsx
│   │   ├── Weather.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── utils/           # Utility functions
│   │   └── weatherHelpers.js
│   ├── App.jsx          # Main app component
│   ├── index.css        # Global styles
│   └── main.jsx         # Entry point
├── public/              # Static assets
├── .env                 # Environment variables (create this)
├── .gitignore
├── package.json
└── vite.config.js
```

## 🎯 Performance Optimizations

- ✅ **React.memo** for component memoization
- ✅ **useCallback** for function memoization
- ✅ **useMemo** for expensive computations
- ✅ **Code splitting** with utility functions
- ✅ **Optimized re-renders** with proper dependencies
- ✅ **Lazy loading** of assets

## 🌐 API Integration

Uses [OpenWeatherMap Current Weather API](https://openweathermap.org/current)

**Endpoints used:**
- Current weather data by city name
- Metric units (Celsius)
- Icon codes for weather conditions

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

## 👨‍💻 Developer

Developed by **[maudev.co](https://maudev.co)**

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons and design inspired by modern weather applications
- Built with ❤️ using React and Vite