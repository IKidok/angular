const connection = require('./dbConnect').connection;

module.exports = class DatabaseService {
  constructor(collection, db = 'TourOfHeroes') {
    this._connection = connection().db(db).collection(collection);
  }

  create(data) {
    return this._connection.insertOne(data);
  }

  readAll() {
    return this._connection.find({}).toArray();
  }

  remove(selector, all = false) {
    return all ? this._connection.deleteMany(selector) : this._connection.deleteOne(selector);
  }

  read(selector) {
    return this._connection.find(selector).toArray();
  }

  update(selector, data) {
    return this._connection.updateOne(selector, data);
  }
};
