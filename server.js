const {app , server , io} = require('./config/appConfig');

const notificationRoutes = require('./routes/notificationRoutes');

const setDriverSocket = require('./services/driverService');
// Import a service function to remove/clear the driver socket mapping when disconnected
const { removeDriverSocket } = require('./services/driverService'); 

const express = require('express');

app.use('/api' , notificationRoutes);

app.use(express.static('.'));

io.on('connection' , (socket) => {
    console.log('New connection: ' , socket.id);

    // Handle driver log in
    socket.on('driver-login' , async(data) =>{
         try {
            const {driverId} = data;
            await setDriverSocket(driverId , socket.id);
            // Optionally attach driverId to the socket instance for easy cleanup on disconnect
            socket.driverId = driverId;

            socket.emit('login-succesfull',{
                message : 'succesfully-connected',
                driverId
            })

         } catch (error) {
            socket.emit('login-Unsuccesfull',{
                message : 'Unable to connect'})
            
         }
    })

    // Handle disconnection 
    socket.on('disconnect', async (reason) => {
        console.log(`Driver disconnected: ${socket.id}, Reason: ${reason}`);

        try {
            // Clean up driver mapping if driverId was stored on socket connection
            if (socket.driverId) {
                await removeDriverSocket(socket.driverId);
                console.log(`Cleaned up socket session for Driver ID: ${socket.driverId}`);
            }
        } catch (error) {
            console.error('Error during driver disconnect cleanup:', error);
        }
    });
})

const PORT = process.env.PORT || 3001 ;

server.listen(PORT , () => {
    console.log(`Websocket server running on port ${PORT}`);
})