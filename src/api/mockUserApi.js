import delay from './delay';

// This file mocks a web API by working with the hard-coded data below.
// It uses setTimeout to simulate the delay of an AJAX call.
// All calls return promises.

const users = [
  {
    username: "user-ok",
    password: "user-ok",
    response: {
      loggedin: true,
      username: "user-ok"
    }
  }
];

function loginCheck(user) {
  const userIndex = users.findIndex(a => a.username == user.username && a.password == user.password);

  if (userIndex !== -1) {
    return users[userIndex].response;
  } else if (users.findIndex(a => a.username == user.username) !== -1) {
    return `Wrong password`;
  } else {
    return `No such user`;
  }
}

class UserApi {
  static login(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side check
        const response = loginCheck(user);

        if (typeof(response) === "object" && response.loggedin === true) {
          resolve(response);
        } else {
          reject(response);
        }

      }, delay);
    });
  }

  static register(user) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulate server-side validation
        const minUsernameLength = 3;
        const minPassLength = 6;
        if (user.username.length < minUsernameLength) {
          reject(`Username must be at least ${minUsernameLength} characters.`);
        }

        if (users.findIndex(a => a.username == user.username) !== -1) {
          reject(`User with this Username already exists.`);
        }

        if (user.password.length < minPassLength) {
          reject(`Password must be at least ${minPassLength} characters.`);
        }
        if (user.username === user.password) {
          reject(`Username and Password should not be equal.`);
        }

        const response = {
          loggedin: true,
          username: user.username
        };

        let newUser = {};
        newUser.username = user.username;
        newUser.password = user.password;
        newUser.response = response;

        users.push(newUser);

        resolve(response);
      }, delay);
    });
  }
}

export default UserApi;
