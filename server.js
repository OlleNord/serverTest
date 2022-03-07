const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server, {cors: {origin: "*", methods: ["GET", "POST"]}});
const port = process.env.PORT || 3000;
app.use(require("cors")());
app.set("view engine", "ejs");

app.get("/home", (req, res) => {
    res.render("home");
});

server.listen(port, (err, res) => {
    console.log("Server listening on port: " + port);
});

let socket_ids = [];

io.on("connection", (socket) => {
    socket_ids.push(socket.id);
    console.log(socket_ids)
    io.emit("id", JSON.stringify(socket_ids));
    socket.on("clear-all", (id) => {
        socket_ids = [];
        io.emit("id", JSON.stringify(socket_ids));
    });
});