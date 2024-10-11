var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

require('./db')

var userRoutes = require('./routes/user_route');
var locationRoutes = require('./routes/location_route');
var promoCodeRoutes = require('./routes/promocode_route');
var serviceRoutes = require('./routes/service_route');
var billRoutes = require('./routes/bill_route');
var billServiceRoutes = require('./routes/billservice_route');

var indexRouter = require('./routes/index');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', indexRouter);
app.use('/users', userRoutes);
app.use('/locations', locationRoutes);
app.use('/promocodes', promoCodeRoutes);
app.use('/services', serviceRoutes);
app.use('/bills', billRoutes);
app.use('/billservices', billServiceRoutes);

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
