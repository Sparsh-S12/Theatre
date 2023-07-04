const express = require('express');
const router = express.Router();
const showController = require('../controllers/showController');

router.get('/', showController.getAllShows);
router.post('/', showController.addShow);
router.delete('/:id', showController.deleteShow);

module.exports = router;
