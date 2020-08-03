const request = require("request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZW1tYW51ZWxvbXVsbyIsImEiOiJja2N1a2pkNXAwa2xrMnp0MnQybHk3N3hqIn0.YsblAcgFQP2WlPwaWUEe_Q&limit=1`;

  request({ url: url, json: true }, (error, { body = {} }) => {
    if (error) {
      callback(`Cannot connect to MapBox`, undefined);
    } else if (body.message) {
      callback(body.message, undefined);
    } else if (body.features.length === 0) {
      callback("Cannot find location", undefined);
    } else {
      const { center, place_name } = body.features[0];
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
