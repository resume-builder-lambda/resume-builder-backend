const jwt = require('jsonwebtoken')

module.exports = {

    auth: (req, res, next) => {

        const { authorization } = req.headers

        if (authorization) {

            jwt.verify(authorization, process.env.JWT_SECRET, (err, decoded) => {

                if (err || !decoded) {

                    req.authorized = false

                    return next()

                }

                req.authorized = true
                req.decoded = decoded

                next()

            })

        } else {

            req.authorized = false
            return next()

        }

    },

    aca: (req, res, next) => {
        req.headers['Access-Control-Allow-Origin'] = '*'
        req.headers['Access-Control-Allow-Methods'] = 'GET, OPTIONS'
        req.headers['Access-Control-Allow-Headers'] = 'Content-Type'
        req.headers.accept = 'application/vnd.github.machine-man-preview+json'
        next()
    }

}
