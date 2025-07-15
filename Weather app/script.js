const apiKey = 'YOUR_API_KEY_HERE'; // Replace with your OpenWeatherMap API key

// Fetch weather by city name
async function getWeather() {
    const city = document.getElementById('cityInput').value;
    if (!city) {
        document.getElementById('weatherResult').innerText = 'Please enter a city name.';
        return;
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

// Fetch weather by geolocation
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeather(url);
        }, () => {
            document.getElementById('weatherResult').innerText = 'Location access denied.';
        });
    } else {
        document.getElementById('weatherResult').innerText = 'Geolocation not supported.';
    }
}

// Fetch and display weather
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            document.getElementById('weatherResult').innerText = 'City not found!';
            return;
        }

        const data = await response.json();
        const weatherDesc = data.weather[0].description;
        const temperature = data.main.temp;
        const city = data.name;

        document.getElementById('weatherResult').innerHTML = `
            <p><strong>${city}</strong></p>
            <p>${weatherDesc}</p>
            <p>${temperature}°C</p>
        `;
    } catch (error) {
        document.getElementById('weatherResult').innerText = 'Error fetching weather data.';
    }
}
