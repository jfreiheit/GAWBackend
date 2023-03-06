const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
    },
    name: {
        type: String,
    },
    vorname: {
        type: String,
    },
    kontaktadresse_str: {
        type: String,
        required: false
    },
    kontaktadresse_nr: {
        type: String,
        required: false
    },
    kontaktadresse_ort: {
        type: String,
        required: false
    },
    kontaktadresse_plz: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'coach',
        enum: ['admin', 'coach']
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    telefonnummer: {
        type: String,
        required: false
    },
    secret: {
         type: String
    },
    resetSecretToken: {
        token: String,
        expires: Date,
        required: false
    },
    resetSecretDate: {
        type: Date,
        required: false
    },
    resetPasswordToken: {
        token: String,
        expires: Date,
        required: false
    },
    resetPasswordDate: {
        type: Date,
        required: false
    },
    //optionale Eingaben
    rechnungsadresse_str: {
        type: String,
        required: false
    },
    rechnungsadresse_nr: {
        type: String,
        required: false
    },
    rechnungsadresse_ort: {
        type: String,
        required: false
    },
    rechnungsadresse_plz: {
        type: String,
        required: false
    },
    imageSrc: {
        ref: 'fileupload',
        type: String,
        default: ''
    },
    unterschrift:{
        type: String,
        default: ''
    }

}, {timestamps: true})
   
module.exports = mongoose.model('users', userSchema)
