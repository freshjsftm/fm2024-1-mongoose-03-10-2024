require('dotenv').config();
const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
  .connect(`mongodb://${process.env.DB_HOST_MONGO}:27017/${process.env.DB_MONGO}`)
  .catch((err) => {
    console.log('Error in DB connection: ' + err);
    process.exit(1);
  });

const port = process.env.PORT || 3003;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listen port ' + port);
});
