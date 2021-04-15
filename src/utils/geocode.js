const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1Ijoicm9iaTI3IiwiYSI6ImNrbXliaWx1aDAyYnEyb25saGgxbXk2ZTcifQ.nOuaj2OjIdMlOOg_CsQcgg&limit=1`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to geocode service!', undefined);
    } else if (response.body.features.length === 0) {
      callback('Unable to find location.', undefined);
    } else {
      const { center, place_name: location } = response.body.features[0];
      callback(undefined, { latitude: center[1], longitude: center[0], location });
    }
  });
};

module.exports = geocode;
