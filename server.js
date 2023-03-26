// Load express and create an express app object.
const express = require('express');
const app = express();

// Load cors,bodyparser module.
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConfig = require('../config/db.config');
const mongoose = require('mongoose');
const port = dbConfig.port;

//middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// import models
const{Artist,Genre,Movie,User} = require('../models/index.js')

//Routes work
app.use("/api", artists);
app.use("/api", genres);
app.use("/api", movies);
app.use("/api", users);


mongoose.connect(dbConfig.url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to the database!");
})
.catch(err => {
  console.log("Cannot connect to the database!", err);
  process.exit();
});



// Set the default route for the index or root path i.e /
app.get("/", (req, res) => {
  res.json({ message: "Movie booking application" });
});

// Set the PORT and start the server (i.e LISTEN on PORT for request).
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

module.exports = {Artist,Genre,Movie,User};