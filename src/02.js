const crypto = require('crypto');
const secret = new WeakMap();

class Cipher {
  constructor() {
    secret.set(this, { _iv: null, _algorithm: 'aes-256-cbc' });
  }

  encrypt(message, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    secret.get(this)._iv = iv;

    const _algorithm = secret.get(this)._algorithm;
    const _iv = secret.get(this)._iv;

    let cipher = crypto.createCipheriv(_algorithm, key, _iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  }

  decrypt(message, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    let encryptedText = Buffer.from(message, 'hex');

    const _algorithm = secret.get(this)._algorithm;
    const _iv = secret.get(this)._iv;

    try {
      let decipher = crypto.createDecipheriv(_algorithm, key, _iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString();
    } catch (err) {
      return "ERROR: anyone without the right password can't read this message";
    }
  }
}

module.exports = Cipher;
