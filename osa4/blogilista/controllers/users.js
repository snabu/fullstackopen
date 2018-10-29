const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')



usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body

        if (body.password.length < 3) {
            return response.status(400).json({error : 'Password too short, must be at least 3 characters'})
        }

        const existingUser = await User.find({username : body.username})
        if (existingUser.length > 0) {
            return response.status(400).json({error : 'user with username ' + body.username + ' already exists'})
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash : passwordHash,
            adult :  body.adult === undefined ? true : body.adult
        })

        const savedUser = await user.save()

        response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        response.status(500).json({ error: 'something went wrong...' })
    }
})


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(User.format))
})

module.exports = usersRouter