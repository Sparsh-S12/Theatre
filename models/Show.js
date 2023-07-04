const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
  screen: { type: Number, required: true },
  capacity: { type: Number, required: true },
  time: { type: String, required: true },
  bookedSeats: [{ type: String }]
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
