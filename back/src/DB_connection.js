const { Sequelize } = require('sequelize');
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const FavoriteModel = require('./models/Favorite');
const UserModel = require('./models/User');

const sequelize = new Sequelize(
   `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`,
   { logging: false, native: false }
);

const Favorite = FavoriteModel(sequelize);
const User = UserModel(sequelize);

User.belongsToMany(Favorite, { through: 'user_favorite' });
Favorite.belongsToMany(User, { through: 'user_favorite' });

module.exports = {
   User,
   Favorite,
   conn: sequelize,
};
