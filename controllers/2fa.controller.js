const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const bcrypt = require('bcryptjs')
const accountService = require('../services/twoFA.service')

module.exports.verify = async function (req, res){
    const user = await User.findOne({email: req.body.email})
    if(user) {
        const secret = bcrypt.compareSync(req.body.secret, user.secret)
        if (secret) {
            res.status(200).json({
                secret: user.secret,
            })
        } else {
            res.status(401).json({
                message: 'Falsches Secret'
            })
        }
    }
}

module.exports.verifyCoachee = async function (req, res){
    const coachee = await Coachee.findOne({email: req.body.email})

    if (coachee) {
        const secret = bcrypt.compareSync(req.body.secret, coachee.secret)
        if(secret){
            res.status(200).json({
                secret: coachee.secret,
            })
        } else {
            res.status(401).json({
                message: 'Falsches Secret'
            })
        }
    }
}

module.exports.forgotSecret = async function (req, res, next) {
    accountService.forgotSecret(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Bitte checke deine E-Mails.' }))
        .catch(next);
}

module.exports.forgotSecretCoachee = async function (req, res, next) {
    accountService.forgotSecretCoachee(req.body, req.get('origin'))
        .then(() => res.json({ message: 'Bitte checke deine E-Mails.' }))
        .catch(next);
}

module.exports.resetSecret = async function (req, res, next) {
    accountService.resetSecret(req.body)
        .then(() => res.json({ message: 'Dein Secret wurde erfolgreich geändert. Du kannst dich nun autorisieren.' }))
        .catch(next);
}

module.exports.resetSecretCoachee = async function (req, res, next) {
    accountService.resetSecretCoachee(req.body)
        .then(() => res.json({ message: 'Dein Secret wurde erfolgreich geändert. Du kannst dich nun autorisieren.' }))
        .catch(next);
}


