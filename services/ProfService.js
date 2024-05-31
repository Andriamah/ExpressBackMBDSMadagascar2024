const Prof = require('../model/Prof');

class ProfService {
    async getProfs() {
        try {
            const profs = await Prof.find();
            console.log(profs);
            return profs;
        } catch (err) {
            throw err;
        }
    }

    async getProfById(id) {
        try {
            const prof = await Prof.findOne({ _id: id });
            console.log("prof by ID: ");
            console.log(prof);
            return prof;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async getProfByMail(email) {
        try {
            const prof = await Prof.findOne({ mail: email });
            console.log("prof by mail: ");
            console.log(prof);
            return prof;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async createProf(data) {
        try {
            const prof = new Prof(data);
            await prof.save();
            console.log("save Prof service")
            return prof;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ProfService;
