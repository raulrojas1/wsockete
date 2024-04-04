const express = require("express");
const http = require("http");
var app = express();

const server = http.createServer(app);
const socketio = require("socket.io")(server,{
    cors: {
        // origins: '*',
        origins: ['http://*'],
        allowedHeaders: ['sala','token_base']
    }
});
app.use(express.json());
app.post("/emit", (req, res) => {
    console.log(req);
    const { event, data } = req.body;
    if (!event || !data){
        console.log("ERROR AL RECIBIR PARAMETROS");
        return res.status(400).json({ error: "Missing event or data" });
    }
    const { token_base, sala } = req.headers;
    const room = token_base + ':' + sala;
    socketio.to(room).emit(event, data);
    res.status(200).json({ status: "success" });
});
const socketEvents = require("./socketmethods");
socketEvents.setup(socketio);
server.listen(4000,()=>{
    console.log('Escucha on port 4000');
});