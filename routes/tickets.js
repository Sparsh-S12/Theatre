const express = require('express');
const router = express.Router();
const ticketController = require('../controllers/ticketController');

router.post('/:id/book', ticketController.bookTicket);
router.post('/:id/cancel', ticketController.cancelTicket);

module.exports = router;
