const { DataTypes } = require('sequelize');

module.exports = (sequelize, Favorite) => {
   const User = sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         validate: {
            isEmail: true,
         }
      },
      password: {
         type: DataTypes.STRING,
         allowNull: false
      }
   }, { timestamps: false });

   User.associate = () => {
      const Favorite = require('./Favorite');
      User.belongsToMany(Favorite, {
         through: 'user_favorite',
         foreignKey: 'UserId',
         otherKey: 'FavoriteId'
      });
   };

   return User;
};