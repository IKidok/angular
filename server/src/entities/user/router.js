const express = require('express');
const Controller = require('./controller');

module.exports = class UserRouter {
  constructor() {
    this._userController = new Controller();
    this._router = express.Router();

    this._router.get('/show', (req, res) => {
      res.send('Hero show home page');
    });

    this._router.get('/',(req, res, next) => this.index(req, res, next) );
  }

   async index(req, res, next) {
      try {
        let heroes = await this._userController.getHeroes();
        return res.status(200).send(heroes);
      } catch (err) {
        next(err);
      }
   }

   get router() { return this._router }
};
