var mongoose = require('mongoose');


var highScore = new mongoose.Schema({
    name: { type: String },
    score: { type: Number },
  });

 

  var highScore = mongoose.model("highScore", highScore)
  
  module.exports = highScore;