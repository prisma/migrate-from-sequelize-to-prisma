module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
        },
    })
    Category.associate = models => {
        Category.belongsToMany(models.Post, {
            through: "PostCategory"
        })
    }
    return Category;
};