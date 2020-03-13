const chai = require('chai');
const expect = chai.expect;

describe('02.js', () => {
  const Cipher = require('../src/02');
  const cipher = new Cipher();
  it('should read the message if the password matches', function() {
    const message = cipher.encrypt('Ini tulisan rahasia', 'p4$$w0rd');
    expect(cipher.decrypt(message, 'p4$$w0rd')).to.be.equal(
      'Ini tulisan rahasia'
    );
  });
});
