require('dotenv').config()
const passport = require("passport")
const GitHubStrategy = require("passport-github2").Strategy

const passportOptions = {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL,
}

passport.use(new GitHubStrategy(passportOptions,
    function (accessToken, refreshToken, profile, done) {
        profile.token = accessToken
        return done(null, profile)
    }
))

passport.serializeUser(function (user, done) { done(null, user) })
passport.deserializeUser(function (user, done) { done(null, user) })

module.exports = passport