const express = require('express');
const cors = require('cors'); // Importa el middleware de CORS
const server = express();
const router = require("../src/routes");
const morgan = require("morgan");
const { conn } = require('./DB_connection');
const { PORT } = process.env;

server.use(cors()); // Aplica el middleware de CORS a todas las rutas

server.use(express.json());
server.use(morgan("dev"));

server.use("/rickandmorty", router);

conn.sync({ force: false })
  .then(() => {
    console.log('Database synced successfully.');
    server.listen(PORT, () => {
      console.log('Server raised in port: ' + PORT);
    });
  })
  .catch((error) => {
    console.error('Error syncing database:', error);
  });