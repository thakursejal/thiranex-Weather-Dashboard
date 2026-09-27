# thiranex-Weather-Dashboard
# 🌦️ WeatherWise — Real-Time Weather Dashboard

A responsive real-time Weather Dashboard built using **HTML5, CSS3, and Vanilla JavaScript**.

WeatherWise allows users to search for a city and view current weather information using asynchronous JavaScript and REST APIs.

---

## 🌐 Live Demo

🚀 **WeatherWise — Live Website:**  
https://thakursejal.github.io/thiranex-Weather-Dashboard/

---

## ✨ Features

- 🔎 Search weather by city name
- 🌡️ Display current temperature
- 💧 Display humidity
- 💨 Display wind speed
- 🌡️ Display apparent/feels-like temperature
- 🧭 Display wind direction
- ☁️ Dynamic weather condition and weather icon
- ⚡ Fetch API with async/await
- 📦 JSON data parsing
- 🛡️ Error handling for failed requests
- ❌ Invalid city detection
- 🔄 Dynamic DOM rendering
- 📱 Responsive mobile, tablet, and desktop design
- 🎨 Modern user interface
- 🚫 No API key required

---

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Fetch API
- Async/Await
- REST APIs
- JSON
- Open-Meteo API

---

## 📂 Project Structure

    thiranex-Weather-Dashboard/
    │
    ├── index.html
    ├── style.css
    ├── script.js
    └── README.md

---

## ⚙️ How It Works

### 1. Search for a City

Enter a city name in the search box and click **Search**.

### 2. Geocoding

The application uses the Open-Meteo Geocoding API to convert the city name into geographic coordinates.

### 3. Fetch Weather Data

The application uses the coordinates to request current weather information from the Open-Meteo Weather API.

### 4. Process JSON Data

The API response is received as JSON and JavaScript extracts the required weather information.

### 5. Dynamic Rendering

The weather information is dynamically displayed on the page using JavaScript DOM manipulation.

### 6. Error Handling

The application handles invalid city names and failed API requests by displaying clear error messages to the user.

---

## 🌤️ Weather Information

The dashboard displays:

- Current Temperature
- Weather Condition
- Humidity
- Wind Speed
- Feels Like Temperature
- Wind Direction

---

## 🧠 JavaScript Concepts Demonstrated

This project demonstrates practical JavaScript concepts including:

- Functions
- Variables and constants
- Async/Await
- Promises
- Fetch API
- REST API integration
- JSON parsing
- DOM manipulation
- Event listeners
- Error handling
- Conditional rendering
- Template literals
- Object-based data mapping
- URL encoding

---

## 📱 Responsive Design

WeatherWise is designed to work across:

- 📱 Mobile devices
- 📲 Tablets
- 💻 Desktop computers

The layout automatically adapts using CSS media queries.

---

## 🛡️ Error Handling

The application handles situations such as:

- Empty city input
- Invalid city names
- City not found
- Failed API requests
- Unexpected API responses

Users receive a clear error message instead of the application breaking.

---

## 🌐 API

This project uses the **Open-Meteo API** for geocoding and weather data.

Open-Meteo provides weather information without requiring an API key, making the project suitable for client-side demonstration and deployment.

---

## 🎯 Task 4 Objectives

This project was developed as part of the **Asynchronous JavaScript & RESTful APIs** task.

The implementation demonstrates:

- Fetching real-time data from a REST API
- Using modern asynchronous JavaScript
- Processing JSON responses
- Handling network and user-input errors
- Dynamically rendering API data
- Creating a responsive weather dashboard

---

## 👩‍💻 Author

**Sejal**

GitHub:  
https://github.com/thakursejal

---

## 📄 License

This project is created for educational and internship purposes.
