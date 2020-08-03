const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Setiing up paths for express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setting handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setting up static Directory to be served
app.use(express.static(publicDirPath));

// Routes
app.get("", (req, res) => {
  res.render("index", {
    title: "Day's Weather",
    name: "Emmanuel Omulo",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About App",
    name: "Emmanuel Omulo",
  });
});

app.get("/api", (req, res) => {
  res.render("help", {
    title: "How to use API",
    name: "Emmanuel Omulo",
    message: "my help message",
  });
});

app.get("/api/*", (req, res) => {
  res.render("404", {
    title: "Help 404",
    name: "Emmanuel Omulo",
    message: "Help article not found",
  });
});

app.get("/weather", (req, res) => {
  // making the address query string to be required
  if (!req.query.address) {
    return res.send({
      error: "Must provide an address",
    });
  }
  // getting latitude and longitude coordinates for address
  geocode(req.query.address, (error, data = {}) => {
    const { longitude, latitude, location } = data;

    if (!error) {
      // using lat and lon values to get weather forecast of address
      forecast(latitude, longitude, (error, weatherData) => {
        if (!error) {
          const {
            forecast,
            weather,
            pressure,
            humidity,
            wind_speed,
            pop,
            date,
            morning,
            max,
            night,
          } = weatherData;
          res.send({
            forecast: forecast,
            location: location,
            weather: weather,
            pressure: pressure,
            humidity: humidity,
            wind_speed: wind_speed,
            pop: pop,
            date: date,
            morning: morning,
            max: max,
            night: night,
            address: req.query.address,
          });
        } else {
          res.send({
            error: error,
          });
        }
      });
    } else {
      res.send({
        error: error,
      });
    }
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Emmanuel",
    message: "Page not Found",
  });
});

app.listen(port);
