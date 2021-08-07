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
    socket.on('updateCode', (payload) => {
        // console.log("payload", payload);
        socket.broadcast.emit('updateCode', payload);
    })
})

server.listen(5000, () => {
    console.log("listening on  port 5000...")
})
