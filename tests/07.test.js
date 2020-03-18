const chai = require('chai');
const expect = chai.expect;

const Validator = require('../src/07');

describe('07.js', () => {
  const data = {
    username: 'mul14',
    email: 'email@example.com',
    name: 'Mulia',
    zip: 75324,
    is_admin: true,
    age: 28
  };

  const rules = {
    username: 'required|alphanum',
    email: 'required|email',
    name: 'required',
    zip: 'required|numeric',
    is_admin: 'boolean',
    age: 'numeric|min:21'
  };

  const message = {
    required: 'The %s field is required.',
    age: 'The %s field must a number.'
  };
  const validator = new Validator(data, rules, message);

  it('should return true if there is invalid field', function() {
    expect(validator.fails()).to.be.equal(false);
  });

  it('should return true if all data valid', function() {
    expect(validator.passes()).to.be.equal(true);
  });

  it('should return true if all data valid', function() {
    expect(validator.errors()).to.be.eql({});
  });
});
