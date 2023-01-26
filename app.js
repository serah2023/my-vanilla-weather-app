
function formatDate(timestamp)
{
    //calculate the date

    let date=new Date(timestamp);
    let hours=date.getHours();

        if(hours<10){
        hours=` 0${hours}`
    }

    let minutes=date.getMinutes();

    if(minutes<10){
        minutes=` 0${minutes}`
    }



    let days = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday"];
    let day = days[date.getDay()]; 

return `${day} ${hours} : ${minutes}`;
}


function displayTemperature(response)

{
    console.log(response.data)
    // console.log(response.data.temperature.current);
    console.log(response.data.condition.description);

    let temperatureElement=document.querySelector("#temperature");
    let cityElement=document.querySelector("#city");
    let descriptionElement = document.querySelector("#description");
    let humidityElement=document.querySelector("#humidity");
    humidityElement.innerHTML=response.data.temperature.humidity;

    let windElement=document.querySelector("#wind");

    let dateElement = document.querySelector("#date");
    dateElement.innerHTML = formatDate(response.data.time * 1000);

    windElement.innerHTML = Math.round(response.data.wind.speed);
    descriptionElement.innerHTML=response.data.condition.description;
    cityElement.innerHTML=response.data.city;
    temperatureElement.innerHTML = Math.round(response.data.temperature.current );
}

let apiKey="5cf053ofb32b9t3e1a2bc6055da407d4";
// let apiUrl =
//   "https://api.shecodes.io/weather/v1/current?cquery={NewYork}&key={5cf053ofb32b9t3e1a2bc6055da407d4}&units=metri";

 let apiUrl =
"https://api.shecodes.io/weather/v1/current?query=Italy&key=5cf053ofb32b9t3e1a2bc6055da407d4&units=metric";
    
  console.log(apiUrl)

  axios.get(apiUrl).then(displayTemperature);