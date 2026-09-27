/* =========================================================
   WEATHERWISE — TASK 4
   Asynchronous JavaScript & RESTful APIs
   Fetch API + Async/Await + JSON + Error Handling
   ========================================================= */

// =========================
// API CONFIGURATION
// =========================

// Open-Meteo does not require an API key.
// We first convert the city name into coordinates,
// then request weather data for those coordinates.

const GEOCODING_API =
    "https://geocoding-api.open-meteo.com/v1/search";

const WEATHER_API =
    "https://api.open-meteo.com/v1/forecast";


// =========================
// DOM ELEMENTS
// =========================

const weatherForm = document.getElementById("weather-form");

const cityInput = document.getElementById("city-input");

const loadingMessage =
    document.getElementById("loading-message");

const errorMessage =
    document.getElementById("error-message");

const weatherSection =
    document.getElementById("weather-section");

const locationName =
    document.getElementById("location-name");

const weatherIcon =
    document.getElementById("weather-icon");

const temperature =
    document.getElementById("temperature");

const weatherDescription =
    document.getElementById("weather-description");

const humidity =
    document.getElementById("humidity");

const windSpeed =
    document.getElementById("wind-speed");

const feelsLike =
    document.getElementById("feels-like");

const windDirection =
    document.getElementById("wind-direction");


// =========================
// WEATHER CODE MAPPING
// =========================

const weatherConditions = {

    0: {
        description: "Clear sky",
        icon: "☀️"
    },

    1: {
        description: "Mainly clear",
        icon: "🌤️"
    },

    2: {
        description: "Partly cloudy",
        icon: "⛅"
    },

    3: {
        description: "Overcast",
        icon: "☁️"
    },

    45: {
        description: "Fog",
        icon: "🌫️"
    },

    48: {
        description: "Depositing rime fog",
        icon: "🌫️"
    },

    51: {
        description: "Light drizzle",
        icon: "🌦️"
    },

    53: {
        description: "Moderate drizzle",
        icon: "🌦️"
    },

    55: {
        description: "Dense drizzle",
        icon: "🌧️"
    },

    61: {
        description: "Slight rain",
        icon: "🌦️"
    },

    63: {
        description: "Moderate rain",
        icon: "🌧️"
    },

    65: {
        description: "Heavy rain",
        icon: "🌧️"
    },

    71: {
        description: "Slight snow",
        icon: "🌨️"
    },

    73: {
        description: "Moderate snow",
        icon: "🌨️"
    },

    75: {
        description: "Heavy snow",
        icon: "❄️"
    },

    80: {
        description: "Slight rain showers",
        icon: "🌦️"
    },

    81: {
        description: "Moderate rain showers",
        icon: "🌧️"
    },

    82: {
        description: "Violent rain showers",
        icon: "⛈️"
    },

    95: {
        description: "Thunderstorm",
        icon: "⛈️"
    },

    96: {
        description: "Thunderstorm with slight hail",
        icon: "⛈️"
    },

    99: {
        description: "Thunderstorm with heavy hail",
        icon: "⛈️"
    }

};


// =========================
// SHOW / HIDE LOADING
// =========================

function showLoading() {

    loadingMessage.classList.remove("hidden");

    weatherSection.classList.add("hidden");

    errorMessage.classList.add("hidden");
}


// =========================
// SHOW ERROR
// =========================

function showError(message) {

    errorMessage.textContent = message;

    errorMessage.classList.remove("hidden");

    loadingMessage.classList.add("hidden");

    weatherSection.classList.add("hidden");
}


// =========================
// HIDE STATUS MESSAGES
// =========================

function clearMessages() {

    loadingMessage.classList.add("hidden");

    errorMessage.classList.add("hidden");
}


// =========================
// FIND CITY
// =========================

async function findCity(city) {

    const url =
        `${GEOCODING_API}?name=${encodeURIComponent(city)}&count=10&language=en&format=json`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Unable to connect to the location service."
        );
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error(
            `Could not find "${city}". Please check the city name and try again.`
        );
    }

    // Normalize the user's input
    const searchName = city
        .trim()
        .toLowerCase()
        .split(",")[0]
        .trim();

    // Look for an exact city-name match
    const exactMatch = data.results.find(function (result) {

        const resultName = result.name
            .trim()
            .toLowerCase();

        return resultName === searchName;
    });

    // If no exact match exists, don't accept a random fuzzy result
    if (!exactMatch) {
        throw new Error(
            `Could not find a city named "${city}". Please enter a valid city name.`
        );
    }

    return exactMatch;
}


// =========================
// GET WEATHER
// =========================

async function getWeather(latitude, longitude) {

    const url =
        `${WEATHER_API}?latitude=${latitude}` +
        `&longitude=${longitude}` +
        `&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m,wind_direction_10m` +
        `&timezone=auto`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(
            "Unable to retrieve weather information."
        );
    }

    const data = await response.json();

    return data;
}


// =========================
// DISPLAY WEATHER
// =========================

function displayWeather(city, weatherData) {

    const current = weatherData.current;

    const condition =
        weatherConditions[current.weather_code] || {
            description: "Unknown weather",
            icon: "🌤️"
        };


    // Location
    const countryText =
        city.country
            ? `, ${city.country}`
            : "";

    locationName.textContent =
        `${city.name}${countryText}`;


    // Weather icon
    weatherIcon.textContent =
        condition.icon;


    // Temperature
    temperature.textContent =
        `${Math.round(current.temperature_2m)}°C`;


    // Description
    weatherDescription.textContent =
        condition.description;


    // Humidity
    humidity.textContent =
        `${current.relative_humidity_2m}%`;


    // Wind speed
    windSpeed.textContent =
        `${current.wind_speed_10m} km/h`;


    // Feels like
    feelsLike.textContent =
        `${Math.round(current.apparent_temperature)}°C`;


    // Wind direction
    windDirection.textContent =
        `${Math.round(current.wind_direction_10m)}°`;


    // Show weather section
    weatherSection.classList.remove("hidden");
}


// =========================
// MAIN WEATHER FUNCTION
// =========================

async function searchWeather(city) {

    showLoading();

    try {

        // Step 1:
        // Convert city name into coordinates.

        const cityData =
            await findCity(city);


        // Step 2:
        // Use coordinates to get weather.

        const weatherData =
            await getWeather(
                cityData.latitude,
                cityData.longitude
            );


        // Step 3:
        // Display the weather data.

        displayWeather(
            cityData,
            weatherData
        );


        clearMessages();

    } catch (error) {

        console.error(
            "Weather request failed:",
            error
        );

        showError(
            error.message ||
            "Something went wrong. Please try again."
        );
    }
}


// =========================
// FORM SUBMISSION
// =========================

weatherForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();

        const city =
            cityInput.value.trim();


        if (city === "") {

            showError(
                "Please enter a city name."
            );

            return;
        }


        searchWeather(city);

    }
);


// =========================
// INITIAL WEATHER
// =========================

// Load a default city when the application starts.

searchWeather("Hyderabad");