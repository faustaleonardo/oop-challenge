const crypto = require('crypto');

exports.createHash = (algorithm, str) => {
  return crypto
    .createHash(algorithm)
    .update(str)
    .digest('hex');
};

exports.