/**
 * 🌍 Weather Utility Functions
 * Funciones helper para procesamiento de datos del clima
 */

import clearIcon from '../assets/clear.png';
import cloudIcon from '../assets/cloud.png';
import drizzleIcon from '../assets/drizzle.png';
import rainIcon from '../assets/rain.png';
import snowIcon from '../assets/snow.png';

// 🎨 Mapeo de códigos de clima a iconos
export const WEATHER_ICONS = {
    "01d": clearIcon, "01n": clearIcon,
    "02d": cloudIcon, "02n": cloudIcon,
    "03d": cloudIcon, "03n": cloudIcon,
    "04d": cloudIcon, "04n": cloudIcon,
    "09d": drizzleIcon, "09n": drizzleIcon,
    "10d": rainIcon, "10n": rainIcon,
    "11d": rainIcon, "11n": rainIcon,
    "13d": snowIcon, "13n": snowIcon,
    "50d": cloudIcon, "50n": cloudIcon,
};

/**
 * Convierte código de país ISO a emoji de bandera
 * @param {string} countryCode - Código ISO de 2 letras (ej: "US", "CO")
 * @returns {string} - Emoji de bandera (ej: "🇺🇸", "🇨🇴")
 */
export const getCountryFlag = (countryCode) => {
    return countryCode
        .toUpperCase()
        .split('')
        .map(char => String.fromCodePoint(127397 + char.charCodeAt(0)))
        .join('');
};

/**
 * Formatea la hora local desde timestamp Unix y timezone offset
 * @param {number} timestamp - Timestamp Unix en segundos
 * @param {number} timezone - Offset de zona horaria en segundos
 * @returns {string} - Hora formateada "HH:MM"
 */
export const formatLocalTime = (timestamp, timezone) => {
    const localTimestamp = (timestamp + timezone) * 1000;
    const localDate = new Date(localTimestamp);
    const hours = localDate.getUTCHours().toString().padStart(2, '0');
    const minutes = localDate.getUTCMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};

/**
 * Procesa los datos crudos de la API de OpenWeatherMap
 * @param {Object} data - Datos de la API
 * @returns {Object} - Datos procesados y formateados
 */
export const processWeatherData = (data) => {
    const iconCode = data.weather[0].icon;
    const weatherIcon = WEATHER_ICONS[iconCode] || clearIcon;
    const isDay = iconCode.endsWith('d');
    const localTime = formatLocalTime(data.dt, data.timezone);
    
    return {
        temperature: Math.round(data.main.temp),
        city: data.name,
        country: data.sys.country,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed,
        icon: weatherIcon,
        isDay: isDay,
        localTime: localTime
    };
};

/**
 * Mensajes de error por código de estado HTTP
 */
export const ERROR_MESSAGES = {
    404: "City not found",
    401: "Invalid API key",
    500: "Server error, please try again later",
};

