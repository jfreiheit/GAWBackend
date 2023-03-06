//hier werden wir die Routen für die Fälle anlegen
const express = require('express')
const router = express.Router()
const coacheecontroller = require("../controllers/coachee.controller.js")
const passport = require('passport')
const passportRolle = require('../middleware/passportRolle')

// CRUD-Funktionen

router.get('/coachee/:id',
    passport.authenticate('jwt', {session: false}),
    coacheecontroller.findOne);
router.put('/coachee/:id',
    passport.authenticate('jwt', {session: false}),
    coacheecontroller.update);

module.exports = router
