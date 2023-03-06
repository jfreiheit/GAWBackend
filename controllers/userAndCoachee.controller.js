const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const keys = require('../config/keys')
const userAndCoacheeService = require('../services/password.service')

module.exports.login = async function (req, res) {
    const user = await User.findOne({email: req.body.email})

    if (user) {
        //Candidate existiert bereits, dann wird password überprüft
        console.log('user', user)
        const passwordResult = bcrypt.compareSync(req.body.password, user.password)
        if (passwordResult) {
            //wenn password true, muss token generiert werden
            const token = jwt.sign({
                //email: candidate.email,
                userID: user._id,
                role: user.role
            }, keys.jwt, {expiresIn: 60 * 60 * 3})

            res.status(200).json({
                id: user._id,
                email: user.email,
                vorname: user.vorname,
                name: user.name,
                role: user.role,
                token: `Bearer ${token}`
            })
        } else {
            //wenn password false
            res.status(401).json({
                message: 'Falsches Passwort'
            })
        }
    } else {
        //Candidate existiert nicht
        res.status(404).json({
            message: 'Diese E-Mail wurde nicht gefunden'
        })
    }
}

module.exports.loginCoachee = async function (req, res) {
    const coachee = await Coachee.findOne({email: req.body.email})
    if (coachee) {
        //Candidate existiert bereits, dann wird password überprüft
        const passwordResult = bcrypt.compareSync(req.body.password, coachee.password)
        if (passwordResult) {
            //wenn password true, muss token generiert werden
            const token = jwt.sign({
                //email: candidate.email,
                coacheeID: coachee._id,
                userID: coachee.user
            }, keys.jwt, {expiresIn: 60 * 60 * 3})

            res.status(200).json({
                id: coachee._id,
                email: coachee.email,
                vorname: coachee.vorname,
                name: coachee.name,
                user: coachee.user,
                token: `Bearer ${token}`
            })
        } else {
            //wenn password false
            res.status(401).json({
                message: 'Falsches Passwort'
            })
        }
    } else {
        //Candidate existiert nicht
        res.status(404).json({
            message: 'Diese E-Mail wurde nicht gefunden'
        })
    }
}

module.exports.forgotPassword = async function (req, res, next) {
    userAndCoacheeService.forgotPassword(req.body, req.get('origin'))
        .then(() => res.json({message: 'Bitte checke deine E-Mails.'}))
        .catch(next);
}

module.exports.forgotPasswordCoachee = async function (req, res, next) {
    userAndCoacheeService.forgotPasswordCoachee(req.body, req.get('origin'))
        .then(() => res.json({message: 'Bitte checke deine E-Mails.'}))
        .catch(next);
}

module.exports.resetPassword = async function (req, res, next) {
    userAndCoacheeService.resetPassword(req.body)
        .then(() => res.json({message: 'Dein Passwort wurde erfolgreich geändert. Du kannst dich nun einloggen.'}))
        .catch(next);
}

module.exports.resetPasswordCoachee = async function (req, res, next) {
    userAndCoacheeService.resetPasswordCoachee(req.body)
        .then(() => res.json({message: 'Dein Passwort wurde erfolgreich geändert. Du kannst dich nun einloggen.'}))
        .catch(next);
}
