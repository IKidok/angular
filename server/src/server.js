const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connect = require('./services/database/dbConnect').connect;
const HeroRouter = require('./entities/user').router;
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

  let heroRouter = new HeroRouter();
  app.use('/hero', heroRouter.router);


  app.listen(3000, () => {
    console.log(`Server port: 3000`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
