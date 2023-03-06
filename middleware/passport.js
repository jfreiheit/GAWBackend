const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const mongoose = require('mongoose')
const User = mongoose.model('users')
const Coachee = mongoose.model('coachees')
const keys = require('../config/keys')
const {roles} = require("./user.AC");

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // wir nehmen token, den im Header liegt nach der Login
    secretOrKey: keys.jwt
}

module.exports = passport => {
    passport.use( //wir fügen eine neue Strategie ein
        new JwtStrategy(options, async (payload, done)=> {
            try{
                const user = await User.findById(payload.userID).select('id role')
                const coachee = await Coachee.findById(payload.coacheeID).select('id email')
                if(user) {
                    done(null, user)
                }
               else if(coachee) {
                    done(null, coachee)
                }
                else {
                    done('Benutzer ist nicht authentifiziert', false)
                }
            } catch (e) {
                console.log(e)
            }
        })
    )
}

