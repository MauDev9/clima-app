import React, { useEffect, useState } from "react";
import './Weather.css';
import searchIcon from '../assets/search.png';
import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import humidityIcon from '../assets/humidity.png';
import rainIcon from '../assets/rain.png';
import windIcon from '../assets/wind.png';
import snowIcon from '../assets/snow.png';


function Weather() {

    // ✅ ESTADO 1: Datos del clima
    // Este objeto guarda toda la información que mostramos en pantalla
    const [weatherData, setWeatherData] = useState({
        temperature: 0,
        city: "",
        country: "",  // 🌍 Código del país (ej: "CO", "US", "ES")
        humidity: 0,
        windSpeed: 0,
        icon: clearIcon,
        isDay: true,  // 🌞 Indica si es día o noche
        localTime: ""  // 🕐 Hora local de la ciudad
    });

    // ✅ ESTADO 2: Indica si está cargando datos
    const [loading, setLoading] = useState(false);

    // ✅ ESTADO 3: Guarda mensajes de error
    const [error, setError] = useState(null);

    // ✅ ESTADO 4: Guarda lo que el usuario escribe en el input
    const [inputValue, setInputValue] = useState("");

    // 🌍 FUNCIÓN: Convierte código de país a emoji de bandera
    const getCountryFlag = (countryCode) => {
        // Los emojis de banderas usan Regional Indicator Symbols
        // A = U+1F1E6, B = U+1F1E7, etc.
        // Convertimos "US" → 🇺🇸, "CO" → 🇨🇴, "ES" → 🇪🇸
        return countryCode
            .toUpperCase()
            .split('')
            .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
            .join('');
    };

    // 🎨 OBJETO: Mapea los códigos de clima de la API a los iconos
    const weatherIcons = {
        "01d": clearIcon,      // clear sky day
        "01n": clearIcon,      // clear sky night
        "02d": cloudIcon,      // few clouds day
        "02n": cloudIcon,      // few clouds night
        "03d": cloudIcon,      // scattered clouds
        "03n": cloudIcon,
        "04d": cloudIcon,      // broken clouds
        "04n": cloudIcon,
        "09d": drizzleIcon,    // shower rain
        "09n": drizzleIcon,
        "10d": rainIcon,       // rain
        "10n": rainIcon,
        "11d": rainIcon,       // thunderstorm
        "11n": rainIcon,
        "13d": snowIcon,       // snow
        "13n": snowIcon,
        "50d": cloudIcon,      // mist
        "50n": cloudIcon,
    };

    const searchCity = async (city) => {
        // Validación: no buscar si el campo está vacío
        if (!city.trim()) {
            setError("Por favor ingresa el nombre de una ciudad");
            return;
        }
        
        // ✅ PASO 1: Activar estado de carga
        setLoading(true);
        setError(null); // Limpiar errores previos
        
        try {
            // ✅ PASO 2: Obtener la API key del archivo .env
            const apiKey = import.meta.env.VITE_APP_ID;
            
            // Verificar si la API key existe
            if (!apiKey) {
                throw new Error("API key no configurada. Agrega VITE_APP_ID en el archivo .env");
            }
            
            // ✅ PASO 3: Hacer la petición a la API
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            const response = await fetch(url);
            
            // ✅ PASO 4: Verificar si la respuesta es exitosa
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Ciudad no encontrada");
                } else if (response.status === 401) {
                    throw new Error("API key inválida");
                } else {
                    throw new Error("Error al obtener datos del clima");
                }
            }
            
            const data = await response.json();
            console.log("Datos recibidos:", data); // Para debug
            
            // ✅ PASO 5: Obtener el icono correcto según el clima
            const iconCode = data.weather[0].icon;
            const weatherIcon = weatherIcons[iconCode] || clearIcon; // Si no existe el código, usa clearIcon por defecto
            
            // ✅ PASO 5.1: Detectar si es día o noche
            // La API devuelve códigos como "01d" (día) o "01n" (noche)
            // La última letra indica: "d" = day (día), "n" = night (noche)
            const isDay = iconCode.endsWith('d');
            
            // ✅ PASO 5.2: Calcular la hora local de la ciudad
            // La API devuelve 'timezone' (desplazamiento en segundos desde UTC)
            // y 'dt' (timestamp actual en UTC)
            const timezoneOffset = data.timezone; // Ej: 3600 para UTC+1
            const localTimestamp = (data.dt + timezoneOffset) * 1000; // Convertir a milisegundos
            const localDate = new Date(localTimestamp);
            
            // Formatear la hora en formato 24h (HH:MM)
            const hours = localDate.getUTCHours().toString().padStart(2, '0');
            const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
            const localTime = `${hours}:${minutes}`;
            
            // ✅ PASO 5.3: Obtener el código del país
            // La API devuelve códigos ISO de 2 letras (ej: "CO", "US", "ES", "JP")
            const countryCode = data.sys.country;
            
            // ✅ PASO 6: Guardar los datos en el estado
            setWeatherData({
                temperature: Math.round(data.main.temp), // Redondear temperatura
                city: data.name,
                country: countryCode, // 🌍 Código del país (ej: "CO", "US")
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                icon: weatherIcon, // 🎨 Icono dinámico según el clima
                isDay: isDay,  // 🌞🌙 Si es día o noche
                localTime: localTime  // 🕐 Hora local (ej: "15:30")
            });
            
        } catch (error) {
            // ✅ PASO 7: Manejar errores y mostrarlos al usuario
            console.error("Error fetching weather data:", error);
            setError(error.message);
            
        } finally {
            // ✅ PASO 8: Desactivar estado de carga (siempre se ejecuta)
            setLoading(false);
        }
    }

    // ✅ FUNCIÓN: Maneja el click del botón de búsqueda
    const handleSearch = () => {
        searchCity(inputValue);
    }

    // ✅ FUNCIÓN: Maneja cuando el usuario presiona Enter
    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            searchCity(inputValue);
        }
    }

    // ✅ useEffect: Busca una ciudad por defecto al cargar la app
    useEffect(() => {
        searchCity("Bogotá");
    }, []);

  return (
    <div className="weather-container">
        
        {/* 🎯 Título de bienvenida */}
        <div className="header">
            <h1 className="title">🌤️ Clima App</h1>
            <p className="subtitle">Descubre el clima actual de cualquier ciudad del mundo</p>
        </div>

        <div className="weather">
        
         <div className="search-bar">
            {/* ✅ Input conectado al estado */}
            <input 
                type="text" 
                placeholder="🔍 Busca tu ciudad..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
            />
            {/* ✅ Botón conectado a la función de búsqueda */}
            <img 
                src={searchIcon} 
                alt="search icon"
                onClick={handleSearch}
            />
         </div>

        {/* ✅ Mostrar mensaje de error si existe */}
        {error && (
            <p className="error-message">{error}</p>
        )}

        {/* ✅ Mostrar "Cargando..." mientras busca */}
        {loading ? (
            <p className="loading">Cargando...</p>
        ) : (
            <>
                {/* ✅ Mostrar datos solo si hay una ciudad */}
                {weatherData.city && (
                    <>
                        {/* ✅ DATO DINÁMICO: Icono del clima */}
                        <img src={weatherData.icon} alt="weather icon" className="weather-icon"/>
                        
                        {/* 🌞🌙 Indicador de día/noche y hora local */}
                        <div className="time-info">
                            <div className={`day-night-badge ${weatherData.isDay ? 'day' : 'night'}`}>
                                {weatherData.isDay ? '🌞 Día' : '🌙 Noche'}
                            </div>
                            <div className="local-time">
                                🕐 {weatherData.localTime}
                            </div>
                        </div>
                        
                        {/* ✅ DATO DINÁMICO: Temperatura */}
                        <p className="temperature">{weatherData.temperature}°C</p>
                        
                        {/* ✅ DATO DINÁMICO: Nombre de la ciudad y país */}
                        <p className="city">
                            {weatherData.city}
                            {weatherData.country && (
                                <span className="country">
                                    {getCountryFlag(weatherData.country)} {weatherData.country}
                                </span>
                            )}
                        </p>

                        <div className="weather-data">
                            <div className="col">
                                <img src={humidityIcon} alt="humidity icon" />
                                <div>
                                    {/* ✅ DATO DINÁMICO: Humedad */}
                                    <p>{weatherData.humidity} %</p>
                                    <span>Humedad</span>
                                </div>
                            </div>
                            <div className="col">
                                <img src={windIcon} alt="wind icon" />
                                <div>
                                    {/* ✅ DATO DINÁMICO: Velocidad del viento */}
                                    <p>{weatherData.windSpeed} km/h</p>
                                    <span>Viento</span>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </>
        )}
        
        </div>
        
    </div>

  );
}

export default Weather;