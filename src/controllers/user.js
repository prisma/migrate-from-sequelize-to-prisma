const prisma = require("../prisma")

/**
 * POST /user
 * name: string - optional
 * email: string - required
 */
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
      },
    })
    console.log(user)

    return res.json(user)
  } catch (error) {
    return res.status(500).json(error)
  }
}
/**
 * POST /user/:userId/profile
 *
 * req body
 * bio: string - required
 */
const setUserBio = async (req, res) => {
  const { userId } = req.params
  const { bio } = req.body

  try {
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        profile: {
          update: {
            bio,
          },
        },
      },
    })

    return res.json(user)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const getAuthors = async (req, res) => {
  const users = await prisma.user.findMany({
    include: {
      profile: true,
    },
  })

  return res.json(users)
}

module.exports = {
  createUser,
  setUserBio,
  getAuthors,
}
