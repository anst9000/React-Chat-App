var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("chat message", (msg) => {
    console.log("message", JSON.stringify(msg));
    io.emit("chat message", msg);
  });
});

const port = 3001;
http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
