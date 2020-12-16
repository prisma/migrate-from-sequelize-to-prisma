
const { User, Profile } = require('../models')

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
            email
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
                id: userId
            }
        })

        user.profile.bio = bio

        const userBio = await Profile.create(user)

        return res.json(userBio)
    } catch (error) {
        return res.status(500).json(error)
    }
}

module.exports = {
    createUser,
    setUserBio
}