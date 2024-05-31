const Eleve = require('../model/Eleve');

class EleveService {
    async getEleves() {
        try {
            const eleves = await Eleve.find();
            console.log(eleves);
            return eleves;
        } catch (err) {
            throw err;
        }
    }

    async getEleveByPromotion(idPromotion) {
        try {
            const eleves = await Eleve.find({ id_promotion: idPromotion });
            console.log("Eleve by PROMOTION: ");
            console.log(eleves);
            return eleves;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async getEmailEleveByPromotion(idPromotion) {
        try {
            const eleves = await Eleve.find({ id_promotion: idPromotion });
            console.log("Eleve by PROMOTION: ", eleves);

            const emails = eleves.map(eleve => eleve.mail);
            console.log("Emails: ", emails);
    
            return emails;
        } catch (err) {
            console.log(err);
            throw err;
        }
    }
    

    async getEleveById(id) {
        try {
            const eleve = await Eleve.find({ _id: id });
            console.log("Eleve by ID: ");
            console.log(eleve);
            return eleve[0];
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async getEleveByMail(email) {
        try {
            const eleve = await Eleve.findOne({ mail: email });
            console.log("Eleve by mail: ");
            console.log(eleve);
            return eleve;
        } catch (err) {
            console.log(err)
            throw err;
        }
    }

    async createEleve(data) {
        try {
            const eleve = new Eleve(data);
            await eleve.save();
            console.log("save Eleve service")
            return eleve;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = EleveService;
