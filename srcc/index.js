let now = new Date();
let h2 = document.querySelector("h2");
let h6 = document.querySelector("h6");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
h2.innerHTML = day;
h6.innerHTML = `${hours}:${minutes}`;

function wheatherCity(response) {
  console.log(response.data);
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(
    "#humadity"
  ).innerHTML = `humidity: ${response.data.main.humidity}%`;
  document.querySelector("#wind").innerHTML = `wind: ${Math.round(
    response.data.wind.speed
  )} km/h`;
  document.querySelector("h1").innerHTML = response.data.name;
  document.querySelector("#describtion").innerHTML =
    response.data.weather[0].description;
}
function search(event) {
  event.preventDefault();
  document.querySelector("h1").innerHTML =
    document.querySelector("#search-text").value;
  let city = document.querySelector("#search-text").value;
  let apiKey = "46a90e4bf20000a35f74ecbd7bc09967";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(wheatherCity);
}
document.querySelector("#search-form").addEventListener("submit", search);

function handlePosition(position) {
  console.log(position.coords.latitude);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "46a90e4bf20000a35f74ecbd7bc09967";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(wheatherCity);
}
function getLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handlePosition);
}
let newButton = document.querySelector("#button-location");
newButton.addEventListener("click", getLocation);
