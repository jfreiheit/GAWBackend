const express = require('express')
const router = express.Router()
const passport = require('passport') //auf die Router dürfen nur verifizierte user zugreifen.
const upload = require('../middleware/upload')
const userController = require('../controllers/user.controller');
const passportRolle = require('../middleware/passportRolle')
const coacheecontroller = require("../controllers/coachee.controller.js");

//Jede Route greift auf einen controller(Funktion) zu und bestimmt/kontrolliert die Zugriffe (trifft auf grantAccess zu)

router.post('/createCoachee',
    passport.authenticate('jwt', {session: false}),
    userController.createCoachee)

//CRUD-Funktionen
router.get('/user/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('readAny', 'users'),
    userController.findOne);

router.get('/users',
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('readAny', 'users'),
    userController.getUsers);

router.put('/user/:id',
    upload.single('image'),
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('updateOwn', 'users'),
    userController.update);

router.delete('/user/:id',
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('deleteAny', 'users'),
    userController.deleteUser);

router.delete('/coachee/:id',
    passport.authenticate('jwt', {session: false}),
    coacheecontroller.deleteCoachee);

router.post('/register',
    upload.single('image'),
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('createAny', 'users'),
    userController.register)

router.get('/:id/coachees',
    passport.authenticate('jwt', {session: false}),
    passportRolle.grantAccess('readOwn', 'coachees'),
    userController.getCoachees)


module.exports = router
