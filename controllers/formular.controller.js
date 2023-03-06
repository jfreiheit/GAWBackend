//CRUD-Funktionen
const Formulare = require('../models/formulare.models')
const mongoose = require('mongoose')
const Coachee = require("../models/coachee.models");
const User = require("../models/user.models");
const errorHandler = require("../utils/errorHandler");
const Grid = require("gridfs-stream");
const keys = require("../config/keys");
const connect = mongoose.createConnection(keys.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true})


let gfs, gfsb
connect.once('open', () => {
    gfsb = new mongoose.mongo.GridFSBucket(connect.db, {
        bucketName: "fs"
    })
    gfs = Grid(connect.db, mongoose.mongo)
    gfs.collection('fs')
})

module.exports.createOne = async (req, res) => {
    // Create a Formular
        const formular = await new Formulare({
            title: req.body.title,
            user: req.user.id,
            coachee: req.params.id, // req.coachee.id
            inhalt: req.body.inhalt,
        });

        // Save formular in the database
        formular
            .save()
            .then(data => {
                res.send(data);
            })
            .catch(err => {
                res.status(500).send({
                    message:
                        err.message || "Some error occurred while creating the Formular."
                });
            });
}

    module.exports.findOne = async (req, res) => {
        const id = await req.params.id;
        Formulare.findById(id)
            .then(data => {
                if (!data)
                    res.status(404).send({message: "Das Formular mit der ID " + id + " konnte nicht gefunden werden."});
                else res.send(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Es gab einen Error beim Suchen von dem Formular mit der ID " + id});
            });
    };

    module.exports.getFormulare = async (req, res) => {

        Formulare.find({coachee: req.params.id})
            .then(data => {
                if (!data)
                    res.status(404).send({message: "Es gibt keine abgespreicherten Formulare für den Coachee"});
                else res.send(data);
            })
            .catch(err => {
                res
                    .status(500)
                    .send({message: "Es gab einen Error beim Suchen von den Formularen"});
            });
    }

    module.exports.update = async (req, res) => {
        const update = req.body
        if (req.file) {
            update.pdf = req.file.path
        }
        try {
            const formular = await Formulare.findOneAndUpdate(
                {_id: req.params.id},
                {$set: update},
                {new: true})
            res.status(200).json(formular)
        } catch (e) {
            errorHandler(res, e)
        }
    }

    module.exports.deleteFormulare = async (req, res) => {
        const id = req.params.id;

        Formulare.findByIdAndRemove(id)
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Das Formular mit ID: ${id} konnte nicht gelöscht werden.`
                    });
                } else {
                    res.send({
                        message: "Formular wurde erfolgreich gelöscht!"
                    });
                }
            })
            .catch(err => {
                res.status(500).send({
                    message: "Das Formular mit der ID: " + id + " konnte nicht gelöscht werden."
                });
            });
    };
