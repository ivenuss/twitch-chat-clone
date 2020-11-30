const express = require("express");
const app = express();

const http = require("http").createServer(app);
const io = require("socket.io")(http, {
  cors: {
    origin: "http://venus.fakaheda.eu", //nesmí končit "/"
    credentials: true,
    methods: ["GET", "POST"],
  },
});

const port = process.env.PORT || 4000;

io.on("connection", (socket) => {
  socket.on("message", ({ time, name, message, color }) => {
    io.emit("message", { time, name, message, color });
  });
});

/* app.get("/", (req, res) => {
  res.send("Hello Worlds!");
});
 */
http.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
