const SampleException = require("./SampleException");

module.exports = class NotFoundException extends SampleException {
  constructor(details = {}) {
    super("Not Found", 404, details);
  }
};
