const multer = require('multer') //erlaubt file hochzuladen
const keys = require('../config/keys')
const moment = require('moment')
const {GridFsStorage} = require("multer-gridfs-storage");

const storage = new GridFsStorage({
    url: keys.mongoURI,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        const date = moment().format('DD.MM.YYYY-HH:mm:ss_SSS')
        const match = ["image/png", "image/jpeg", "doc/pdf"]
        if(match.indexOf(file.mimetype) === -1){
            console.log('file.mimetype === -1')
            return `${date}-${file.originalname}`
        }
        console.log('store')
        if(file.mimetype === "doc/pdf"){
            return {
                bucketName: 'fs',
                filename: `${date}-${file.originalname}`
            }
        } else
            return {
                bucketName: 'fileupload',
                filename: `${date}-${file.originalname}`
            }

    }
})
module.exports = multer({storage})
/*
const storage = multer.diskStorage({
    destination(req, file, cb){
        cb(null, '../uploads/')
    },
    filename(req, file, cb){
        const date = moment().format('DD.MM.YYYY-HHmmss_SSS')
        cb(null, `${date}-${file.originalname}`)
    }
})


const fileFilter = (req, file, cb) => {
    //prüfen auf format
    if(file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'pdf/pdf') {
        cb(null, true)
    } else {
        cb(null, false)
    }
}

const limits = {
    fileSize: 1024 * 1024 * 5
}
//export nach draussen, wo wir unsere konfigurationen übergeben
*/

