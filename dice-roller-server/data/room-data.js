const RoomInstance = require("../classes/room");

//// Animation Settings ////

//   startAnimation: false,
// animationDirection: "Right",

///// Mesh Settings ////

// meshColor: "#ff0000",
// meshHoverColor: "#ff9300",
// meshColorIntensity: 1,
// textColor: "#ffffff",
// textColorIntensity: 1,
// activeMeshType: "D20",
// scale: 1,
// activeAnimationType: "",
// materialType: "Basic",

///  Canvas Settings ////
//   canvasBackgroundColor: "#feffff",
/////////////////////////

const roomOne = new RoomInstance(
  "roomOne",
  "Room One",
  "/roomOne",
  [],
  "",
  0,
  "",
  { startAnimation: false, animationDirection: "Right" },
  {
    meshColor: "#ff0000",
    meshHoverColor: "#ff9300",
    meshColorIntensity: 1,
    textColor: "#ffffff",
    textColorIntensity: 1,
    activeMeshType: "D20",
    scale: 1,
    activeAnimationType: "",
    materialType: "Basic",
  },
  { canvasBackgroundColor: "#feffff" }
);
const roomTwo = new RoomInstance(
  "roomTwo",
  "Roon Two",
  "/roomTwo",
  [],
  "",
  0,
  "",
  { startAnimation: false, animationDirection: "Right" },
  {
    meshColor: "#ff0000",
    meshHoverColor: "#ff9300",
    meshColorIntensity: 1,
    textColor: "#ffffff",
    textColorIntensity: 1,
    activeMeshType: "D20",
    scale: 1,
    activeAnimationType: "",
    materialType: "Basic",
  },
  { canvasBackgroundColor: "#feffff" }
);

const rooms = [roomOne, roomTwo];

module.exports = rooms;
