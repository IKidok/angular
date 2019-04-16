const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./services/database/dbConnect').connect;

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


Promise.resolve().then(async () => {
  try {
    await connect();
    console.log('Successfully connected to DB');
  } catch (err) {
    console.error(`Error while connecting to db: ${err.message}`);
    process.exit(1);
  }
  // TODO: переделать с использование роутера(express.router)
  app.get('/test', async (req, res, next) => {
    try {
      let Controller = require('./entities/user').controller;
      let controller = new Controller();
      await controller.addUser({kidok: 'hyj'});
      return res.status(200).send();
    } catch (err) {
      next(err);
    }
  });

  app.listen(3000, () => {
    console.log(`Server port: 3000`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
