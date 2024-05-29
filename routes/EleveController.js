const EleveService = require('../services/EleveService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

class EleveController {
    constructor() {
        this.EleveService = new EleveService();
    }

    getEleves = async (req, res) => {
        try {
            const eleves = await this.EleveService.getEleves();
            res.send(eleves);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    getEleveById = async (req, res) => {
        try {
            const eleve = await this.EleveService.getEleveById(req.params.id);
            res.send(eleve);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    createEleve = async (req, res) => {
        try {
            req.body.mdp = bcrypt.hashSync(req.body.mdp, 8);
            if(req.body._id==null){
                req.body._id = new ObjectId();
            }
            const newEleve = await this.EleveService.createEleve(req.body);

            // create a token
            const token = jwt.sign({ id: newEleve._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).send({ auth: true, token: token, eleve: newEleve });
        } catch (error) {
            console.log(error);
            res.status(500).send(error);
        }
    };

    getEleveOnLine = async (req, res) => {
        try {
            const token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                try {
                    const eleve = await this.EleveService.getEleveById(decoded.id);
                    if (!eleve) return res.status(404).send("No user found.");
                    eleve.mdp = 0;

                    res.status(200).send(eleve);
                } catch (error) {
                    res.status(500).send("There was a problem finding the user.");
                }
            });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    loginEleve = async (req, res) => {
        try {
            const user = await this.EleveService.getEleveByMail(req.body.email);
            if (!user) return res.status(404).send('No user found.');

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.mdp);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: user._id }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on the server.');
        }
    };

    logOutEleve = async (req, res) => {
        res.status(200).send({ auth: false, token: null });
    };
}

module.exports = EleveController;
