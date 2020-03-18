const chai = require('chai');
const expect = chai.expect;

chai.use(require('chai-as-promised'));

const Https = require('../src/05');

describe('05.js', () => {
  const httpsClient = new Https();
  let data = {
    author_id: 43,
    title: 'Lorem ipsum',
    body: '<p><strong>Lorem ipsum</strong> dolor sit amet</p>',
    created_at: new Date().toISOString(),
    tags: ['hello', 'world']
  };
  data = JSON.stringify(data);
  it('should return true if the given url accepts GET method', function() {
    return expect(
      httpsClient.get('https://httpbin.org/get')
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts POST method', function() {
    return expect(
      httpsClient.post('https://httpbin.org/post', data)
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts PUT method', function() {
    return expect(
      httpsClient.put('https://httpbin.org/put', data)
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts PATCH method', function() {
    return expect(
      httpsClient.patch('https://httpbin.org/patch', data)
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts DELETE method', function() {
    return expect(
      httpsClient.delete(
        'https://httpbin.org/delete',
        JSON.stringify({ author_id: 43 })
      )
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts OPTIONS method', function() {
    return expect(
      httpsClient.options('https://httpbin.org')
    ).to.eventually.equal(true);
  });

  it('should return true if the given url accepts HEAD method', function() {
    return expect(httpsClient.head('https://httpbin.org')).to.eventually.equal(
      true
    );
  });
});
