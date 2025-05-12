const SampleException = require("./SampleException");

module.exports = class BadRequestException extends SampleException {
  constructor(details = {}) {
    super("Bad Request", 400, details);
  }
};
