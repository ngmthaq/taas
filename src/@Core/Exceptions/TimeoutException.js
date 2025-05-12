const SampleException = require("./SampleException");

module.exports = class TimeoutException extends SampleException {
  constructor(details = {}) {
    super("Timeout", 408, details);
  }
};
