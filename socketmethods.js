const setup = (socketio) => {
    socketio.on("connection", socket => {
        const {token_base,sala} = socket.handshake.headers;
        if (!token_base || !sala) socket.disconnect();

        const room = token_base+':'+sala;
        socket.join(room);
        socket.on("message", (message) => {
            socketio.to(room).emit("message",message);
            console.log(message,room);
        });

        socket.on("actions", (data) => {
            socketio.to(room).emit(data.action,data);
        });

        socket.on("global",(data)=>{
            socketio.emit(data.action,data)
        });

        socket.on("disconnect", () => console.log("desconectado"));
    });
}

module.exports = {
    setup
};