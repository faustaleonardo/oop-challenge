const secret = new WeakMap();

class Validator {
  constructor(data, rules, message) {
    secret.set(this, {
      _data: data,
      _rules: rules,
      _message: message,
      _valid: true,
      _errorObj: {}
    });

    for (const fieldName in rules) {
      const rulesArr = rules[fieldName].split('|');
      for (const index in rulesArr) {
        const fieldValue = data[fieldName];
        const rule = rulesArr[index];

        const _errorObj = secret.get(this)._errorObj;
        let _valid = secret.get(this)._valid;

        if (!this._checkRule(fieldValue, rule)) {
          if (!_errorObj[fieldName]) secret.get(this)._errorObj[fieldName] = [];

          if (_valid === true) secret.get(this)._valid = false;

          const _message = secret.get(this)._message;
          const message = this._getErrorMessage(fieldName, rule);

          if (_message && _message[rule]) {
            secret.get(this)._errorObj[fieldName].push({
              [rule]: _message[rule].replace(/%s/gi, fieldName) || message
            });
          } else {
            secret.get(this)._errorObj[fieldName].push({
              [rule]: message
            });
          }
        }
      }
    }
  }

  _getErrorMessage(field, rule) {
    if (rule === 'required') return `The ${field} is required.`;
    else if (rule === 'alphanum') return `The ${field} must be alphanumeric`;
    else if (rule === 'email') return `The ${field} must be a valid email`;
    else if (rule === 'numeric') return `The ${field} must be numeric`;
    else if (rule === 'boolean')
      return `The ${field} only accepts boolean value`;
    else if (rule.includes('min')) {
      return `The minimum ${field} is ${rule.slice(4)}`;
    }
  }

  _checkRule(data, rule) {
    if (rule === 'required') {
      return data.length !== 0;
    } else if (rule === 'alphanum') {
      return /^[a-zA-Z0-9]*$/.test(data);
    } else if (rule === 'email') {
      return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
        data
      );
    } else if (rule === 'numeric') {
      return /^[0-9]*$/.test(data);
    } else if (rule === 'boolean') {
      return data === true || data === false;
    } else if (rule.includes('min')) {
      const minLength = rule.slice(4) * 1;
      return data >= minLength;
    }
  }

  fails() {
    return secret.get(this)._valid === false;
  }

  passes() {
    return secret.get(this)._valid === true;
  }

  errors() {
    return secret.get(this)._errorObj;
  }
}

module.exports = Validator;
