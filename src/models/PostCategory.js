module.exports = (sequelize, DataTypes) => {
    const PostCategory = sequelize.define('PostCategory', {
        posts: DataTypes.STRING,
        categories: DataTypes.STRING
    })
    return PostCategory
}
