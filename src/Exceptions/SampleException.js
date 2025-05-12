module.exports = class SampleException extends Error {
  constructor(message, status, details) {
    super(message);
    this.message = message;
    this.status = status;
    this.details = details;
  }
};
