let DatabaseService = require('../../services/database');

module.exports = class UserController {
  constructor() {
    this._userServices = new DatabaseService('user');
  }

  addHeroes(data) {
    return this._userServices.create(data);
  }

  getHeroes() {
    return this._userServices.readAll();
  }

  deleteHeroes(selector) {
    return this._userServices.remove(selector);
  }

  updateHeroes(selector, data) {
    return this._userServices.update(selector, data);
  }


};
