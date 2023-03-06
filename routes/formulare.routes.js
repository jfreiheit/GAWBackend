//hier werden wir die Routen für die Fälle anlegen
const express = require('express')
const router = express.Router()
const upload = require('../middleware/upload')
const formularcontroller = require("../controllers/formular.controller.js")
const passport = require("passport");
const passportRolle = require("../middleware/passportRolle");

// CRUD-Funktionen
router.get('/formular/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readOwn', 'formulare'),
    formularcontroller.findOne);
router.get('/:id/formulare',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readOwn', 'formulare'),
    formularcontroller.getFormulare);
router.post('/:id/formulare',
    upload.single('doc'),
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('createAny', 'formulare'),
    formularcontroller.createOne);
router.put('/formular/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('updateOwn', 'formulare'),
    formularcontroller.update);
router.delete('/formular/:id',
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('deleteAny', 'formulare'),
    formularcontroller.deleteFormulare);

module.exports = router
