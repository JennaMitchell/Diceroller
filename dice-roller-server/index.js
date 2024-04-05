const express = require("express");
const app = express();
// require('socket.io') = Server in the docs
const { Server } = require("socket.io");
const http = require("http");
const cors = require("cors");
const roomData = require("./data/room-data");
const activeUsernames = require("./data/active-usernames-data");
const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
const httpServer = http.createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: process.env.ORIGIN_URL,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

httpServer.listen(process.env.LISTENING_PORT, () => {});

io.on("connect", (socket) => {});

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

    socket.on("updateMeshColor", (color, callback) => {
      const selectedData = roomData[index];
      selectedData.updateMeshColor(color);
      io.of(channelName).emit("updatedMeshColor", {
        newMeshColor: color,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Dice color updated`,
      });
    });

    socket.on("updateMeshColorIntensity", (intensity, callback) => {
      const selectedData = roomData[index];
      selectedData.updateMeshColorIntensity(intensity);

      io.of(channelName).emit("updatedMeshColorIntensity", {
        newMeshColorIntensity: intensity,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Dice color updated`,
      });
    });

    socket.on("updateMeshTextColor", (color, callback) => {
      const selectedData = roomData[index];
      selectedData.updateMeshTextColor(color);

      io.of(channelName).emit("updatedMeshTextColor", {
        newMeshTextColor: color,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Text color updated`,
      });
    });

    socket.on("updateMeshTextColorIntensity", (intensity, callback) => {
      const selectedData = roomData[index];
      selectedData.updateMeshTextColorIntensity(intensity);

      io.of(channelName).emit("updatedMeshTextColorIntensity", {
        newMeshTextColorIntensity: intensity,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Text color intensity updated.`,
      });
    });

    socket.on("updateMeshScale", (scale, callback) => {
      const selectedData = roomData[index];
      selectedData.updateMeshScale(scale);

      io.of(channelName).emit("updatedMeshScale", {
        newMeshScale: scale,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Mesh scale updated`,
      });
    });

    socket.on("updateAnimationDirection", (direction, callback) => {
      const selectedData = roomData[index];
      selectedData.updateAnimationDirection(direction);

      io.of(channelName).emit("updatedAnimationDirection", {
        newAnimationDirection: direction,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Animation direction updated`,
      });
    });

    socket.on("dieRolled", (values, callback) => {
      const selectedData = roomData[index];

      selectedData.updateStartAnimation(values.newAnimationStart);
      selectedData.updateValueRolled(values.newValueRolled);

      io.of(channelName).emit("newDieRolled", {
        newStartAnimation: values.newAnimationStart,
        newValueRolled: values.newValueRolled,
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Animation Started`,
      });
    });

    socket.on("resetDieRoll", (values, callback) => {
      const selectedData = roomData[index];
      selectedData.updateStartAnimation(values.newAnimationStart);
      selectedData.updateValueRolled(values.newValueRolled);

      io.of(channelName).emit("dieRollReset", {
        room: channelName,
      });

      callback({
        messageType: "Success",
        messageText: `Die Roll Reset`,
      });
    });
  });
});
