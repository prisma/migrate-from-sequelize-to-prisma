module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
  })

  User.associate = (models) => {
    User.hasMany(models.Post, {
      foreignKey: "authorId",
      as: "posts",
    })
    User.hasOne(models.Profile, {
      onDelete: "CASCADE",
      foreignKey: "userId",
      as: "profile",
    })
  }
  return User
}
