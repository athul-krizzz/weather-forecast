const apiKey = '823b677107b08259193a05323a7d15f2'; 
const weatherButton = document.getElementById('get-weather');
const cityInput = document.getElementById('city-input');
const weatherResult = document.getElementById('weather-result');

weatherButton.addEventListener('click', () => {
  const city = cityInput.value;

  if (city) {
    // Fetch weather data
    fetchWeather(city);
  } else {
    weatherResult.innerHTML = "<p>Please enter a city.</p>";
  }
});

function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Check if city is found
      if (data.cod === 200) {
        displayWeather(data);
      } else {
        weatherResult.innerHTML = `<p>City not found.</p>`;
      }
    })
    .catch(error => {
      console.error("Error fetching weather data:", error);
      weatherResult.innerHTML = "<p>Sorry, something went wrong.</p>";
    });
}

function displayWeather(data) {
  const temperature = data.main.temp;
  const description = data.weather[0].description;
  const humidity = data.main.humidity;
  const windSpeed = data.wind.speed;

  const weatherHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p>${description}</p>
    <p><strong>Temperature:</strong> ${temperature}°C</p>
    <p><strong>Humidity:</strong> ${humidity}%</p>
    <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
  `;

  weatherResult.innerHTML = weatherHTML;
}
