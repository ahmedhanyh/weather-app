const API_KEY = "86a265bad4b9f62b751292b45e1cbdae";

function getWeatherData(location) {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`,
    { mode: "cors" }
  ).then((response) => response.json());
}

function processWeatherData(weatherData) {
  const neededWeatherData = {
    name: weatherData.name,
    temp: weatherData.main.temp,
  };

  return neededWeatherData;
}

const cityInput = document.querySelector('input[name="city"]');
const getWeatherDataBtn = document.querySelector('input[type="submit"]');
const cityNameDisplay = document.querySelector("#city-name");
const cityTempDisplay = document.querySelector("#city-temp");

getWeatherDataBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityInput.value;

  getWeatherData(city)
    .then((data) => processWeatherData(data))
    .then((data) => {
      cityNameDisplay.textContent = data.name;
      cityTempDisplay.textContent = data.temp;
    });
});
