const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
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

   // Asociación con Favorite
   User.associate = (models) => {
      User.belongsToMany(models.Favorite, {
         through: 'user_favorite',
         foreignKey: 'userId',
         otherKey: 'favoriteId'
      });
   };

   return User;
};
