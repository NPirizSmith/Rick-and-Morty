const { Sequelize } = require('sequelize');
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
const models = {};

models.User = UserModel(sequelize);
models.Favorite = FavoriteModel(sequelize, models);

// Relación de modelos
const { User, Favorite } = models;

User.belongsToMany(Favorite, { through: 'user_favorite' });
Favorite.belongsToMany(User, { through: 'user_favorite' });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
  models,
};
