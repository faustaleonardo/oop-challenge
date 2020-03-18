const secret = new WeakMap();

const users = [
  {
    id: 1,
    username: 'jack',
    password: 'secret',
    age: 23,
    lastLogin: 1584249960328
  },
  {
    id: 2,
    username: 'bill',
    password: 'secret',
    age: 25,
    lastLogin: 1584246411359
  }
];

class Auth {
  constructor() {
    secret.set(this, {
      _loggedInUser: null,
      newLoginTime: null
    });
  }

  login({ username, password }) {
    const user = this.validate({ username, password });

    if (user) {
      secret.get(this)._loggedInUser = {
        id: user.id,
        username: user.username,
        age: user.age,
        lastLogin: user.lastLogin
      };
      secret.get(this).newLoginTime = Date.now();
      return true;
    } else {
      return false;
    }
  }

  validate({ username, password }) {
    const user = users.find(user => user.username === username);
    if (user && user.password === password) {
      return user;
    } else {
      return false;
    }
  }

  logout() {
    const { username } = secret.get(this)._loggedInUser;

    const user = users.find(user => user.username === username);
    user.lastLogin = secret.get(this).newLoginTime;

    secret.get(this)._loggedInUser = null;
    return secret.get(this)._loggedInUser;
  }

  user() {
    const { id, username, age, lastLogin } = secret.get(this)._loggedInUser;
    return {
      id,
      username,
      age,
      lastLogin: new Date(lastLogin).toLocaleString()
    };
  }

  id() {
    const loggedInUser = secret.get(this)._loggedInUser;
    if (loggedInUser) return loggedInUser.id;
    else return null;
  }

  check() {
    return secret.get(this)._loggedInUser !== null;
  }

  guest() {
    return secret.get(this)._loggedInUser === null;
  }

  lastLogin() {
    const loggedInUser = secret.get(this)._loggedInUser;
    if (loggedInUser) return new Date(loggedInUser.lastLogin).toLocaleString();
    else return null;
  }
}

module.exports = Auth;
