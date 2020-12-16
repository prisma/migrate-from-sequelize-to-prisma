
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
    })
    Post.associate = models => {
        Post.belongsTo(models.User, {
            foreignKey: 'authorId',
            as: 'author'
        });
        Post.belongsToMany(models.Category, {
            through: "PostCategories",
            as: 'categories'
        });
    }
    return Post;
}