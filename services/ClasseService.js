const Classe = require('../model/Classe');

class ClasseService {
    async getClasses() {
        try {
            const classes = await Classe.find();
            console.log(classes);
            return classes;
        } catch (err) {
            throw err;
        }
    }

    async createClasse(data) {
        try {
            const classe = new Classe(data);
            await classe.save();
            console.log("save classe service")
            return classe;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = ClasseService;
