const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&lang=es&appid=0eb3a769b8e71f91c0baca1e4049c5d8`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service!', undefined);
    } else if (body.error) {
      callback('Unable to find location', undefined);
    } else {
      callback(undefined, {
        ...body,
        weather: {
          ...body.weather[0],
          iconURL: `https://openweathermap.org/img/wn/${body.weather[0].icon}@2x.png`,
        },
      });
    }
  });
};

module.exports = forecast;
