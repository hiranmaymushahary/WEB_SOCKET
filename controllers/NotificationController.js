const { io } = require('../config/appConfig');
const { getDriverSocket } = require('../services/driverService');

const notifyDrivers = async (req, res) => {
    try {
        const { rideId, rideInfo, driverIds } = req.body;

        const notificationData = {
            rideId,
            rideInfo,
            timeStamp: new Date().toISOString()
        };

        const notifiedDrivers = [];
        const failedDrivers = [];

        for (const driverId of driverIds) {
            const socketId = await getDriverSocket(driverId);

            if (socketId) {
                io.to(socketId).emit('new-ride-notification', notificationData);
                notifiedDrivers.push(driverId);
            } else {
                failedDrivers.push(driverId);
            }
        }

        const result = {notifiedDrivers , failedDrivers , totalNotified : notifyDrivers.length};
        res.staus(200).send({data : {rideId , ...result} , succes : true , error : null, message : "Succesfully notified drivers"});
        
    } catch (error) {
        res.status(500).send({
            data: null,
            succes: false,
            error: error.message,
            message: "Failed to notify drivers"
        });
    }
};

module.exports = { notifyDrivers };