const chai = require('chai');
const expect = chai.expect;

const {
  ConfigFileStorage,
  ConfigNedb,
  ConfigMysql,
  Config
} = require('../src/04');

describe('04.js', () => {
  it('should change the implementation of config storage (JSON)', function() {
    const config = new Config(new ConfigFileStorage('config.json'));
    config.put('site_name', 'Blog');
    expect(config.get('site_name')).to.be.equal('Blog');
    config.put('site_name', 'Perfect Blog');
    config.remove('site_name');
    expect(config.get('site_name')).to.be.equal(null);
  });

  it('should change the implementation of config storage (NeDB)', function() {
    const config = new Config(new ConfigNedb('config.db'));
    config.put('maintenance', false);
    expect(config.get('maintenance')).to.be.equal(false);
  });

  it('should change the implementation of config storage (MySql)', function() {
    const connection = { username: 'root', password: '', db: 'config' };
    const config = new Config(new ConfigMysql(connection));
    config.put('age', 30);
    expect(config.get('age')).to.be.equal(30);
  });
});
