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

let loc = prompt("Enter a city name: ", "Cairo");
getWeatherData(loc)
  .then((data) => processWeatherData(data))
  .then((data) => console.log(data));
