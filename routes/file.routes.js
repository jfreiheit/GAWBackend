const express= require('express')
const upload = require('../middleware/upload')
const passport = require("passport");
const passportRolle = require("../middleware/passportRolle");
const filecontroller = require('../controllers/file.controller')
const router = express.Router()

router.post('/:id/fileupload', upload.single('file'),
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('createAny', 'formulare'),
    filecontroller.uploadFile)

router.get('/:id/:filename',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('createAny', 'formulare'),
    filecontroller.downloadFile)

router.delete('/:id/:id',
    passport.authenticate('jwt', {session: false}),
    //passportRolle.grantAccess('createAny', 'formulare'),
    filecontroller.deleteFile)

module.exports = router