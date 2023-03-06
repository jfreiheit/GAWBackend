const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const Formulare = require('../models/formulare.models')
const Grid = require('gridfs-stream')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')
const connect = mongoose.createConnection(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})

let gfs, gfsb
connect.once('open', () => {
    gfsb = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "fs"
    })
    gfs = Grid(connect.db, mongoose.mongo)
    gfs.collection('fs' )
})
module.exports.uploadFile = (req, res) => {

    if (req.file === undefined) {
        return res.send({message: "no file selected"})
    } else {
        console.log('req.file', req.file)
        //const imgUrl = keys.mongoURI / `${req.file.filename}`
        return res.status(201).send({message: "Dokument wurde erfolgreich hochgeladen"})
    }

}

module.exports.downloadFile = async function (req, res) {

    try {
        const cursor = await gfs.collection('fs').find({filename: req.params.filename})
        cursor.forEach(doc => {
            console.log('doc', doc)
            gfsb.openDownloadStream(doc._id).pipe(res)
        })
    } catch (error){
        console.log('error', error)
        res.send('not found')
    }
}

module.exports.deleteFile = async function (req, res) {
    try {
        await gfs.collection('fileupload').deleteOne({_id: req.params._id})
        res.send({message: 'Document wurde erfolgreich gelöscht'})
    }catch (error){
        console.log('error', error)
        res.send('An error occured.')
    }
}

module.exports.getFile = function (req, res) {
}


