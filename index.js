// index.js

// Step 1: Fetch Data from the API
// - Create a function `fetchWeatherData(city)`
// - Use fetch() to retrieve data from the OpenWeather API
// - Handle the API response and parse the JSON
// - Log the data to the console for testing

// Step 2: Display Weather Data on the Page
// - Create a function `displayWeather(data)`
// - Dynamically update the DOM with weather details (e.g., temperature, humidity, weather description)
// - Ensure the function can handle the data format provided by the API

// Step 3: Handle User Input
// - Add an event listener to the button to capture user input
// - Retrieve the value from the input field
// - Call `fetchWeatherData(city)` with the user-provided city name

// Step 4: Implement Error Handling
// - Create a function `displayError(message)`
// - Handle invalid city names or network issues
// - Dynamically display error messages in a dedicated section of the page

// Step 5: Optimize Code for Maintainability
// - Refactor repetitive code into reusable functions
// - Use async/await for better readability and to handle asynchronous operations
// - Ensure all reusable functions are modular and clearly named

// BONUS: Loading Indicator
// - Optionally, add a loading spinner or text while the API request is in progress

// BONUS: Additional Features
// - Explore adding more features, such as displaying additional weather details (e.g., wind speed, sunrise/sunset)
// - Handle edge cases, such as empty input or API rate limits

// Event Listener for Fetch Button
// - Attach the main event listener to the button to start the process

const API_KEY = "9150b6f57c8e40ff7ef462726816cda7";

async function fetchWeatherData(city) {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`,
  );

  if (!response.ok) {
    throw new Error("City not found");
  }
  const data = await response.json();
  return data;
}

function displayWeather(data) {
  const weatherDisplay = document.getElementById("weather-display");
  if (!weatherDisplay) return;

  const tempCelsius = Math.round(data.main.temp - 273.15);
  weatherDisplay.innerHTML = `
    <h2>${data.name}</h2>
    <p>Temperature: ${tempCelsius}°C</p>
    <p>Humidity: ${data.main.humidity}%</p>
    <p>Conditions: ${data.weather[0].description}</p>
  `;
  const errorMessage = document.getElementById("error-message");
  if (errorMessage) errorMessage.classList.add("hidden");
}

function displayError(message) {
  const errorMessage = document.getElementById("error-message");
  if (!errorMessage) return;
  errorMessage.textContent = message;
  errorMessage.classList.remove("hidden");
  const weatherDisplay = document.getElementById("weather-display");
  if (weatherDisplay) weatherDisplay.innerHTML = "";
}

function setupEventListeners() {
  const fetchBtn = document.getElementById("fetch-weather");
  if (!fetchBtn) return;

  fetchBtn.addEventListener("click", async () => {
    const cityInput = document.getElementById("city-input");
    const city = cityInput.value.trim();

    if (!city) {
      displayError("Please enter a city name");
      return;
    }

    try {
      const data = await fetchWeatherData(city);
      displayWeather(data);
    } catch (error) {
      displayError(error.message);
    }
  });
}

if (typeof window !== "undefined") {
  window.addEventListener("DOMContentLoaded", setupEventListeners);
}

module.exports = {
  fetchWeatherData,
  displayWeather,
  displayError,
  setupEventListeners,
};
