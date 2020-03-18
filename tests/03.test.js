const chai = require('chai');
const expect = chai.expect;

const Log = require('../src/03');

describe('03.js', () => {
  it('should return the log message along with the severity levels', function() {
    const log = new Log();
    let message = log.info('This is an information about something.');
    expect(message).to.equal('INFO: This is an information about something.');

    message = log.error("We can't divide any numbers by zero.");
    expect(message).to.equal("ERROR: We can't divide any numbers by zero.");

    message = log.notice('Someone loves your status.');
    expect(message).to.equal('NOTICE: Someone loves your status.');

    message = log.warning('Insufficient funds.');
    expect(message).to.equal('WARNING: Insufficient funds.');

    message = log.debug('This is debug message.');
    expect(message).to.equal('DEBUG: This is debug message.');

    message = log.alert('Achtung! Achtung!');
    expect(message).to.equal('ALERT: Achtung! Achtung!');

    message = log.critical("Medic!! We've got critical damages.");
    expect(message).to.equal("CRITICAL: Medic!! We've got critical damages.");

    message = log.emergency(
      'System hung. Contact system administrator immediately!'
    );
    expect(message).to.equal(
      'EMERGENCY: System hung. Contact system administrator immediately!'
    );
  });
});
