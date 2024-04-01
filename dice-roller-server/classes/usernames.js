class ActiveUsernames {
  constructor(activeUsernames) {
    this.activeUsernames = activeUsernames;
  }

  addNewUsername(usernameToAdd) {
    const copyOfActiveUsernames = this.activeUsernames.slice();
    copyOfActiveUsernames.push(usernameToAdd);
    this.activeUsernames = copyOfActiveUsernames;
  }

  removeUsername(usernameToRemove) {
    const copyOfActiveUsernames = this.activeUsernames.slice();
    let indexOfUsernameToRemove = -1;

    for (
      let indexOfActiveUsernames = 0;
      indexOfActiveUsernames < copyOfActiveUsernames.length;
      indexOfActiveUsernames++
    ) {
      if (usernameToRemove === copyOfActiveUsernames[indexOfActiveUsernames]) {
        indexOfUsernameToRemove = indexOfActiveUsernames;
      }
    }
    if (indexOfUsernameToRemove !== -1) {
      copyOfActiveUsernames.splice(indexOfUsernameToRemove, 1);
      this.activeUsernames = copyOfActiveUsernames;
    }
  }
}

module.exports = ActiveUsernames;
