const jwt = require('jsonwebtoken');
const jwtKey = process.env.SECRET || 'doughnuts'

module.exports = {
    auth: (req, res, next) => {

        const { authorization } = req.headers

        if (authorization) {

            jwt.verify(authorization, jwtKey, (err, decoded) => {

                if (err) {
                    console.log(err)
                    return res.status(401).json({ err })
                }

                req.decoded = decoded

                next()

            })

        } else {

            return res.status(401).json({
                error: 'No Token provided, just include in Authorization header.'
            })

        }

    },

    makeToken: user => {

        const payload = {
            id: user.id,
            username: user.username
        }

        const options = {
            expiresIn: '1d'
        }

        return jwt.sign(payload, jwtKey, options)

    },

}
