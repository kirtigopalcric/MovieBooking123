const mongoose = require('mongoose');
const { URL } = require('url');

const artistSchema = new mongoose.Schema({
    artistid: {
    type: Number,
    required: true
  },
  
first_name: {
    type: String,
    required: true
  },
  
last_name: {
    type: String,
    required: true
  },
  
  wiki_url: {
    type: URL,
    required: true
  },
  
profile_url: {
    type: URL,
    required: true
  },

  movies: []
});

module.exports = mongoose.model('Artist', artistSchema);
