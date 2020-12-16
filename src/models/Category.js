module.exports = (sequelize, DataTypes) => {
    const Category = sequelize.define('Category', {
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
    })
    Category.associate = models => {
        Category.belongsToMany(models.Post, {
            through: "PostCategories",
            as: 'posts'
        })
    }
    return Category;
};