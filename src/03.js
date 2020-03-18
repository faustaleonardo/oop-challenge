const fs = require('fs');
const secret = new WeakMap();

class Log {
  constructor() {
    secret.set(this, { _fileName: 'app.log' });
  }
  info(message) {
    const newMessage = `INFO: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  error(message) {
    const newMessage = `ERROR: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  notice(message) {
    const newMessage = `NOTICE: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  warning(message) {
    const newMessage = `WARNING: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  debug(message) {
    const newMessage = `DEBUG: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  alert(message) {
    const newMessage = `ALERT: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  critical(message) {
    const newMessage = `CRITICAL: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  emergency(message) {
    const newMessage = `EMERGENCY: ${message}`;
    this._writeFile(newMessage);
    return newMessage;
  }
  _writeFile(message) {
    const _fileName = secret.get(this)._fileName;

    const newMessage = `${new Date().toISOString()} ${message}\n`;
    if (!fs.existsSync(_fileName)) {
      return fs.writeFileSync(_fileName, newMessage);
    }

    const existingMessage = fs.readFileSync(`./${_fileName}`, 'utf8');
    const content = existingMessage.concat(newMessage);

    return fs.writeFileSync(_fileName, content);
  }
}

module.exports = Log;
