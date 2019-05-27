const express = require('express');
const Controller = require('./controller');
const { ObjectId} = require('mongodb');
module.exports = class UserRouter {
  constructor() {
    this._heroController = new Controller();
    this._router = express.Router();

    this._router.get('/readAll', (req, res, next) => this.readAll(req, res, next));
    this._router.get('/read/:id', (req, res, next) => this.read(req, res, next));
    this._router.delete('/deleteAll', (req, res, next) => this.removeAll(req, res, next));
    this._router.delete('/delete/:id', (req, res, next) => this.remove(req, res, next));
    this._router.post('/create', (req, res, next) => this.create(req, res, next));
    this._router.put('/update/:id', (req, res, next) => this.update(req, res, next));
    this._router.get('/search/:name', (req, res, next) => this.search(req, res, next));
  }



  async create(req, res, next) {
    try {
      let hero = req.body;
      let alreadyExist = await this._heroController.searchHeroes({name: {$regex: hero.name}, dateOfBirth: {$regex: hero.dateOfBirth}});
      if (alreadyExist.length === 0) {
        let result = await this._heroController.addHero(req.body);
        return res.status(200).send(result);
      }
     else {
       return res.status(418).send('Hero already exist');
      }
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      let id = ObjectId(req.param('id'));
      let hero = req.body;
      let result = await this._heroController.updateHero(
        {"_id": id},
        {$set: {
          "name": hero.name,
          "level": hero.level,
          "classGroup": hero.classGroup,
          "fraction": hero.fraction,
          "dateOfBirth": hero.dateOfBirth
          }
        });
      return res.status(200).send(result);
    } catch (err) {
      next(err);
    }
  }

  async read(req, res, next) {
    try {
      let id = ObjectId(req.param('id'));Hero({"_id": id});
      return res.status(200).send(hero[0]);
    } catch (err) {
      next(err);
    }
  }

  async readAll(req, res, next) {
    try {
      let heroes = await this._heroController.getHeroes();
      return res.status(200).send(heroes);
    } catch (err) {
      next(err);
      let hero = await this._heroController.get
    }
  }

  async search(req, res, next) {
    try {
      let name = (req.param('name'));
      let heroes = await this._heroController.searchHeroes({name: {$regex: name}}) ;
      return res.status(200).send(heroes);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      let id = ObjectId(req.param('id'));
      let removeResult = await this._heroController.deleteHeroes({"_id": id});
      return res.status(200).send({
        count: removeResult.result.n,
        status: 'Hero removed successfully'
      });
    }
    catch (err) {
      next(err);
    }
  }

  async removeAll(req, res, next) {
    try {
      let removeResult = await this._heroController.deleteHeroes({}, true);
      return res.status(200).send({
        count: removeResult.result.n,
        status: 'Hero removed successfully'
      });
    }
    catch (err) {
      next(err);
    }
  }


  get router() {
    return this._router
  }
};
