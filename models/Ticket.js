const mongoose = require('mongoose');

const ticketSchema = new mongoose.Schema({
  show: { type: mongoose.Schema.Types.ObjectId, ref: 'Show' },
  seatNumber: { type: String, required: true }
});

const Ticket = mongoose.model('Ticket', ticketSchema);

module.exports = Ticket;
