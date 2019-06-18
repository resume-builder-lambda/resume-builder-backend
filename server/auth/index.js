const router = require('express').Router()
const bcrypt = require('bcryptjs')

const { makeToken } = require('./middleware')
const Users = require('../actions')

router.post('/register', async (req, res) => {

    let { username, password } = req.body

    if (req.body && username && password) {
        try {

            const check = await Users.find('users', username)

            if (check === undefined) {
                req.body.password = bcrypt.hashSync(password, 10)
                const newUser = await Users.add('users', req.body)

                const token = makeToken(newUser)

                res.status(200).json({
                    username,
                    id: newUser.id,
                    token
                })
            } else {

                if (bcrypt.compareSync(password, check.password)) {

                    const token = makeToken(check)

                    res.status(200).json({
                        message: `Welcome, ${username}!`,
                        id: check.id,
                        username,
                        token
                    })

                } else {

                    res.status(401).json({
                        error: `Your password does not match ${username}'s password. Please try again.`
                    })

                }

            }

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error'
            })

        }
    } else {

        res.status(404).json({
            error: 'You must include a username and password in your request.'
        })

    }

})

router.post('/login', async (req, res) => {

    let { username, password } = req.body

    if (req.body && username && password) {

        try {

            const check = await Users.find('users', username)

            if (check && bcrypt.compareSync(password, check.password)) {

                const token = makeToken(check)

                res.status(200).json({
                    message: `Welcome, ${username}!`,
                    id: check.id,
                    username,
                    token
                })

            } else {
                res.status(401).json({
                    error: 'Invalid username and/or password.'
                })
            }

        } catch (err) {

            console.log(err)

            res.status(500).json({
                error: 'Internal Server Error'
            })

        }

    } else {
        res.status(400).json({
            error: 'You must include a username and password in your request.'
        })
    }

})

module.exports = router
