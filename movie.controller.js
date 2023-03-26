const Movie = require('../models/movie.model.js');

// Route to rootPath
const rootPath = (req, res) => {
  res.json({
    message: "Movie booking application",
  });
};

// Find all movies by status
exports.findAllMovies = async(req, res) => {
  const Query = req.query.status;
  if (Query != undefined) {
    var status = Query.toUpperCase();
  }
  if (Query == undefined) {
    let Movies = await movieModel.find();
    res.send(Movies);
    // res.json({ message: "Welcome to Upgrad Movie booking application development." });
  } else if (status == "PUBLISHED") {
    let filter = {
      published: true,
    };
    let Movie = await movieModel.find(filter);
    res.send(Movie);
  } else if (status == "RELEASED") {
    // console.log(req.query.title);
    if (req.query.title == undefined) {
      let filter = {
        released: true,
      };
      let Movie = await movieModel.find(filter);
      res.send(Movie);
    } else {
      let details = req.query;
      let Movie = await movieModel.find(details);
      res.send(Movie);
    }
  }
};

// Find one movie by id
exports.findOne = (req, res) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: "Movie not found with id " + id
        });
      }
      res.json(movie);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Movie not found with id " + id
        });
      }
      return res.status(500).send({
        message: "Error retrieving movie with id " + id
      });
    });
};

// Find all shows of a specific movie by id
exports.findShows = (req, res) => {
  const id = req.params.movieId;
  Movie.findById(id)
    .populate('shows')
    .then(movie => {
      if (!movie) {
        return res.status(404).send({
          message: "Movie not found with id " + id
        });
      }
      res.json(movie.shows);
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Movie not found with id " + id
        });
      }
      return res.status(500).send({
        message: "Error retrieving shows of movie with id " + id
      });
    });
};
