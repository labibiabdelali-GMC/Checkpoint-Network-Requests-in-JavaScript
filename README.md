# Weather App

A simple weather app built with HTML, CSS and JavaScript.
Type a city name and it shows the current weather.

## Features

- Search any city in the world
- Shows temperature, weather description, humidity and wind speed
- Works on phones and computers (responsive design)
- Shows a message if the city is not found

## Files

| File         | What it does                          |
|--------------|---------------------------------------|
| `index.html` | The page structure                    |
| `styles.css` | The look of the app                   |
| `script.js`  | Fetches the weather data and shows it |

## How to run

1. Download or clone this folder.
2. Open `index.html` in your web browser.
3. Type a city name (for example `Paris`) and click **Search**.

You don't need an API key or any installation.

## How it works

The app uses the free [Open-Meteo API](https://open-meteo.com/):

1. It sends the city name to the **Geocoding API** to get the city's coordinates.
2. It sends those coordinates to the **Forecast API** to get the current weather.
3. It reads the JSON response and puts the data on the page.

Both requests are made with `fetch()` and `async/await`.
