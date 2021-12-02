var express = require('express')

var cors = require('cors')

var app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(cors())

app.options('*', cors()) // include before other routes

const server = require('http').createServer(app);

const user = require('./data');

const totalUsers = user.getUser();
const projects = user.getProjects();
const interviews = user.getInterviews();
const scheduledInterviews = user.getScheduledInterviews();

app.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(email, password);
    const foundUser = totalUsers.filter(user => user.email === email && user.password === password);
    if (foundUser.length > 0) {
        res.status(200).json(foundUser);
    } else {
        res.status(401).json({ message: "Invalid username or password" })
    }
})

app.post("/project", (req, res) => {
    const email = req.body.email;
    const title = req.body.title;
    const date = new Date();
    const createdAt = date.getDate() + " December 2021";
    if (!email || !title) {
        res.json({ message: "Email && Title are required" })
    }
    projects.push({ email, createdAt, title });
    res.json({ message: "Project Saved successfully" })
})

app.put("/project", (req, res) => {
    const email = req.body.email;
    const title = req.body.title;
    const html = req.body.html;
    const css = req.body.css;
    const javascript = req.body.javascript;
    projects.forEach(project => {
        if (project.title === title && project.email === email) {
            project.html = html;
            project.css = css;
            project.javascript = javascript
        }
    })
    res.send("Project not Found")

})

app.get("/interviews/:email/:role", (req, res) => {
    const email = req.params.email;
    const role = req.params.role;
    console.log(email, role, "email role");
    interviews.forEach(interview => {
        if (interview.interviewee === email && interview.role === role) {
            res.send(interview);
        }
    })
    res.json({ message: "No data found" })
})

app.get("/projects/:email", (req, res) => {
    const email = req.params.email;
    const personalProjects = [];
    projects.forEach(project => {
        if (project.email === email) {
            personalProjects.push(project)
        }
    })
    res.send(personalProjects);
})

app.get("/project/:email/:title", (req, res) => {
    const email = req.params.email
    const title = req.params.title
    projects.forEach(project => {
        if (project.title === title && project.email === email) {
            res.json(project)
        }
    })
    res.send("Not Found")
})

app.get("/scheduledInterviews/:email", (req, res) => {
    const email = req.params.email;
    scheduledInterviews.forEach(interviews => {
        if (interviews.email === email) {
            res.send(interviews)
        }
    })
    res.send("No Scheduled Interviews");
})

app.post("/schedule-interview", (req, res) => {
    const email = req.body.email;
    const candidateEmail = req.body.candidateEmail;
    const datetime = req.body.datetime;
    console.log({ email: email, candidateEmail: candidateEmail, datetime })
    scheduledInterviews.forEach(interviews => {
        if (interviews.email === email) {
            interviews.allInterviews.push({ candidateEmail, datetime });
            console.log("si >>>> ", scheduledInterviews)
            res.send("Invitation Send && Meeting Scheduled")
        }
    })
    scheduledInterviews.push({ email, allInterviews: [{ candidateEmail, datetime }] });
    console.log("si >>>> ", scheduledInterviews)
    res.send("Invitation Send && Meeting Scheduled")
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
