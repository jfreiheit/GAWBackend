const mongoose = require('mongoose')
const Schema = mongoose.Schema

const termineSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    coachee: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    datum: {
        type: String,
    },
    uhrzeit: {
        type: String,
    },
    stunden:{
        type: String,
    },
    ort: {
        type: String,
    },
    inhalt: {
        type: String,
    },
    status: {
        type: String,
        default: 'offen',
        enum: ['erledigt', 'offen']
    },
    aufgabe: {
        type: String,
        default: '',
        enum: ['Termin', 'toDo', 'Kommentar', 'Telefonat']
    },
}, {timestamps: true})

module.exports = mongoose.model('termine', termineSchema)
