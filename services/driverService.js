const redisClient = require('../utils/redisClient');


const setDriverSocket = async (driverId, socketId) => {
    try {
       await redisClient.hset('driver_sockets', driverId, socketId);
    } catch (error) {
        console.log('Error setting driver socket: ', error);
        throw error;
    }
}

const getDriverSocket = async (driverId) => {
    try {
        const socketId = await redisClient.hget('driver_sockets', driverId);
        return socketId;
    } catch (error) {
        console.log('Error getting driver socket: ', error);
        throw error;
    }
}

const removeDriverSocket = async (driverId) => {
    try {
        await redisClient.hdel('driver_sockets', driverId);
    } catch (error) {
        console.log('Error removing driver socket: ', error);
        throw error;
    }
}
module.exports = {
    setDriverSocket,
    getDriverSocket,
    removeDriverSocket
}