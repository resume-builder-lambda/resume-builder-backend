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
const LinkedinStrategy = require('passport-linkedin-oauth2').Strategy

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

passport.use(new LinkedinStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID,
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET,
    callbackURL: 'https://career-rp.com/register',
    scope: ['r_liteprofile', 'r_emailaddress']
},
    function (accessToken, refreshToken, profile, done) {
        process.nextTick(() => {
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

server.get('/auth/linkedin', passport.authenticate('linkedin'), (req, res) => {
    console.log('Something')
})

server.get('/auth/linkedin/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
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
