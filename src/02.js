const crypto = require('crypto');

class Cipher {
  constructor() {
    this.algorithm = 'aes-256-cbc';
    this.iv = '';
  }

  encrypt(message, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    const iv = crypto.randomBytes(16);

    this.iv = iv;

    let cipher = crypto.createCipheriv(this.algorithm, key, this.iv);
    let encrypted = cipher.update(message);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return encrypted.toString('hex');
  }

  decrypt(message, password) {
    const key = crypto.scryptSync(password, 'salt', 32);
    let encryptedText = Buffer.from(message, 'hex');

    try {
      let decipher = crypto.createDecipheriv(this.algorithm, key, this.iv);
      let decrypted = decipher.update(encryptedText);
      decrypted = Buffer.concat([decrypted, decipher.final()]);

      return decrypted.toString();
    } catch (err) {
      return "ERROR: anyone without the right password can't read this message";
    }
  }
}

module.exports = Cipher;
