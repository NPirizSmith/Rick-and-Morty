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

const models = {};


models.Favorite = FavoriteModel(sequelize, models);
models.User = UserModel(sequelize, models);

const { User, Favorite } = models;

// Asociación entre User y Favorite
User.belongsToMany(Favorite, { through: 'user_favorite' });
Favorite.belongsToMany(User, { through: 'user_favorite' });

module.exports = {
  User,
  Favorite,
  conn: sequelize,
  models,
};