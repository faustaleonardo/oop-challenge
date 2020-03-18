const chai = require('chai');
const expect = chai.expect;

const Cipher = require('../src/02');

describe('02.js', () => {
  it('should read the message if the password matches', function() {
    const cipher = new Cipher();
    const message = cipher.encrypt('Ini tulisan rahasia', 'p4$$w0rd');
    expect(cipher.decrypt(message, 'p4$$w0rd')).to.be.equal(
      'Ini tulisan rahasia'
    );
  });
});
