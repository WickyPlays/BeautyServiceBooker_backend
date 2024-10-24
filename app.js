var createError = require("http-errors");
var express = require("express");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var http = require("http");
var WebSocket = require("ws");

require('dotenv').config();

require("./db");

var authRoutes = require("./routes/auth_route");
var userRoutes = require("./routes/user_route");
var locationRoutes = require("./routes/location_route");
var promoCodeRoutes = require("./routes/promocode_route");
var serviceRoutes = require("./routes/service_route");
var billRoutes = require("./routes/bill_route");
var billServiceRoutes = require("./routes/billservice_route");
var authMiddleware = require("./middlewares/auth_middleware");
var appointmentRoutes = require("./routes/appointment_route");

var app = express();
var server = http.createServer(app);
var wss = new WebSocket.Server({ server });

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/auth", authRoutes);
app.use("/users", authMiddleware, userRoutes);
app.use("/locations", locationRoutes);
app.use("/promocodes", promoCodeRoutes);
app.use("/services", serviceRoutes);
app.use("/bills", authMiddleware, billRoutes);
app.use("/billservices", authMiddleware, billServiceRoutes);
app.use("/appointments", authMiddleware, appointmentRoutes);

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.render("error");
});

// Broadcast function to send data to all connected clients
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

module.exports = { app, server, wss };