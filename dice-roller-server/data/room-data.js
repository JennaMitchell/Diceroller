const RoomInstance = require("../classes/room");

// roomId,
// roomTitle,
// roomIdSocketPath,
// activeUsernames,
// userWithDiceEditorPrivilege,
// rollOutCome,
// animationDirection

const roomOne = new RoomInstance(
  "roomOne",
  "Room One",
  "/roomOne",
  [],
  "",
  0,
  "",
  "right"
);
const roomTwo = new RoomInstance(
  "roomTwo",
  "Roon Two",
  "/roomTwo",
  [],
  "",
  0,
  "",
  "right"
);

const rooms = [roomOne, roomTwo];

module.exports = rooms;
