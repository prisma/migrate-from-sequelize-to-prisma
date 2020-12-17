module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        bio: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    Profile.associate = models => {
        Profile.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })
    }
    return Profile
}