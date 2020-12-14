
module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false,
        },
        title: {
            type: DataTypes.STRING,
        },
        content: {
            type: DataTypes.STRING,
        },
        published: {
            type: DataTypes.BOOLEAN
        }
    })
    Post.associate = models => {
        Post.belongsToMany(models.Category, {
            through: "PostCategory",
        });
    }
    return Post;
}