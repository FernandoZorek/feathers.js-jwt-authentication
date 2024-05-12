const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');
const swagger = require('feathers-swagger');
const swaggerDocs = require('./swagger.js');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet({
  contentSecurityPolicy: false
}));
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

app.configure(swagger({
  specs: {
    info: {
      title: ' FeathersJS JWT application',
      description: 'This project is a base setup for a FeathersJS application. It is designed to serve as a starting point for other projects, providing a basic structure and common functionalities such as user authentication.',
      version: '1.0.0',
    },
  },
  ui: swagger.swaggerUI({
    docsPath: '/docs'
  }),
}));

// Set up Plugins and providers
app.configure(express.rest());
app.configure(socketio());


app.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

app.configure(swaggerDocs)
// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
