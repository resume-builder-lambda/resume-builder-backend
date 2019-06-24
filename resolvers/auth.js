const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

module.exports = {

    createUser: async args => {

        try {

            const check = await User.findOne({
                email: args.userInput.email
            })

            if (check) {
                throw new Error(`${args.userInput.email} already exists. Please try a different email.`)
            }

            args.userInput.password = bcrypt.hashSync(args.userInput.password, 12)

            const user = new User({
                email: args.userInput.email,
                password: args.userInput.password
            })

            const res = await user.save()

            return { ...res._doc, password: null }

        } catch (err) {

            throw err

        }

    },

    login: async ({ email, password }) => {

        const user = await User.findOne({ email })

        if (!user) {

            throw new Error(`'${email}' does not match a user in the database. Please try again.`)

        }

        if (bcrypt.compareSync(password, user.password)) {

            const token = jwt.sign({
                _id: user.id,
                email: user.email,
                role: user.role
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
