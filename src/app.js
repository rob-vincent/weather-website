const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views'); // we need this if we don't put all ".hbs" files under views folder
const partialsPath = path.join(__dirname, '../templates/partials');

// this is important to view what we have done in views folder
// need to run npm install hbs
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
  // this is to replace res.send('<h1>Weather</h1>');
  // first argument is the file name with no 'hbs' extension name
  // with second argument passed in as an object
  res.render('index', {
    title: 'Weather',
    name: 'Rob Vincent Tizon',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About Me',
    name: 'Rob Vincent Tizon',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    helpText: 'This is a helpful text.',
    title: 'Help',
    name: 'Rob Vincent',
  });
});

//#region We don't need these anymore because it was being replaced by the code up above.
/*
app.get('', (req, res) => {
  res.send('<h1>Weather</h1>');
});

app.get('/help', (req, res) => {
  // res.send({ name: 'Vincent', age: 28 });
  // we can send an array instead of an object
  res.send([
    { name: 'Vincent', age: 28 },
    { name: 'Hanna', age: 28 },
  ]);
});

app.get('/about', (req, res) => {
  res.send('<h1>About page</h1>');
});
*/
//#endregion

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address!',
    });
  }

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error });
    }

    const { latitude, longitude, location } = data;

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
  });
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    product: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Help article not found.',
    name: 'Hanna Grace',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404',
    errorMessage: 'Page not found.',
    name: 'Cherry',
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000.');
});
