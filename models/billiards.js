const mongoose = require('mongoose');

const billiardSchema = new mongoose.Schema({
    name: String,
    description: String,
    img: String,
  });


const  Billiard = mongoose.model('Billiard', billiardSchema);

module.exports = Billiard;
