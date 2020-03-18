const secret = new WeakMap();
const Datastore = require('nedb');

class ConfigFileStorage {
  constructor(fileName) {
    return require(`../${fileName}`);
  }
}

class ConfigNedb {
  constructor(fileName) {
    const database = new Datastore(fileName);
    database.loadDatabase();
    return database;
  }
}

class ConfigMysql {
  constructor(obj) {
    return obj;
  }
}

class Config {
  constructor(objConfig) {
    secret.set(this, { _objConfig: { ...objConfig } });
  }
  put(key, value) {
    secret.get(this)._objConfig[key] = value;
  }
  get(key) {
    return secret.get(this)._objConfig[key];
  }
  remove(key) {
    secret.get(this)._objConfig[key] = null;
  }
}

exports.ConfigFileStorage = ConfigFileStorage;
exports.ConfigNedb = ConfigNedb;
exports.ConfigMysql = ConfigMysql;
exports.Config = Config;
