const express = require('express');
const { notifyDrivers } = require('../controllers/notificationController');
const router = express.Router();

router.post('/notify-drivers', notifyDrivers);
//router.post('remove-ride-notification', removeRideNotification);


module.exports = router;