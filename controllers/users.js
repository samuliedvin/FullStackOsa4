const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

const formatUser = (user) => {
    return {
        id: user.id,
        username: user.username,
        name: user.name,
        adult: user.adult,
        blogs: user.blogs
    }
}

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users.map(formatUser)) 
})

usersRouter.post('/', async (request, response) => {
    try {
        const body = request.body
        
        // Check if password is too short
        if(body.password.length <= 3) {
            return response.status(400).json({ error: 'the password must be over 3 characters long' })
        }

        // Check if username exists already
        const usernameDuplicate = await User.find({ username : body.username })
        if(usernameDuplicate.length !== 0) {
            return response.status(400).json({ error: 'username must be unique' })
        }

        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)


        const user = new User({
            username: body.username,
            name: body.name,
            adult: !body.adult ? true : body.adult,
            passwordHash
        })

        const savedUser = await user.save()
        return response.json(savedUser)
    } catch (exception) {
        console.log(exception)
        return response.status(500).json({ error: 'something went wrong...' })
    }
})


module.exports = usersRouter