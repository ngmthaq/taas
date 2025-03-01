module.exports = class Model {
  /**
   * Constructor.
   */
  constructor() {}

  /**
   * Get the table name.
   *
   * @returns {string}
   */
  getTableName() {
    return this.name.toLowerCase() + "s";
  }
};
