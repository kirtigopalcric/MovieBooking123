const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Artist = require('./artistmodel');
const Genre = require('./genremodel');
const Movie = require('./moviemodel');
const User = require('./usermodel');

const db = {};
db.mongoose = mongoose;
db.url = 'mongodb://localhost:27017/moviesdb';

db.Artist = Artist;
db.Genre = Genre;
db.Movie = Movie;
db.User = User;

module.exports = db;
