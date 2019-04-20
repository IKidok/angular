const connection = require('./dbConnect').connection;

module.exports = class DatabaseService {
  constructor(collection, db = 'TourOfHeroes') {
    this._connection = connection().db(db).collection(collection);
  }

  create(data) {
    return this._connection.insertOne(data).toArray();
  }

  readAll() {
    return this._connection.find({}).toArray();
  }

  remove(selector, all = false) {
    return all ? this._connection.deleteMany(selector) : this._connection.deleteOne(selector).toArray();
  }

  read(selector) {
    return this._connection.find(selector).toArray();
  }

  update(selector, data, all = false) {
    return all ? this._connection.updateMany(selector, data).toArray() : this._connection.updateOne(selector, data).toArray();
  }
};
