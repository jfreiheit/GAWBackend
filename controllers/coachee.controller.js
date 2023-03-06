//CRUD-Funktionen
const Coachee = require('../models/coachee.models')
const errorHandler = require("../utils/errorHandler");

module.exports.findOne = async (req, res) => {
    try{
        const coachee = await Coachee.findById(req.params.id)
        res.status(200).json(coachee)
    } catch (e){
        errorHandler(res, e)
    }
};

module.exports.update = (req, res) => {
    if (!req.body) {
        return res.status(400).send({
            message: "Die gesendete Datei darf nicht leer sein!"
        });
    }

    const id = req.params.id;
    if(req.body){

        Coachee.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
            .then(data => {
                if (!data) {
                    res.status(404).send({
                        message: `Der Coachee mit folgender ID: ${id} konnte nicht updated werden.`
                    });
                } else res.send({ message: "Coachee wurde erfolgreich updated." });
            })
            .catch(err => {
                res.status(500).send({
                    message: "Error beim Updaten von dem Coachee mit der ID: " + id
                });
            })
}};

module.exports.deleteCoachee = async (req, res) => {
    const id = req.params.id;

    Coachee.findByIdAndRemove(id)
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Der Coachee mit ID: ${id} konnte nicht gelöscht werden.`
                });
            } else {
                res.send({
                    message: "Coachee wurde erfolgreich gelöscht!"
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Der Coachee mit der ID: " + id + " konnte nicht gelöscht werden."
            });
        });
};
