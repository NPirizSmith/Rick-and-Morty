require('dotenv').config();
const { Sequelize } = require('sequelize');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;
const FavoriteModel = require('./models/Favorite.js');
const UserModel = require('./models/User.js');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
   logging: false,
   native: false,
   dialectOptions: {
      ssl: {
         require: true,
         rejectUnauthorized: false,
      },
   },
   pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
   },
   alter: {
      drop: false,
   },
});


// Ejecutar la función de los modelos.

FavoriteModel(sequelize);

UserModel(sequelize);

// Relación de modelos
 const { User, Favorite } = sequelize.models;

 User.belongsToMany(Favorite, { through: 'user_favorite' });
Favorite.belongsToMany(User, { through: 'user_favorite' });

module.exports = {
    User,
    Favorite,
   conn: sequelize,
};
