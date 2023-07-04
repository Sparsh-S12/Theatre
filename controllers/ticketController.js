const Show = require('../models/Show');
const Ticket = require('../models/Ticket');

async function bookTicket(req, res) {
  const showId = req.params.id;
  const seatNumber = req.body.seatNumber;

  try {
    const show = await Show.findById(showId);
    if (!show) {
      res.status(404).json({ message: 'Show not found.' });
      return;
    }

    if (show.bookedSeats.includes(seatNumber)) {
      res.status(400).json({ message: 'Seat already booked.' });
      return;
    }

    if (show.bookedSeats.length >= show.capacity) {
      const nextShows = await generateRecommendations(show);
      if (nextShows.length > 0) {
        res.status(400).json({ message: 'All seats are booked. Next available shows:', nextShows });
      } else {
        res.status(404).json({ message: 'All seats are booked. No next available shows.' });
      }
      return;
    }

    const ticket = await Ticket.create({ show: showId, seatNumber });
    show.bookedSeats.push(seatNumber);
    await show.save();
    res.status(201).json(ticket);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function cancelTicket(req, res) {
  const showId = req.params.id;
  const seatNumber = req.body.seatNumber;

  try {
    const show = await Show.findById(showId);
    if (!show) {
      res.status(404).json({ message: 'Show not found.' });
      return;
    }

    if (!show.bookedSeats.includes(seatNumber)) {
      res.status(400).json({ message: 'Seat is not booked.' });
      return;
    }

    show.bookedSeats = show.bookedSeats.filter((seat) => seat !== seatNumber);
    await show.save();
    res.json({ message: 'Ticket canceled successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function generateRecommendations(currentShow) {
  try {
    const currentShowTime = currentShow.time;
    const availableShows = await Show.find({
      _id: { $ne: currentShow._id },
      capacity: { $gt: currentShow.bookedSeats.length },
      time: { $gt: currentShowTime }
    }).sort({ time: 1 }).limit(3);

    return availableShows;
  } catch (error) {
    return [];
  }
}

module.exports = {
  bookTicket,
  cancelTicket
};

