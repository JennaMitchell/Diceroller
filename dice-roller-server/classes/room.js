class Room {
  constructor(
    roomId,
    roomTitle,
    roomIdSocketPath,
    usersInRoom,
    roomEditor,
    rollOutCome,
    animationSettings,
    meshSettings,
    canvasSettings
  ) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.roomIdSocketPath = roomIdSocketPath;
    this.usersInRoom = usersInRoom;
    this.roomEditor = roomEditor;
    this.rollOutCome = rollOutCome;
    this.animationSettings = animationSettings;
    this.meshSettings = meshSettings;
    this.canvasSettings = canvasSettings;
  }

  //// Animation Settings ////

  //   startAnimation: false,

  //animationDirection: "Right",

  ///// Mesh Settings /////

  // meshColor: "#ff0000",
  // meshHoverColor: "#ff9300",
  // meshColorIntensity: 1,
  // textColor: "#ffffff",
  // textColorIntensity: 1,
  // activeMeshType: "D20",
  // scale: 1,
  // activeAnimationType: "",
  // materialType: "Basic",

  ////// Canvas Settings //////

  // canvasBackgroundColor: "#feffff",

  /////////////////////////

  updateValueRolled(newValue) {
    this.rollOutCome = newValue;
  }

  updateStartAnimation(newStartAnimation) {
    const copyOfAnimatedSettings = { ...this.animationSettings };
    copyOfAnimatedSettings.startAnimation = newStartAnimation;
    this.animationSettings = copyOfAnimatedSettings;
  }

  updateAnimationDirection(newDirection) {
    const copyOfAnimatedSettings = { ...this.animationSettings };
    copyOfAnimatedSettings.animationDirection = newDirection;

    this.animationSettings = copyOfAnimatedSettings;
  }

  updateMeshScale(newScale) {
    this.scale = newScale;
  }

  updateMeshTextColorIntensity(meshTextColorIntensity) {
    const copyOfMeshSettings = { ...this.meshSettings };
    copyOfMeshSettings.textColorIntensity = meshTextColorIntensity;
    this.meshSettings = copyOfMeshSettings;
  }

  updateMeshTextColor(meshTextColor) {
    const copyOfMeshSettings = { ...this.meshSettings };
    copyOfMeshSettings.textColor = meshTextColor;
    this.meshSettings = copyOfMeshSettings;
  }

  updateMeshColor(meshColor) {
    const copyOfMeshSettings = { ...this.meshSettings };
    copyOfMeshSettings.meshColor = meshColor;
    this.meshSettings = copyOfMeshSettings;
  }
  updateMeshColorIntensity(meshColorIntensity) {
    const copyOfMeshSettings = { ...this.meshSettings };
    copyOfMeshSettings.meshColorIntensity = meshColorIntensity;
    this.meshSettings = copyOfMeshSettings;
  }

  addNewUsernameToRoom(usernameToAdd) {
    this.usersInRoom.push(usernameToAdd);
  }

  removeUsernameFromRoom(usernameToRemove) {
    let indexToRemove = -1;
    let duplicateIndexes = [];
    let copyOfUsersInRoom = this.usersInRoom.slice();
    for (
      let indexOfUsers = 0;
      indexOfUsers < this.usersInRoom.length;
      indexOfUsers++
    ) {
      const usernameBeingChecked = this.usersInRoom[indexOfUsers];
      if (usernameBeingChecked === usernameToRemove && indexToRemove === -1) {
        indexToRemove = indexOfUsers;
      } else if (
        usernameBeingChecked === usernameToRemove &&
        indexToRemove !== -1
      ) {
        duplicateIndexes.push(indexToRemove);
      }
    }

    if (duplicateIndexes.length === 0 && indexToRemove !== -1) {
      copyOfUsersInRoom.splice(indexToRemove, 1);
      this.usersInRoom = copyOfUsersInRoom;
    } else if (duplicateIndexes.length !== 0 && indexToRemove !== -1) {
      copyOfUsersInRoom.splice(indexToRemove, 1);
      let indexSubtractor = 1;

      for (
        let indexOfMoreThanOneValue = 0;
        indexOfMoreThanOneValue < duplicateIndexes.length;
        indexOfMoreThanOneValue++
      ) {
        const duplicateIndexToBeRemoved =
          duplicateIndexes[indexOfMoreThanOneValue];
        copyOfUsersInRoom.splice(
          duplicateIndexToBeRemoved - indexSubtractor,
          1
        );
        indexSubtractor = indexSubtractor + 1;
      }

      this.usersInRoom = copyOfUsersInRoom;
    }
  }

  updateRoomEditor(username) {
    this.roomEditor = username;
  }
  roomEditorDisconnecting(username) {
    if (this.usersInRoom.length >= 2) {
      // Finding the other user

      let newRoomEditor = "";

      for (
        let indexOfUsersinRoom = 0;
        indexOfUsersinRoom < this.usersInRoom.length;
        indexOfUsersinRoom++
      ) {
        if (this.usersInRoom[indexOfUsersinRoom] !== username) {
          newRoomEditor = this.usersInRoom[indexOfUsersinRoom];
        }
      }

      this.roomEditor = newRoomEditor;
    } else {
      this.roomEditor = "";
    }
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;
