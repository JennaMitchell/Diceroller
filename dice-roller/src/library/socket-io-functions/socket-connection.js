import { io } from "socket.io-client";

export const nameSpaceListener = {};

export const listeners = {
  leaveRoom: [],
  userJoined: [],
};
// listerner object is created to maek sure that the required lsiterneers are added and only added oncle

// const addListener = (roomIndex) => {
//   if (!listeners.change[roomIndex]) {
//     nameSpaceSockets[roomIndex].on("changeName", (data) => {
//       console.log("Event Listener Added");
//       console.log(data);
//     });
//     listeners.change[roomIndex] = true;
//   }
// };
const socket = io("http://localhost:3001", {
  withCredentials: true,
  //   extraHeaders: {
  //     "my-custom-header": "abcd"
  //   }
});

socket.on("connect", (data) => {
  console.log("SERVER CONNECTED");
});

// is specfic to the initaillization of a socket server

export default socket;