const express = require('express');
const server = express();
const router = require("../src/routes")
const morgan = require("morgan")
const { conn } = require('./DB_connection');
const { PORT } = process.env;



server.use(express.json())
server.use(morgan("dev"))

server.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Credentials', 'true');
   res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
   );
   res.header(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, DELETE'
   );
   next();
});
server.use("/rickandmorty", router)

conn.sync()
  .then(() => {
    console.log('Database synced successfully.');
    server.listen(PORT, () => {
      console.log('Server raised in port: ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });