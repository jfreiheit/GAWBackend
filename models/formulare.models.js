//password Funktion und secret ändern
//CRUD-Funktion von users.controller umschreiben auf coachee.controller.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema

//in dem Coachee werden die Inhalte der Formulare gespeichert
// und wer den Coachee erstellt hat wird ebenfalls gespeichert
const formulareSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    coachee: {
        ref: 'coachees',
        type: Schema.Types.ObjectId
    },
    inhalt: [
        {
        frage: {
            type: String,
            default: ''
        },
        antwort: {
            type: String,
            default: '' //speichert leeres Feld
        }
    }],
    pdf: {
        type: String,
        default: ''
    }
}, {timestamps: true})

module.exports = mongoose.model('formulare', formulareSchema)
