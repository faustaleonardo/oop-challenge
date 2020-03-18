const crypto = require('crypto');

class Hash {
  md5(str) {
    return crypto
      .createHash('md5')
      .update(str)
      .digest('hex');
  }

  sha1(str) {
    return crypto
      .createHash('sha1')
      .update(str)
      .digest('hex');
  }

  sha256(str) {
    return crypto
      .createHash('sha256')
      .update(str)
      .digest('hex');
  }

  sha512(str) {
    return crypto
      .createHash('sha512')
      .update(str)
      .digest('hex');
  }
}

module.exports = Hash;
