const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://kidok:Qwe123@tourofheroes-mehtw.mongodb.net/TourOfHeroes?retryWrites=true';
let connection = null;

module.exports.connect = async () => {
    let client = new MongoClient(uri, { useNewUrlParser: true });
    let promises = [];
    let connectionTimeoutPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        reject(new Error('Database connection timeout exceeded'));
      }, 4000);
    });
    let dbConnectionPromise = new Promise(async (resolve, reject) => {
      connection = await client.connect();
      resolve();
    });

    promises.push(connectionTimeoutPromise);
    promises.push(dbConnectionPromise);

    return Promise.race(promises);

};
module.exports.connection = () => connection ;
