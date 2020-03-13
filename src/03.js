const fs = require('fs');
const { promisify } = require('util');

// CONTINUE TOMORROW
class Log {
  constructor() {
    this.message = '';
    this.fileName = 'app.log';
  }
  async info() {
    this.message = 'INFO: This is an information about something';
    await this._writeFile();
    return this.message;
  }
  async error() {
    this.message = "ERROR: We can't divide any numbers by zero.";
    await this._writeFile();
    return this.message;
  }
  async notice() {
    this.message = 'NOTICE: Someone loves your status.';
    await this._writeFile();
    return this.message;
  }
  async warning() {
    this.message = 'WARNING: Insufficient funds.';
    await this._writeFile();
    return this.message;
  }
  async debug() {
    this.message = 'DEBUG: This is debug message.';
    await this._writeFile();
    return this.message;
  }
  async alert() {
    this.message = 'ALERT: Achtung! Achtung!';
    await this._writeFile();
    return this.message;
  }
  async critical() {
    this.message = "CRITICAL: Medic!! We've got critical damages.";
    await this._writeFile();
    return this.message;
  }
  async emergency() {
    this.message =
      'EMERGENCY: System hung. Contact system administrator immediately!';
    await this._writeFile();
    return this.message;
  }
  async _writeFile() {
    const message = `${new Date().toISOString()} ${this.message}\n`;
    if (!fs.existsSync(`./${this.fileName}`))
      return await promisify(fs.writeFile)(this.fileName, message);

    const existingMessage = await promisify(fs.readFile)(this.fileName, 'utf8');
    const content = existingMessage.concat(message);

    return await promisify(fs.writeFile)(this.fileName, content);
  }
}

const log = new Log();
log._writeFile();
