const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { User } = require('../model')

module.exports = {

    user: async (args, req, res) => {

        const { email } = req.decoded

        try {

            if (!email) throw new Error("You don't exist.")

            return await User.findOne({ email })

        } catch (err) {

            throw err

        }

    }

}
