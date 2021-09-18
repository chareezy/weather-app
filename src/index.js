function formatDate(date) {
  let currentDate = date.getDate();

  let days = [
    "SUNDAY",
    "MONDAY",
    "TUESDAY",
    "WEDNESDAY",
    "THURSDAY",
    "FRIDAY",
    "SATURDAY",
  ];
  let day = days[date.getDay()];
  let months = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "DECEMBER",
  ];
  let month = months[date.getMonth()];
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let ampm = hours >= 12 ? "PM" : "AM";
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  let formattedDate = `${day} ${month} ${currentDate} ${hours}:${minutes} ${ampm}`;
  return formattedDate;
}

let now = new Date();
let currentDate = document.querySelector("#current-date");
currentDate.innerHTML = formatDate(now);

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["SAT", "SUN", "MON", "TUES"];
  let forecastHTML = `<div class="row">`;
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
    <div class="col">
              <div class="forecast-date">${day}</div>
              <img
                class="sunny-clouds"
                src="https://openweathermap.org/img/wn/02d@2x.png"
                style="width: 60px"
              />
                              <span class="weather-forecast-temp-max">18°</span>
                <span class="weather-forecast-temp-min">12°</span>
            </div>
   `;
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text");
  let apiKey = "eb9800f95ce9aba6c28ebe6edbd56a9d";
  let city = searchInput.value.trim().toUpperCase();
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${city}`;

  axios.get(apiUrl).then(showTemperature);
}
function showTemperature(response) {
  celsiusTemperature = response.data.main.temp;
  let temperatureElement = document.querySelector(".today-degree");
  let description = document.querySelector(".temp-description");
  let iconElement = document.querySelector("#icon");
  let humidity = document.querySelector("#humidity");
  let humid = response.data.main.humidity;
  let wind = document.querySelector("#wind");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  description.innerHTML = response.data.weather[0].description
    .trim()
    .toUpperCase();
  humidity.innerHTML = `${humid}%`;
  wind = Math.round(response.data.wind.speed);
  wind.innerHTML = `${wind} MPH`;

  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

let form = document.querySelector("#search-city");
form.addEventListener("submit", search);

let button = document.querySelector("#click-button");
button.addEventListener("click", search);

function showCity(response) {
  let currentCity = response.data.name.trim().toUpperCase();
  let city = document.querySelector("h1");
  city.innerHTML = `${currentCity}`;

  showTemperature(response);
}

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "eb9800f95ce9aba6c28ebe6edbd56a9d";
  let units = "metric";
  let apiEndpoint = "https://api.openweathermap.org/data/2.5/weather";
  let apiUrl = `${apiEndpoint}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(showCity);
}

function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocation = document.querySelector("#location-button");
currentLocation.addEventListener("click", getLocation);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector(".today-degree");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".today-degree");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}
let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

displayForecast();
