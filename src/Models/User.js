const Model = require("./Model");

module.exports = class User extends Model {
  /**
   * Constructor.
   *
   * @param {*} user
   */
  constructor(user) {
    super();
    this.id = user?.id || "";
    this.name = user?.name || "";
    this.email = user?.email || "";
    this.password = user?.password || "";
    this.role = user?.role || "";
    this.createdAt = user?.createdAt || "";
    this.updatedAt = user?.updatedAt || "";
    this.deletedAt = user?.deletedAt || "";
  }

  /**
   * To JSON
   *
   * @returns {string}
   */
  toJson() {
    return JSON.stringify({
      id: this.id,
      name: this.name,
      email: this.email,
      password: this.password,
      role: this.role,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      deletedAt: this.deletedAt,
    });
  }
};
