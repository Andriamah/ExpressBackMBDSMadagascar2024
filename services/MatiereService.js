const Matiere = require('../model/matiere');

class MatiereService {
    async getMatieres() {
        try {
            const matieres = await Matiere.find();
            console.log(matieres);
            return matieres;
        } catch (err) {
            throw err;
        }
    }

    async createMatiere(data) {
        try {
            const matiere = new Matiere(data);
            await matiere.save();
            console.log("savee= matiere service")
            return matiere;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = MatiereService;
