//password Funktion und secret ändern
//CRUD-Funktion von users.controller umschreiben auf coachee.controller.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//in dem Coachee werden die Inhalte der Formulare gespeichert
// und wer den Coachee erstellt hat wird ebenfalls gespeichert
const coacheeSchema = new Schema({
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
    firmenname: {
        type: String,
    },
    firmen_str: {
        type: String,
    },
    firmen_nr: {
        type: String,
    },
    firmen_ort: {
        type: String,
    },
    firmen_plz: {
        type: String,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
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
    arbeitgeber_str: {
        type: String,
        required: false
    },
    arbeitgeber_nr: {
        type: String,
        required: false
    },
    arbeitgeber_ort: {
        type: String,
        required: false
    },
    arbeitgeber_plz: {
        type: String,
        required: false
    },
    telefonnummer: {
        type: String,
        required: false
    },
    privat_str: {
        type: String,
        required: false
    },
    privat_nr: {
        type: String,
        required: false
    },
    privat_ort: {
        type: String,
        required: false
    },
    privat_plz: {
        type: String,
        required: false
    },
    mobil:{
        type: String,
        required: false
    },
    privat_email:{
        type: String,
        required: false
    }
}, {timestamps: true})

module.exports = mongoose.model('coachees', coacheeSchema)
