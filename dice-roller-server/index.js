const express = require("express");
const app = express();
// require('socket.io') = Server in the docs
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const roomData = require("./data/room-data");
const activeUsernames = require("./data/active-usernames-data");

app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(3001, () => {
  console.log("Server Running");
});

io.on("connect", (socket) => {
  console.log("Hello");

  console.log("connected");
});

const roomChannels = ["/roomOne", "/roomTwo"];

// io = server in the docs
io.of("/").on("connection", (socket) => {
  socket.emit("sendingRoomData", { roomData });
  socket.on("userDisconnecting", (data, callback) => {
    for (let indexOfRooms = 0; indexOfRooms < roomData.length; indexOfRooms++) {
      const roomDataToCheck = roomData[indexOfRooms];

      if (roomDataToCheck.roomEditor === data) {
        /// Check to see if there is anther user in room

        roomDataToCheck.roomEditorDisconnecting(data);
      }
      roomDataToCheck.removeUsernameFromRoom(data);
    }

    activeUsernames.removeUsername(data);

    callback({
      messageType: "Success",
      messageText: "You've been disconnected.",
    });
    console.log(roomData);
    console.log("DISCONNECTED USER");
  });

  socket.on("activeUsernameCheck", (data, callback) => {
    let usernameInUse = false;
    for (
      let indexOfActiveUsername = 0;
      indexOfActiveUsername < activeUsernames.activeUsernames.length;
      indexOfActiveUsername++
    ) {
      if (activeUsernames.activeUsernames[indexOfActiveUsername] === data) {
        usernameInUse = true;
      }
    }

    if (!usernameInUse) {
      activeUsernames.addNewUsername(data);

      callback({
        messageType: "Success",
        messageText: "Your username is active.",
      });
    } else {
      callback({
        messageType: "Error",
        messageText: "Username In Use",
      });
    }
  });

  // socket.on("disconnect", (data) => {});
});

roomChannels.forEach((channelName, index) => {
  io.of(channelName).on("connection", (socket) => {
    socket.on("playerJoining", (data, callback) => {
      // Step 0 Check if User is currently in another room

      // Step 1. Check to see if room has room

      const selectedData = roomData[index];

      if (selectedData.usersInRoom.length < 2) {
        // Step 2. Check if user is curren;y in room data
        if (selectedData.usersInRoom.length !== 0) {
          // Step 3. Add User
          let userInRoomAlready = false;
          for (
            let indexOfUsersInRoom = 0;
            indexOfUsersInRoom < selectedData.usersInRoom.length;
            indexOfUsersInRoom++
          ) {
            const selectedUsername =
              selectedData.usersInRoom[indexOfUsersInRoom];
            if (selectedUsername === data) {
              userInRoomAlready = true;
              break;
            }
          }
          if (!userInRoomAlready) {
            selectedData.addNewUsernameToRoom(data);

            callback({
              messageType: "Success",
              messageText: "You have joined the room",
            });

            io.of(channelName).emit("userJoined", {
              usernameThatJoined: data,
              gameRoomJoined: channelName,
              isFirstUser: false,
            });
            /// We DON'T HAVE ANY ROOMS SO WE JUST EMIT TO THE ENTIRE CHANNEL
            // IF YOU HAD ROOMS IN THIS CHANNEL YOU'D FIRST NEED TO JOIN IT ON CONNECT
            // THEN do io.of("channelname").to("RoomName").emit("whatever")
          } else {
            callback({
              messageType: "Error",
              messageText: "You are already in this room",
            });
          }
        } else {
          //"User Name Added NO ONE IN ROOM"
          selectedData.addNewUsernameToRoom(data);
          selectedData.updateRoomEditor(data);
          callback({
            messageType: "Success",
            messageText: "You have joined the room",
          });

          io.of(channelName).emit("userJoined", {
            usernameThatJoined: data,
            gameRoomJoined: channelName,
            isFirstUser: true,
          });
        }
      } else {
        // Emit Room Full Message

        callback({
          messageType: "Error",
          messageText: "Room Full",
        });
      }
    });

    socket.on("numberOfUsersRequest", (callback) => {
      const selectedData = roomData[index];

      callback(selectedData.usersInRoom.length);
    });

    socket.on("updateRoomEditor", (data, callback) => {
      const selectedData = roomData[index];
      selectedData.updateRoomEditor(data);

      io.of(channelName).emit("updatedRoomEditor", {
        newEditorUsername: data,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `${data} is now the Room Editor`,
      });
    });

    socket.on("listOfUsersInRoomRequest", (callback) => {
      callback(roomData[index].usersInRoom);
    });
  });
});
