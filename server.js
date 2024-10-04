const http = require('http');
const mongoose = require('mongoose');
const app = require('./app');

mongoose
.connect('mongodb://localhost:27017/fm2024mongoose')
.catch((err) => {
  console.log('Error in DB connection: ' + err);
  process.exit(1);
});

const port = process.env.PORT || 3000;
const server = http.createServer(app);

server.listen(port, () => {
  console.log('server listen port ' + port);
});
