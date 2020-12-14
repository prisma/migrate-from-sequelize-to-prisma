module.exports = (sequelize, DataTypes) => {
    const Profile = sequelize.define('Profile', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        bio: {
            type: DataTypes.STRING
        }
    })
    return Profile
}