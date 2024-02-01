const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   const Favorite = sequelize.define('Favorite', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true
      },
      name: {
         type: DataTypes.STRING,
         allowNull: false
      },
      status: {
         type: DataTypes.ENUM("Alive", "Dead", "unknown"),
         allowNull: false
      },
      species: {
         type: DataTypes.STRING,
         allowNull: false
      },
      gender: {
         type: DataTypes.ENUM ("Female", "Male", "Genderless", "unknown"),
         allowNull: false
      },
      origin: {
         type: DataTypes.STRING,
         allowNull: false
      },
      image: {
         type: DataTypes.STRING,
         allowNull: false
      }
   }, { timestamps: false });

   Favorite.associate = () => {
      const User = require('./User'); // Importa User aquí
      Favorite.belongsToMany(User, {
         through: 'user_favorite',
         foreignKey: 'FavoriteId',
      });
   };

   return Favorite;
};