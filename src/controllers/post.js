const { Post, User, Category } = require('../models')
const { Op } = require('sequelize')

/**
 * PUT /addPostToCategory
 * query string
 * postId string
 * categoryId string
 */
const addPostToCategory = async (req, res) => {
    const { postId, categoryId } = req.query

    try {
        const post = await Post.findOne({
            where: { id: postId }
        })

        const category = await Category.findOne({
            where: { id: categoryId }
        })

        const updatedPost = await post.addCategory(category)

        console.log(updatedPost.toJSON())

        return res.json(updatedPost)
    } catch (error) {
        return res.status(500).json(error)
    }
}

/**
 * GET /feed
 */
const feed = async (req, res) => {
    try {
        const feed = await Post.findAll({
            where: { published: true },
            include: ['author', 'categories']
        })
        return res.json(feed)
    } catch (error) {
        return res.status(500).json(error)
    }
}

/**
 * POST /post
 * body
 * title: string - required
 * content: string
 * authorEmail: string
 */
const createDraft = async (req, res) => {
    const { title, content, authorEmail } = req.body

    try {
        const user = await User.findOne({ email: authorEmail })

        const draft = await Post.create({
            title,
            content,
            authorId: user.id,
        })

        res.json(draft)

    } catch (error) {
        return res.status(500).json(error)
    }

}

/**
 * GET 
 * query string
 * searchString: string - optional
 */
const filterPosts = async (req, res) => {
    const { searchString } = req.query

    try {
        const searchedPost = await Post.findAll({
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searchString}%`
                        }
                    },
                    {
                        content: {
                            [Op.like]: `%${searchString}%`
                        }
                    }
                ]
            },
            include: 'author'
        })

        res.json(searchedPost)
    } catch (error) {
        return res.status(500).json(error)

    }
}

/**
 * GET /post/:postId
 * query string
 * postId
 */
const getPostById = async (req, res) => {
    const { postId } = req.params

    try {
        const post = await Post.findOne({
            where: { id: postId },
            include: 'author'
        })

        return res.json(post)
    } catch (error) {
        return res.status(500).json(error)

    }
}

/**
 * PUT post/:postId
 * publish post
 * query param number
 */
const publishDraft = async (req, res) => {
    const { postId } = req.params

    try {
        const post = await Post.findOne({
            where: { id: postId }
        })
        post.published = true

        post.save()

        return res.json(post)
    } catch (error) {
        return res.status(500).json(error)
    }
}

/**
 * POST /category
 * body
 * name: string
 */
const createCategory = async (req, res) => {
    const { name } = req.body

    try {
        const category = await Category.create({ name })

        return res.json(category)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    addPostToCategory,
    feed,
    createDraft,
    filterPosts,
    getPostById,
    createCategory,
    publishDraft
}