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
  let temperature = Math.round(response.data.main.temp);
  let degree = document.querySelector(".today-degree");
  degree.innerHTML = `${temperature}`;
  let description = document.querySelector(".temp-description");
  description.innerHTML = response.data.weather[0].main.trim().toUpperCase();
  let humid = response.data.main.humidity;
  let humidity = document.querySelector("#humidity");
  humidity.innerHTML = `${humid}%`;
  let windSpeed = Math.round(response.data.wind.speed);
  let wind = document.querySelector("#wind");
  wind.innerHTML = `${windSpeed} MPH`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${reseponse.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].main);
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
