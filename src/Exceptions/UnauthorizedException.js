const SampleException = require("./SampleException");

module.exports = class UnauthorizedException extends SampleException {
  constructor(details = {}) {
    super("Unauthorized", 401, details);
  }
};
