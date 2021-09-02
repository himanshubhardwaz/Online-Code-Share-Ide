const app = require('express')();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: {
        origin: "*",
    }
});

io.on('connection', (socket) => {
    console.log("socket id", socket.id);
    console.log("socket is active to be connected");

    socket.on('updateCode', (payload, roomId) => {
        socket.to(roomId).emit('updateCode', payload);
    })

    socket.on('join-room', (roomId) => {
        console.log("room id", roomId);
        try {
            console.log('[socket]', 'join room :', roomId)
            socket.join(roomId);
            socket.to(roomId).emit('user joined', socket.id);
        } catch (e) {
            console.log('[error]', 'join room :', e);
            socket.emit('error', 'couldnt perform requested action');
        }
    })

    socket.on('leave-room', (roomId) => {
        try {
            console.log('[socket]', 'leave room :', roomId);
            socket.leave(roomId, function (err) {
                if (err) throw err;
                else {
                    console.log('user left room')
                }
            });
            socket.to(roomId).emit('user-left', socket.id);
        } catch (e) {
            console.log('[error]', 'leave room :', e);
            socket.emit('error', 'couldnt perform requested action');
        }
    })
})

server.listen(5000, () => {
    console.log("listening on  port 5000...")
})
