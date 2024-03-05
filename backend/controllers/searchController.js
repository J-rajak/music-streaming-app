const Artiste = require("../models/Artiste");
const Song = require("../models/Song");
const Album = require("../models/Album");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { shuffleArray } = require("../utils/index");


// GET api/search/searchString
const FindSearchedDataInAllEntries = asyncHandler(async (req, res) => {
    const limit = parseInt(req.query.limit);
    
    // Fetch all entries from the database (artists, genres, and songs)
    const artistes = await Artiste.find({}).limit(limit).lean();
    const genres = await Album.find({}).limit(limit).lean();
    const songs = await Song.find({}).limit(limit).lean();
  
    // Combine entries into a single dataset
    const entries = [
      ...artistes.map(artist => ({ type: 'artist', name: artist.name })),
      ...genres.map(genre => ({ type: 'genre', name: genre.name })),
      ...songs.map(song => ({ type: 'song', name: song.name }))
    ];
  
    // Get the search string from the request query
    const searchQuery = req.query.searchString;
  
    // If there is a search query, filter the dataset based on it
    const filteredEntries = searchQuery
      ? entries.filter(entry => entry.name.toLowerCase().includes(searchQuery.toLowerCase()))
      : entries;
  
    // Shuffle the filtered entries
    const shuffledEntries = shuffleArray(filteredEntries);
  
    // Return the shuffled and filtered dataset
    res.status(200).json(shuffledEntries);
  });
  module.exports = { FindSearchedDataInAllEntries};