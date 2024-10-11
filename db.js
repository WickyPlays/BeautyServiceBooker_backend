const mongoose = require("mongoose");

const mongoDB = "mongodb://localhost:27017/beautyservicebooker";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.on(
  "error",
  console.error.bind(console, "MongoDB connection error:")
);
mongoose.connection.once("open", async () => {
  console.log("Connected to MongoDB");
});

module.exports = mongoose;
