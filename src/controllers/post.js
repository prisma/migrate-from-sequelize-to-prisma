const prisma = require("../prisma")

/**
 * PUT /addPostToCategory
 * query string
 * postId string
 * categoryId string
 */
const addPostToCategory = async (req, res) => {
  const { postId, categoryId } = req.query

  try {
    const post = await prisma.posts.update({
      data: {
        postsToCategories: {
          create: {
            category: {
              connect: { id: categoryId },
            },
          },
        },
      },
      where: {
        id: postId,
      },
    })

    return res.json(post)
  } catch (error) {
    console.log({ error })
    return res.status(500).json(error)
  }
}

/**
 * GET /feed
 */
const feed = async (req, res) => {
  try {
    const feed = await prisma.posts.findMany({
      where: { published: true },
      include: { author: true, categories: true },
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
    const draft = await prisma.posts.create({
      data: {
        title,
        content,
        author: {
          connect: { email: authorEmail },
        },
      },
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
    const filteredPosts = prisma.posts.findMany({
      where: {
        OR: [
          {
            title: { contains: searchString },
          },
          {
            content: { contains: searchString },
          },
        ],
      },
    })

    res.json(filteredPosts)
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
    const post = await prisma.posts.findUnique({
      where: { id: postId },
      include: { author: true },
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
    const post = await prisma.posts.findUnique({
      where: { id: postId },
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
    const category = await prisma.categories.create({
      data: { name },
    })
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
  publishDraft,
}
