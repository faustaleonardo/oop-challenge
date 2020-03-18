const chai = require('chai');
const expect = chai.expect;

const Auth = require('../src/06');

describe('06.js', () => {
  const auth = new Auth();
  it('should return true if the credentials are valid', function() {
    const credentials = { username: 'jack', password: 'secret' };
    expect(auth.login(credentials)).to.be.equal(true);
  });

  it('should return the user object if the credentials are valid', function() {
    const credentials = { username: 'jack', password: 'secret' };
    expect(auth.validate(credentials)).to.be.eql({
      id: 1,
      username: 'jack',
      password: 'secret',
      age: 23,
      lastLogin: 1584249960328
    });
  });

  it('should return the current user object', function() {
    expect(auth.user()).to.be.eql({
      id: 1,
      username: 'jack',
      age: 23,
      lastLogin: new Date(1584249960328).toLocaleString()
    });
  });

  it('should return the current user id', function() {
    expect(auth.id()).to.be.equal(1);
  });

  it('should return true if the user is logged in', function() {
    expect(auth.check()).to.be.equal(true);
  });

  it('should log out the current user', function() {
    expect(auth.logout()).to.be.equal(null);
  });

  it('should return true if the user is not logged in', function() {
    expect(auth.guest()).to.be.equal(true);
  });

  it('should return information when the user last logged in', function() {
    const credentials = { username: 'bill', password: 'secret' };
    auth.login(credentials);
    expect(auth.lastLogin()).to.be.equal(
      new Date(1584246411359).toLocaleString()
    );
  });
});
