const jwt = require('jsonwebtoken');
const config = require('../config');
const EleveService = require('../services/EleveService');

async function getEleveOnLine(req) {
    try {
        const token = req.headers['x-access-token'];

        if (!token) {
            throw new Error('No token provided.');
        }

        const decoded = jwt.verify(token, config.secret);
        const EleveService = new EleveService();
        const eleve = await EleveService.getProfById(decoded.id);
        // console.log('getProfOnLine called with name:', prof.nom);

        if (!eleve) {
            throw new Error('No user found.');
        }

        // Optionally, modify the eleve object here if needed
        eleve.mdp = 0;

        return eleve;
    } catch (error) {
        throw error; // Propagate the error to the caller
    }
}

module.exports = { getEleveOnLine };
