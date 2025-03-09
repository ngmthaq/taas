const SampleException = require("./SampleException");

module.exports = class ServiceUnavailableException extends SampleException {
  constructor(details = {}) {
    super("Service Unavailable", 503, details);
  }
};
