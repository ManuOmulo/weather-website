const form = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");
const description = document.querySelector("#description");
const pop = document.querySelector("#pop");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const date = document.querySelector("#date");
const morning = document.querySelector("#morning");
const max = document.querySelector("#maximum");
const night = document.querySelector("#night");

messageOne.textContent = "";

form.addEventListener("submit", (e) => {
  e.preventDefault();

  messageOne.textContent = "";
  messageTwo.textContent = "";
  description.textContent = "";
  pressure.textContent = "";
  pop.textContent = "";
  humidity.textContent = "";
  windSpeed.textContent = "";
  date.textContent = "Loading...";
  morning.textContent = "";
  max.textContent = "";
  night.textContent = "";

  const location = search.value;

  if (location === undefined || "") {
    messageOne.textContent = "must provide a location";
  }

  fetch(`/weather?address=${location}`)
    .then((res) => res.json())
    .then((data) => {
      const time = new Date(data.date * 1000);
      const months = [
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
        "Dececember",
      ];
      const myDate = time.getDate();
      const month = months[time.getMonth()];

      data.error
        ? ((date.textContent = "Cannot find location :("),
          (messageTwo.textContent = ""))
        : ((messageOne.textContent = data.location),
          (messageTwo.textContent = data.forecast),
          (description.textContent = `Description: ${data.weather.description}`),
          (pressure.textContent = `Pressure: ${data.pressure} atm`),
          (pop.textContent = `Precipitation: ${Math.floor(data.pop * 100)}%`),
          (humidity.textContent = `Humidity: ${data.humidity}%`),
          (windSpeed.textContent = `Wind: ${data.wind_speed} m/s`),
          (date.textContent = `Date: ${myDate}, ${month}`),
          (morning.textContent = `Morning ${data.morning}°C`),
          (max.textContent = `Max ${data.max}°C`),
          (night.textContent = `Night ${data.night}°C`));
    })
    .catch((error) => console.log(error));
});
