async function getWeather() {
    const city = document.getElementById('city').value;
    const apiKey = '9586dd9cef9c9fb2f21c9705d808ff68'; // Replace with your OpenWeatherMap API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=no&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Ikke gyldig: ${response.status}`);
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error('Error fetching the weather data', error);
        document.getElementById('weather').innerHTML = `<p style="color: #520500;">Error: ${error.message}</p>`;
    }
}

function displayWeather(data) {
    const weatherDiv = document.getElementById('weather');
    if (data.cod === 200) {
        console.log(data);
        
        weatherDiv.innerHTML = `
            <h2>${data.name}, ${data.sys.country}</h2>
            <p>Temperatur: ${data.main.temp}°C</p>
            <p>Min Temperatur: ${data.main.temp_min}°C</p>
            <p>Maks Temperatur: ${data.main.temp_max}°C</p>
            <p>Vær: ${data.weather[0].description}</p>
            <p>Fuktighet: ${data.main.humidity}%</p>
            <p>Vindhastighet: ${data.wind.speed} m/s</p>
        `;
    } else {
        weatherDiv.innerHTML = `<p>${data.message}</p>`;
    }
}

