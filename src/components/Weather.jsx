import React, { useEffect, useState, useCallback, useMemo } from "react";
import './Weather.css';
import { 
    getCountryFlag, 
    processWeatherData, 
    ERROR_MESSAGES 
} from '../utils/weatherHelpers';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import humidityIcon from '../assets/humidity.png';
import windIcon from '../assets/wind.png';

function Weather() {
    // 📦 Estados
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        city: "",
        country: "",
        humidity: 0,
        windSpeed: 0,
        icon: clearIcon,
        isDay: true,
        localTime: ""
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [inputValue, setInputValue] = useState("");

    // 🌐 API Key (memoizada)
    const apiKey = useMemo(() => {
        const key = import.meta.env.VITE_APP_ID;
        console.log('=== DEBUG INFO ===');
        console.log('API Key exists:', !!key);
        console.log('API Key (first 5 chars):', key ? key.substring(0, 5) + '...' : 'UNDEFINED');
        console.log('All VITE_ variables:', Object.keys(import.meta.env).filter(k => k.startsWith('VITE_')));
        console.log('==================');
        return key;
    }, []);

    // 🔍 Función principal de búsqueda (memoizada con useCallback)
    const searchCity = useCallback(async (city) => {
        if (!city?.trim()) {
            setError("Please enter a city name");
            return;
        }
        
        setLoading(true);
        setError(null);
        
        try {
            if (!apiKey) {
                throw new Error("API key not configured. Add VITE_APP_ID in .env file");
            }
            
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            
            if (!response.ok) {
                throw new Error(ERROR_MESSAGES[response.status] || "Error fetching weather data");
            }
            
            const data = await response.json();
            setWeatherData(processWeatherData(data));
            
        } catch (error) {
            console.error("Error fetching weather data:", error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [apiKey]);

    // 🔘 Handler del botón de búsqueda (memoizado)
    const handleSearch = useCallback(() => {
        if (inputValue.trim()) {
            searchCity(inputValue);
        }
    }, [inputValue, searchCity]);

    // ⌨️ Handler de tecla Enter (memoizado)
    const handleKeyPress = useCallback((e) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    }, [handleSearch]);

    // 📝 Handler del input (memoizado)
    const handleInputChange = useCallback((e) => {
        setInputValue(e.target.value);
    }, []);

    // 🚀 Carga inicial de ciudad por defecto
    useEffect(() => {
        searchCity("Bogota");
    }, [searchCity]);

    // 🎨 Renderizar badge de día/noche
    const renderDayNightBadge = useMemo(() => (
        <div className={`day-night-badge ${weatherData.isDay ? 'day' : 'night'}`}>
            {weatherData.isDay ? '🌞 Day' : '🌙 Night'}
        </div>
    ), [weatherData.isDay]);

    // 🎨 Renderizar información de la ciudad
    const renderCityInfo = useMemo(() => (
        weatherData.country && (
            <span className="country">
                {getCountryFlag(weatherData.country)} {weatherData.country}
            </span>
        )
    ), [weatherData.country]);

    return (
        <div className="weather-container">
            {/* 🎯 Header */}
            <header className="header">
                <h1 className="title">🌤️ Weather App</h1>
                <p className="subtitle">Discover the current weather of any city in the world</p>
            </header>

            <main className="weather">
                {/* 🔍 Search bar */}
                <div className="search-bar">
                    <input 
                        type="text" 
                        placeholder="🔍 Search your city..."
                        value={inputValue}
                        onChange={handleInputChange}
                        onKeyPress={handleKeyPress}
                        aria-label="City name"
                    />
                    <img 
                        src={searchIcon} 
                        alt="Search"
                        onClick={handleSearch}
                        role="button"
                        tabIndex={0}
                    />
                </div>

                {/* ❌ Error message */}
                {error && <p className="error-message">{error}</p>}

                {/* ⏳ Loading state */}
                {loading ? (
                    <p className="loading">Loading...</p>
                ) : weatherData.city && (
                    <>
                        {/* ☀️ Weather icon */}
                        <img 
                            src={weatherData.icon} 
                            alt="Weather condition" 
                            className="weather-icon"
                        />
                        
                        {/* 🕐 Time info */}
                        <div className="time-info">
                            {renderDayNightBadge}
                            <div className="local-time">🕐 {weatherData.localTime}</div>
                        </div>
                        
                        {/* 🌡️ Temperature */}
                        <p className="temperature">{weatherData.temperature}°C</p>
                        
                        {/* 🏙️ City and country */}
                        <p className="city">
                            {weatherData.city}
                            {renderCityInfo}
                        </p>

                        {/* 📊 Weather details */}
                        <div className="weather-data">
                            <div className="col">
                                <img src={humidityIcon} alt="Humidity" />
                                <div>
                                    <p>{weatherData.humidity} %</p>
                                    <span>Humidity</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={windIcon} alt="Wind speed" />
                                <div>
                                    <p>{weatherData.windSpeed} km/h</p>
                                    <span>Wind</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </main>
        </div>
    );
}

export default Weather;