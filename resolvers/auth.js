const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

module.exports = {

    createUser: async args => {

        try {

            const check = await User.findOne({
                username: args.userInput.username
            })

            if (check) {
                throw new Error(`${args.userInput.username} already exists. Please try a different username.`)
            }

            args.userInput.password = bcrypt.hashSync(args.userInput.password, 12)

            const user = new User({
                username: args.userInput.username,
                password: args.userInput.password
            })

            const res = await user.save()

            return { ...res._doc, password: null }

        } catch (err) {

            throw err

        }

    },

    login: async ({ username, password }) => {

        const user = await User.findOne({ username })

        if (!user) {

            throw new Error(`'${email}' does not match a user in the database. Please try again.`)

        }

        if (bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({
                _id: user.id,
                username: user.username
            }, process.env.JWT_SECRET, { expiresIn: '2h' })

            return {
                _id: user.id,
                token,
                tokenExp: 2
            }

        } else {

            throw new Error('Invalid credentials. Please try again.')

        }

    }

}
