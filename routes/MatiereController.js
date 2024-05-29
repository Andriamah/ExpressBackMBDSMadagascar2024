const MatiereService = require('../services/MatiereService');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class MatiereController {
    constructor() {
        this.MatiereService = new MatiereService();
    }

    getMatieres = async (req, res) => {
        try {
            const matieres = await this.MatiereService.getMatieres();
            res.send(matieres);
        } catch (error) {
            error.status(500).send(error);

        }
    };

    createMatiere = async (req, res) => {
        try {
            if(req.body._id==null){
                req.body._id = new ObjectId();
            }
            const newMatiere = await this.MatiereService.createMatiere(req.body);
            res.status(201).send(newMatiere); 
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    };
}

module.exports = MatiereController;