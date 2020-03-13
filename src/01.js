const crypto = require('./utils/crypto');

class Hash {
  md5(str) {
    return crypto.createHash('md5', str);
  }

  sha1(str) {
    return crypto.createHash('sha1', str);
  }

  sha256(str) {
    return crypto.createHash('sha256', str);
  }

  sha512(str) {
    return crypto.createHash('sha512', str);
  }
}

module.exports = Hash;
