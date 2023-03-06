const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../models/user.models')
const Coachee = require('../models/coachee.models')
const keys = require('../config/keys')
const errorHandler = require('../utils/errorHandler')

module.exports.register = async function (req, res) {
    //email password firstname lastname firmenname firmenadresse tel
    const candidate = await User.findOne({email: req.body.email})

    if (candidate) {
        //Candidate existiert bereits, dann kommt fehlermeldung
        res.status(409).json({
            message: 'Diese E-Mail existiert bereits'
        })
    } else {
        //falls nicht, dann wird eine candidate erzeugt
        const salt = bcrypt.genSaltSync(10) // verschlüsselt die Einträge in der DB, wenn angewendet
        const password = req.body.password
        const secret = req.body.secret
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            vorname: req.body.vorname,
            kontaktadresse_str: req.body.kontaktadresse_str,
            kontaktadresse_nr: req.body.kontaktadresse_nr,
            kontaktadresse_ort: req.body.kontaktadresse_ort,
            kontaktadresse_plz: req.body.kontaktadresse_plz,
            telefonnummer: req.body.telefonnummer,
            secret: bcrypt.hashSync(secret, salt),
            role: req.body.role,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : '',
            rechnungsadresse_str: req.body.rechnungsadresse_str ? req.body.rechnungsadresse_str : '',
            rechnungsadresse_nr: req.body.rechnungsadresse_nr ? req.body.rechnungsadresse_nr : '',
            rechnungsadresse_ort: req.body.rechnungsadresse_ort ? req.body.rechnungsadresse_plz : '',
            rechnungsadresse_plz: req.body.rechnungsadresse_plz ? req.body.rechnungsadresse_ort : '',
            unterschrift: req.body.unterschrift ? req.body.unterschrift : '',
        })
        try {
            await user.save()
            res.status(201).json(user)
        } catch (e) {
            //was passiert mit der Fehler?
            // Fehler wird in einem ErrorHandler aufgefangen. :-)
            errorHandler(res, e)
        }

    }
}

module.exports.createCoachee = async function (req, res) {
    //email password firstname lastname firmenname firmenadresse tel
    const candidate = await Coachee.findOne({email: req.body.email})

    if (candidate) {
        //Candidate existiert bereits, dann kommt fehlermeldung
        res.status(409).json({
            message: 'Diese E-Mail existiert bereits'
        })
    } else {
        //falls nicht, dann wird eine candidate erzeugt
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const secret = req.body.secret
        const coachee = new Coachee({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt),
            name: req.body.name,
            vorname: req.body.vorname,
            firmenname: req.body.firmenname,
            firmen_str: req.body.firmen_str,
            firmen_nr: req.body.firmen_nr,
            firmen_plz: req.body.firmen_plz,
            firmen_ort: req.body.firmen_ort,
            telefonnummer: req.body.telefonnummer ? req.body.telefonnummer : "",
            user: req.user.id,
            secret: bcrypt.hashSync(secret, salt),
            // optional
            arbeitgeber_str: req.body.arbeitgeber_str ? req.body.arbeitgeber_str : "",
            arbeitgeber_nr: req.body.arbeitgeber_nr ? req.body.arbeitgeber_nr : "",
            arbeitgeber_plz: req.body.arbeitgeber_plz ? req.body.arbeitgeber_plz : "",
            arbeitgeber_ort: req.body.arbeitgeber_ort ? req.body.arbeitgeber_ort : "",
            privat_str: req.body.privat_str ? req.body.privat_str : "",
            privat_nr: req.body.privat_nr ? req.body.privat_nr : "",
            privat_plz: req.body.privat_plz ? req.body.privat_plz : "",
            privat_ort: req.body.privat_ort ? req.body.privat_ort : "",
            mobil: req.body.mobil ? req.body.mobil : "",
            privat_email: req.body.privat_email ? req.body.privat_email : ""
        })
        try {
            await coachee.save()
            res.status(201).json(coachee)
        } catch (e) {
            //was passiert mit der Fehler?
            // Fehler wird in einem ErrorHandler aufgefangen. :-)
            errorHandler(res, e)
        }
    }
}

module.exports.findOne = async (req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (e){
        errorHandler(res, e)
    }
};

module.exports.getUsers = async (req, res) => {
    const users = await User.find();
    res.status(200).json(users);
}

module.exports.getCoachees = async (req, res) => {

    Coachee.find({user: req.params.id})
        .then(data => {
            if (!data)
                res.status(404).send({message: "Du hast keine Arbeitsfähigkeitsfälle"});
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({message: "Es gab einen Error beim Suchen von dem Coachees"});
        });
}

module.exports.update = async (req, res) => {
    const update = req.body
    if (req.file) {
        update.imageSrc = req.file.path
    }
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: update},
            {new: true})
        res.status(200).json(user)
    } catch (e) {
        errorHandler(res, e)
    }
}

module.exports.deleteUser = async (req, res) => {
    const id = req.params.id;

    User.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Der User mit ID: ${id} konnte nicht gelöscht werden.`
                });
            } else {
                res.send({
                    message: "User wurde erfolgreich gelöscht!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Der User mit der ID: " + id + " konnte nicht gelöscht werden."
            });
        });
};








