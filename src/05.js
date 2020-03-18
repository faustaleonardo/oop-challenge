const https = require('https');

class Https {
  _runPromise(options, data = '') {
    return new Promise((resolve, reject) => {
      const req = https.request(options, res => {
        let rawData = '';
        res.on('data', chunk => {
          rawData += chunk;
        });
        res.on('end', () => {
          // console.log(rawData);
          resolve(true);
        });
      });
      // send data
      if (data) req.write(data);
      req.on('error', error => {
        reject(error);
      });
      req.end();
    });
  }

  _createOptions(port, hostname, path, method) {
    return {
      port,
      hostname,
      path,
      method
    };
  }

  get(url) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'GET');

    return this._runPromise(options);
  }

  post(url, data) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'POST');
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    };

    return this._runPromise(options, data);
  }

  put(url, data) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'PUT');
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    };

    return this._runPromise(options, data);
  }

  patch(url, data) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'PATCH');
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    };

    return this._runPromise(options, data);
  }

  delete(url, data) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'DELETE');
    options.headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Length': Buffer.byteLength(data)
    };

    return this._runPromise(options, data);
  }

  options(url) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'OPTIONS');

    return this._runPromise(options);
  }

  head(url) {
    const { hostname, pathname } = new URL(url);
    const options = this._createOptions(443, hostname, pathname, 'HEAD');

    return this._runPromise(options);
  }
}

module.exports = Https;
