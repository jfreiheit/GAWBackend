//hier werden wir die Routen für die Fälle anlegen
const express = require('express')
const router = express.Router()
const terminecontroller = require("../controllers/termine.controller.js")
const passport = require("passport");
const passportRolle = require("../middleware/passportRolle");

// CRUD-Funktionen
router.post('/:id/termin',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('createAny', 'termin'),
    terminecontroller.createOneTermin);
router.get('/termin/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readOwn', 'formulare'),
    terminecontroller.findOneTermin);
router.get('/termine/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readOwn', 'formulare'),
    terminecontroller.getAllTermineByCoacheeId)

router.get('/termine/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readOwn', 'formulare'),
    terminecontroller.getAllTermine);

router.put('/termin/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('updateOwn', 'formulare'),
    terminecontroller.updateTermin);
router.delete('/termin/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('deleteAny', 'termin'),
    terminecontroller.deleteTermin);

module.exports = router
