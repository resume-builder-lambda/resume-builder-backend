const router = require('express').Router()
const request = require('superagent')
const bodyParser = require('body-parser')

router.use(bodyParser.urlencoded({ extended: false }))
router.use(bodyParser.json())

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

router.post('/linkedin', (req, res, next) => {

    requestAccessToken(req.headers.code)
        .then(response => {
            console.log('rat', response.body)
            console.log('rat', response.body.access_token)
            requestProfile(response.body.access_token)
                .then(repsonce => {
                    console.log('rp', repsonce.body)
                    res.status(200).json({ profile: repsonce.body })
                })
                .catch(err => res.status(500).json(err))
        })
        .catch(err => res.status(500).json(err))

})

router.get('/github', passport.authenticate('github', { scope: ['user'] }), (req, res) => {
    console.log('Something')
})

router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    console.log('Failed')
})

function requestAccessToken(code) {
    return request.post('https://www.linkedin.com/oauth/v2/accessToken')
        .send('grant_type=authorization_code')
        .send(`redirect_uri=${process.env.REDIRECT_REGISTER_URI}`)
        .send(`client_id=${process.env.LINKEDIN_CLIENT_ID}`)
        .send(`client_secret=${process.env.LINKEDIN_CLIENT_SECRET}`)
        .send(`code=${code}`)
}

function requestProfile(token) {
    return request.get('https://api.linkedin.com/v2/me')
        .set('Authorization', `Bearer ${token}`)
}

module.exports = router
