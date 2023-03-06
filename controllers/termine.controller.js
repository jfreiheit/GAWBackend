//CRUD-Funktionen
const Termine = require('../models/termine.models')
const mongoose = require('mongoose')
const Coachee = require("../models/coachee.models");
const User = require("../models/user.models");


module.exports.createOneTermin = async (req, res) => {
    // Create a Formular
    const termin = await new Termine({
        user: req.user.id,
        coachee: req.params.id,
        datum: req.body.datum,
        uhrzeit: req.body.uhrzeit,
        stunden: req.body.stunden,
        ort: req.body.ort,
        inhalt: req.body.inhalt,
        status: req.body.status ? req.body.status : 'offen',
        aufgabe: req.body.aufgabe,
    });

    // Save formular in the database
    termin
        .save()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Termin."
            });
        });
};

module.exports.findOneTermin = async (req, res) => {
    const id = await req.params.id;
    Termine.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Der Termin mit der ID " + id + " konnte nicht gefunden werden." });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Es gab einen Error beim Suchen von dem Termin mit der ID " + id });
        });
};

module.exports.getAllTermineByCoacheeId = async (req, res) => {

    Termine.find({
        coachee: req.params.id,
    })
        .then(data => {
            if (!data)
                res.status(404).send({message: "Es gibt keine geplante/bevorstehende Termine für den Coachee"});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Es gab einen Error beim Suchen nach den Terminen"});
        });
}

module.exports.getAllTermine = async (req, res) => {

    Termine.find({user: req.user.id})
        .then(data => {
            if (!data)
                res.status(404).send({message: "Es gibt keine geplante/bevorstehende Termine für Sie"});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Es gab einen Error beim Suchen nach den Terminen"});
        });
}

module.exports.updateTermin = async (req, res) => {
    try {
        const termin = await Termine.findOneAndUpdate(
            {_id: req.params.id},
            {$set: req.body},
            {new: true}
        )
        res.status(200).json(termin)
        //res.send({ message: "Formular wurde erfolgreich geupdated." })
    } catch (e) {
        res.status(500).send({
            message: "Error beim Updaten von dem Termin mit der ID: " + id
        });
    }
}

module.exports.deleteTermin = async (req, res) => {
    const id = req.params.id;

    Termine.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Termin mit ID: ${id} konnte nicht gelöscht werden.`
                });
            } else {
                res.send({
                    message: "Termin wurde erfolgreich gelöscht!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Termin mit der ID: " + id + " konnte nicht gelöscht werden."
            });
        });
};
