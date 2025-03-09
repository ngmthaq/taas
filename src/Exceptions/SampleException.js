module.exports = class SampleException {
  constructor(message, status, details) {
    this.message = message;
    this.status = status;
    this.details = details;
  }
};
