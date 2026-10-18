// Get the HTML elements we need
const form = document.getElementById("search-form");
const cityInput = document.getElementById("city-input");
const message = document.getElementById("message");
const weatherBox = document.getElementById("weather");

// Turn Open-Meteo weather codes into readable text
function getDescription(code) {
  if (code === 0) return "Clear sky";
  if (code <= 3) return "Partly cloudy";
  if (code <= 48) return "Foggy";
  if (code <= 57) return "Drizzle";
  if (code <= 67) return "Rain";
  if (code <= 77) return "Snow";
  if (code <= 82) return "Rain showers";
  if (code <= 86) return "Snow showers";
  return "Thunderstorm";
}

// Fetch the weather for a city
async function getWeather(city) {
  message.textContent = "Loading...";
  weatherBox.classList.add("hidden");

  try {
    // Step 1: find the city's coordinates
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`;
    const geoResponse = await fetch(geoUrl);
    const geoData = await geoResponse.json();

    if (!geoData.results) {
      message.textContent = "City not found. Try another one.";
      return;
    }

    const place = geoData.results[0];

    // Step 2: get the current weather for those coordinates
    const weatherUrl = `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code`;
    const weatherResponse = await fetch(weatherUrl);
    const weatherData = await weatherResponse.json();
    const current = weatherData.current;

    // Step 3: show the data on the page
    document.getElementById("location").textContent = `${place.name}, ${place.country}`;
    document.getElementById("temperature").textContent = `${Math.round(current.temperature_2m)}°C`;
    document.getElementById("description").textContent = getDescription(current.weather_code);
    document.getElementById("humidity").textContent = `${current.relative_humidity_2m}%`;
    document.getElementById("wind").textContent = `${current.wind_speed_10m} km/h`;

    message.textContent = "";
    weatherBox.classList.remove("hidden");
  } catch (error) {
    console.error(error);
    message.textContent = "Something went wrong. Check your connection.";
  }
}

// Run the search when the form is submitted
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  }
});
