const User = require('../models/user')

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(formatUser)
}

const formatUser = (user) => {
    return {
        username: user.username,
        name: user.name,
        passwordHash: user.passwordHash,
        blogs: user.blogs
    }
}

module.exports = {
    usersInDb
}