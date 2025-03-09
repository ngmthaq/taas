const SampleException = require("./SampleException");

module.exports = class ForbiddenException extends SampleException {
  constructor(details = {}) {
    super("Forbidden", 403, details);
  }
};
