const { User } = require("../models")

/**
 * POST /user
 * name: string - optional
 * email: string - required
 */
const createUser = async (req, res) => {
  const { name, email } = req.body

  try {
    const user = await User.create({
      name,
      email,
    })

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
    const user = await User.findOne({
      where: {
        id: Number(userId),
      },
    })

    const updatedUser = await user.createProfile({ bio })

    return res.json(updatedUser)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

const getAuthors = async (req, res) => {
  const users = await User.findAll({ include: "profile" })

  return res.json(users)
}

module.exports = {
  createUser,
  setUserBio,
  getAuthors,
}
