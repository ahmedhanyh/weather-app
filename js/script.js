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
    weather: weatherData.weather[0].main,
    temp: weatherData.main.temp,
  };

  return neededWeatherData;
}

const cityInput = document.querySelector('input[name="city"]');
const getWeatherDataBtn = document.querySelector('input[type="submit"]');
const cityNameDisplay = document.querySelector("#city-name");
const cityWeatherDisplay = document.querySelector("#city-weather");
const cityTempDisplay = document.querySelector("#city-temp");
const convertBtn = document.querySelector("#convert-btn");

getWeatherDataBtn.addEventListener("click", (event) => {
  event.preventDefault();
  const city = cityInput.value;

  getWeatherData(city)
    .then((data) => processWeatherData(data))
    .then((data) => {
      cityNameDisplay.textContent = data.name;
      cityWeatherDisplay.textContent = data.weather;
      cityTempDisplay.textContent = data.temp;
      convertBtn.hidden = false;
    });
});

let currentTempUnit = "c";

function c_to_f(temp) {
  return (temp * (9 / 5) + 32).toFixed(2);
}

function f_to_c(temp) {
  return ((temp - 32) * (5 / 9)).toFixed(2);
}

convertBtn.addEventListener("click", () => {
  if (currentTempUnit === "c") {
    cityTempDisplay.textContent = c_to_f(cityTempDisplay.textContent);
    convertBtn.textContent = "Convert to Celsius";
    currentTempUnit = "f";
  } else {
    cityTempDisplay.textContent = f_to_c(cityTempDisplay.textContent);
    currentTempUnit = "c";
    convertBtn.textContent = "Convert to Fahrenheit";
  }
});
