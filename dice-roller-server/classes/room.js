class Room {
  constructor(
    roomId,
    roomTitle,
    roomIdSocketPath,
    usersInRoom,
    userWithDiceEditorPrivilege,
    rollOutCome,
    animationDirection
  ) {
    this.roomId = roomId;
    this.roomTitle = roomTitle;
    this.roomIdSocketPath = roomIdSocketPath;

    this.usersInRoom = usersInRoom;

    this.userWithDiceEditorPrivilege = userWithDiceEditorPrivilege;
    this.rollOutCome = rollOutCome;
    this.animationDirection = animationDirection;
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

    console.log("70");
  }

  addMessage(message) {
    this.history.push(message);
  }

  clearHistory() {
    this.history = [];
  }
}

module.exports = Room;
