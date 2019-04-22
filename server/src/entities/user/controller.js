let DatabaseService = require('../../services/database');

module.exports = class HeroController {
  constructor() {
    this._heroService = new DatabaseService('user');
  }

  addHero(data) {
    return this._heroService.create(data);
  }

  getHeroes() {
    return this._heroService.readAll();
  }

  getHero(selector) {
    return this._heroService.read(selector);
  }

  deleteHeroes(selector, all = false) {
    return this._heroService.remove(selector, all);
  }

  updateHero(selector, data) {
    return this._heroService.update(selector, data);
  }


};
