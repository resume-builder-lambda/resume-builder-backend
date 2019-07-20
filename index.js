require('dotenv').config()

const express = require('express')
const gpqHttp = require('express-graphql')
const mongoose = require('mongoose')

const cors = require('cors')

const gqlSchema = require('./schema')
const gqlResolver = require('./resolvers')

const port = process.env.PORT || 5000

// Passport
const passport = require('passport')
const GithubStrategy = require('passport-github2').Strategy

const fetch = require('node-fetch')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser((obj, done) => {
    done(null, obj)
})

passport.use(new GithubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: 'https://career-rp.com'
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
            console.table(accessToken, refreshToken, profile)
            done(null, profile)
        })
    }
))

// Server
const server = express()

server.use(require('./middleware').auth)
server.use(cors())

server.use(express.json())

server.use('/graphql', cors(), gpqHttp({
    schema: gqlSchema,
    rootValue: gqlResolver,
    graphiql: true
}))

server.get('/auth/github', passport.authenticate('github', { scope: ['user'] }), (req, res) => {
    console.log('Something')
})

server.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    console.log('Failed')
})

server.post('/auth/linkedin', cors(), (req, res) => {
    const { code } = req.headers

    console.log(code)

    fetch(`https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=${code}&redirect_uri=${process.env.REDIRECT_REGISTER_URI}&client_id=${process.env.LINKEDIN_CLIENT_ID}&client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type'
        }
    })
        .then(res => res.status(200).json(res))
        .catch(err => res.status(400).json(err))
})

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gqltest-dbk60.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => {
        server.listen(port, () => {
            console.log(`\n===================================\n ** Server running on port ${port} ** \n===================================\n`)
        })
    })
    .catch(err => {
        console.log(err)
    })
