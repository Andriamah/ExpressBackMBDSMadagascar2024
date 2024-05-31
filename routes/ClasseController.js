const ClasseService = require('../services/ClasseService');

class ClasseController {
    constructor() {
        this.ClasseService = new ClasseService();
    }

    getClasses = async (req, res) => {
        try {
            const classes = await this.ClasseService.getClasses();
            res.send(classes);
        } catch (error) {
            error.status(500).send(error);

        }
    };

    createClasses = async (req, res) => {
        try {
            const newClasse = await this.ClasseService.createClasse(req.body);
            res.status(201).send(newClasse); 
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    };
}

module.exports = ClasseController;