var express = require('express')

var cors = require('cors')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.options('*', cors()) // include before other routes

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next();
});

const server = require('http').createServer(app);

const user = require('./data');

const totalUsers = user.getUser();

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const foundUser = totalUsers.filter(user => user.email === email && user.password === password);
    if (foundUser.length > 0) {
        res.json(foundUser);
    } else {
        res.json('Invalid email or password');
    }
})

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
        var room = io.sockets.adapter.rooms.get(roomId)
        console.log("room >>>>>>>> ", room);
        let arr = [];
        for (var r in room) {
            arr.push(r);
            if (arr.length >= 2) break;
        }
        if (arr.length >= 2) {
            socket.emit("room-full")
        }
        else {
            try {

                console.log('[socket]', 'join room :', roomId)
                socket.join(roomId);
                socket.to(roomId).emit('user joined', socket.id);
            } catch (e) {
                console.log('[error]', 'join room :', e);
                socket.emit('error', 'couldnt perform requested action');
            }
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

server.listen(8000, () => {
    console.log("listening on  port 8000...")
})
