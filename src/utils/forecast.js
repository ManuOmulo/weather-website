const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=minutely,hourly&appid=7d186374021f8fc19174d3f7fe0c1517&units=metric`;

  request({ url: url, json: true }, (error, { body = {} }) => {
    if (error) {
      callback(`Unable to connect to weather service`, undefined);
    } else if (body.message) {
      callback(`Error ${body.cod} : ${body.message}`, undefined);
    } else {
      const {
        temp,
        pop,
        weather,
        dt,
        feels_like,
        pressure,
        humidity,
        wind_speed,
      } = body.daily[0];
      callback(undefined, {
        forecast: `It's currently ${temp.day}°C out and there's ${Math.floor(
          pop * 100
        )}% chance of rain later on the day. Feels like ${feels_like.day}°C`,
        weather: weather[0],
        pressure: pressure,
        humidity: humidity,
        wind_speed: wind_speed,
        pop: pop,
        date: dt,
        morning: temp.morn,
        max: temp.max,
        night: temp.night,
      });
    }
  });
};

module.exports = forecast;
