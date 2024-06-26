const ProfService = require('../services/ProfService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;



class ProfController {
    constructor() {
        this.ProfService = new ProfService();
    }

    getProfs = async (req, res) => {
        try {
            const profs = await this.ProfService.getProfs();
            res.send(profs);
        } catch (error) {
            error.status(500).send(error);

        }
    };



    createProf = async (req, res) => {
        try {
            req.body.mdp = bcrypt.hashSync(req.body.mdp, 8);
            if(req.body._id==null){
                req.body._id = new ObjectId();
            }
            const newProf = await this.ProfService.createProf(req.body);

            // create a token
            const token = jwt.sign({ id: newProf._id, id_matiere: newProf.id_matiere }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(201).send({ auth: true, token: token, prof: newProf });
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    };

    getProfOnLine = async (req, res) => {
        try {
            const token = req.headers['x-access-token'];
            if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });

            jwt.verify(token, config.secret, async (err, decoded) => {
                if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });

                try {
                    const prof = await this.ProfService.getProfById(decoded.id);
                    if (!prof) return res.status(404).send("No user found.");
                    prof.mdp = 0

                    res.status(200).send(prof);
                } catch (error) {
                    res.status(500).send("There was a problem finding the user.");
                }
            });
        } catch (error) {
            res.status(500).send(error);
        }
    };

    loginProf = async (req, res) => {
        try {
            const user = await this.ProfService.getProfByMail(req.body.email);
            if (!user) return res.status(404).send('No user found.');

            const passwordIsValid = bcrypt.compareSync(req.body.password, user.mdp);
            if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });

            const token = jwt.sign({ id: user._id, id_matiere: user.id_matiere }, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({ auth: true, token: token , id_matiere : user.id_matiere });
        } catch (err) {
            console.error(err);
            res.status(500).send('Error on the server.');
        }
    };

    logOutProf = async (req, res) => {
        res.status(200).send({ auth: false, token: null });
    };
}

module.exports = ProfController;