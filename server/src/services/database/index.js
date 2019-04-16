const connection = require('./dbConnect').connection;

module.exports = class DatabaseService {
  constructor(collection, db = 'TourOfHeroes') {

    this._connection = connection().db(db).collection(collection);
  }

  insertOne(data) {
    this._connection.insertOne(data);
  }
};
