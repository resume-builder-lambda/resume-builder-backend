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

server.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})

server.use(require('./middleware').auth)

server.use(express.json())

server.use(cors())

server.use('/', gpqHttp({
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

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@gqltest-dbk60.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(() => {
        server.listen(port, () => {
            console.log(`\n===================================\n ** Server running on port ${port} ** \n===================================\n`)
        })
    })
    .catch(err => {
        console.log(err)
    })
