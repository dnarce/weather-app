const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();
const port = process.env.PORT || 3000;

// Define paths for Express conif
const publicDirectory = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup handlebar engine
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

// Setup Static directory to serve
app.use(express.static(publicDirectory));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You mus provide an address!',
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get('*', (req, res) => {
  res.render('404');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
