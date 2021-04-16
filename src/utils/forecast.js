const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=456ac7ee0600e5f37a6d49273c26c731&query=${latitude},${longitude}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback('Unable to connect to weather service.', undefined);
    } else if (response.body.error) {
      callback('Unable to find location.', undefined);
    } else {
      const { weather_descriptions, temperature, feelslike } = response.body.current;
      callback(
        undefined,
        `${weather_descriptions[0]}. It is currently ${temperature} degrees out. It feels like ${feelslike} degrees out.`
      );
    }
  });
};

module.exports = forecast;
