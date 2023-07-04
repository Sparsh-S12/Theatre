const Show = require('../models/Show');

async function getAllShows(req, res) {
  try {
    const shows = await Show.find();
    res.json(shows);
  } catch (error) {
    res.status(500).json({ message: 'Internal Server Error' });
  }
}

async function addShow(req, res) {
  const { screen, capacity, time } = req.body;

  try {
    const show = await Show.create({ screen, capacity, time });
    res.status(201).json(show);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add the show.' });
  }
}

async function deleteShow(req, res) {
  const showId = req.params.id;

  try {
    const deletedShow = await Show.findByIdAndRemove(showId);
    if (!deletedShow) {
      res.status(404).json({ message: 'Show not found.' });
      return;
    }

    res.sendStatus(204);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to delete the show.' });
  }
}

// module.exports = {
//   deleteShow
// };




module.exports = {
  getAllShows,
  addShow,
  deleteShow
};
