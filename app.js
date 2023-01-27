function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();

  if (hours < 10) {
    hours = ` 0${hours}`;
  }

  let minutes = date.getMinutes();

  if (minutes < 10) {
    minutes = ` 0${minutes}`;
  }

  let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
  let day = days[date.getDay()];

  return `${day} ${hours} : ${minutes}`;
}

function displayTemperature(response) {
  console.log(response.data);
  console.log(response.data.condition.description);

  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");

  celsiusTemperature = response.data.temperature.current;

 
  humidityElement.innerHTML = response.data.temperature.humidity;
  dateElement.innerHTML = formatDate(response.data.time * 1000);
  windElement.innerHTML = Math.round(response.data.wind.speed);
  descriptionElement.innerHTML = response.data.condition.description;
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
 iconElement.setAttribute(
   "src",
   `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
 );

}


function search(city) {
  let apiKey = "5cf053ofb32b9t3e1a2bc6055da407d4";
  // let city = "italy";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=5cf053ofb32b9t3e1a2bc6055da407d4&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  // console.log(cityInputElement.value)
  search(cityInputElement.value);
}



function displayFahrenheitTemperature(event) {
  event.preventDefault();

    let temperatureElement = document.querySelector("#temperature");


  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");

  let FahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(FahrenheitTemperature);
}


function displayCelsiusTemperature(event) {
  event.preventDefault();


celsiusLink.classList.add("active");
fahrenheitLink.classList.remove("active");

  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}


let celsiusTemperature=null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#Fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("lisbon");
