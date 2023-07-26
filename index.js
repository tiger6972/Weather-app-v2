//current date

let now = new Date();

function formatDate() {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let todayWeekday = days[now.getDay()];
  let todayDay = now.getDate();
  let todayMonth = months[now.getMonth()];

  let formattedDate = `${todayWeekday}, ${todayDay} ${todayMonth}`;
  return formattedDate;
}

let today = document.querySelector("#current-date");
today.innerHTML = formatDate();

//search function City

function searchCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#citySearch");
  console.log(searchInput.value);

  let h1 = document.querySelector("h1");
  h1.innerHTML = `${searchInput.value}`;

  let apiKey = "d05fa8ae630c157bbec6afac18475e37";
  let searchUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput.value}&appid=${apiKey}&units=metric`;

  axios.get(searchUrl).then(showTemperature);
}
//Change Temperature  with Search Term

function showTemperature(response) {
  let temperature = document.querySelector(".todayTemp");
  let searchTemperature = Math.round(response.data.main.temp);
  temperature.innerHTML = `${searchTemperature}°C`;
  let h1 = document.querySelector("h1");
  h1.innerHTML = response.data.name;
}

// search form  functionality
let form = document.querySelector("form");
form.addEventListener("click", searchCity, showTemperature);

//////////

//Temperature and Location - API-Axios

function retrieveData(position) {
  let apiKey = "d05fa8ae630c157bbec6afac18475e37";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiURL).then(showTemperature);
}

navigator.geolocation.getCurrentPosition(retrieveData);
