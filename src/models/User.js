
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
  });

  User.associate = models => {
    User.hasMany(models.Post, {
      foreignKey: 'author'
    });
    User.hasOne(models.Profile, {
      onDelete: 'CASCADE',
      foreignKey: 'userId'
    })
  };
  return User;
};
