const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
   sequelize.define('User', {
      id: {
         type: DataTypes.INTEGER,
         allowNull: false,
         primaryKey: true,
         autoIncrement: true
      },
      email: {
         type: DataTypes.STRING,
         allowNull: false,
         isEmail: true
      },
      password: {
      type: DataTypes.STRING,
      allowNull: false}
   }, { timestamps: false });

   User.associate = (models) => {
      User.belongsToMany(models.Favorite, {
         through: 'user_favorite',
         foreignKey: 'userId',
         otherKey: 'favoriteId' 
      });
   };

   return User;
};
