let DatabaseService = require('../../services/database');

module.exports = class UserController {
  constructor() {
    this._userServices = new DatabaseService('user');
  }

  addUser(data) {
    this._userServices.insertOne(data);
  }


};
