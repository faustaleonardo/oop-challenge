const chai = require('chai');
const expect = chai.expect;

describe('01.js', () => {
  it('should return hash string based on hash algorithm method called', function() {
    const Hash = require('../src/01');
    const hash = new Hash();
    expect(hash.md5('secret')).to.be.equal('5ebe2294ecd0e0f08eab7690d2a6ee69');
    expect(hash.sha1('secret')).to.be.equal(
      'e5e9fa1ba31ecd1ae84f75caaa474f3a663f05f4'
    );
    expect(hash.sha256('secret')).to.be.equal(
      '2bb80d537b1da3e38bd30361aa855686bde0eacd7162fef6a25fe97bf527a25b'
    );
    expect(hash.sha512('secret')).to.be.equal(
      'bd2b1aaf7ef4f09be9f52ce2d8d599674d81aa9d6a4421696dc4d93dd0619d682ce56b4d64a9ef097761ced99e0f67265b5f76085e5b0ee7ca4696b2ad6fe2b2'
    );
  });
});
