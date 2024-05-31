const ContenuService = require('../services/ContenuService');
const upload = require('../utile/multer');
const {getEleveOnline} = require('../utile/getEleveOnline');
class ContenuController {
    constructor() {
        this.ContenuService = new ContenuService();
    }

    getContenus = async (req, res) => {
        try {
            const contenus = await this.ContenuService.getContenus();
            res.send(contenus);
        } catch (err) {
            res.status(500).send(err);
        }
    };

    getContenuByEleveByAssignment = async (req, res) => {
        try {
            console.log(req.params.id_eleve)
            console.log(req.params.id_assignment)

            const contenu = await this.ContenuService.getContenuByEleveByAssignment(req.params.id_eleve, req.params.id_assignment);
            res.send(contenu);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    getContenuByAssignment = async (req, res) => {
        try {
            console.log(req.params.id_assignment)

            const contenu = await this.ContenuService.getContenuByAssignment(req.params.id_assignment);
            res.send(contenu);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    getContenuById = async (req, res) => {
        try {
            const contenu = await this.ContenuService.getContenuById(req.params.id);
            res.send(contenu);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    updateContenu = async (req, res) => {
        try {
            const { id } = req.params;
            const updateData = req.body;
            console.log(updateData)
            const updatedContenu = await this.ContenuService.updateContenu(id, updateData);
            res.send(updatedContenu);
        } catch (error) {
            console.log(error)
            res.status(500).send(error);
        }
    };

    updateContenuNote = async (req, res) => {
        try {
            const id = req.params.id;
            let updateData = {};
    
            // Check and add 'note' if present in the request body
            if (req.body.note !== undefined) {
                const note = Number(req.body.note);
                console.log('note ',note)
                if (isNaN(note)) {
                    throw new Error('La note doit être un nombre.');
                }
                updateData.note = note;
            }
    
            // Check and add 'commentaire' if present in the request body
            if (req.body.commentaire !== undefined) {

                updateData.commentaire = req.body.commentaire;
            }
    
            console.log(updateData);
            
            // Update the content in the database
            const updatedContenu = await this.ContenuService.updateContenuNote(id, updateData);
            res.send(updatedContenu);
        } catch (error) {
            console.log(error);
            res.status(500).send(error.message || error);
        }
    };
    
    

    deleteContenu = async (req, res) => {
        try {
            const { id } = req.params;
            const deletetedContenu = await this.ContenuService.deleteContenuById(id);
            res.send(deletetedContenu);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    deleteContenuByAssignment = async (req, res) => {
        try {
            const { id } = req.params;
            const deletetedContenu = await this.ContenuService.deleteContenuByIdAssignment(id);
            res.send(deletetedContenu);
        } catch (error) {
            res.status(500).send(error);
        }
    };

    // createContenu = async (req, res) => {
    //     try {
    //         upload.single('file')(req, res, async (err) => {
    //             if (err) {
    //                 return res.status(500).send(err);
    //             }
    //             console.log("ANAO UPLOAD ZAYYYYY "+req.body.id_assignment)

    //             req.body.note = 0;
    //             req.body.siNote = false;
    //             if (req.file) {
    //                 req.body.reponse = req.file.path; // Ajouter le chemin du fichier téléchargé aux données du contenu
    //                 console.log("path dans controller "+req.file.path)
    //             }else{
    //                 console.log('tsisy file')
    //             }

    //             const newContenu = await this.ContenuService.createContenu(req.body);
    //             res.status(201).send(newContenu);
    //         });
    //     } catch (err) {
    //         console.log(err);
    //         res.status(500).send(err);
    //     }
    // };
    
    createContenu = async (req, res) => {
        try {
            const eleveEnLigne = await getEleveOnline(req);
            req.body.id_eleve = eleveEnLigne._id;
            req.body.note = 0;
            req.body.siNote = false;
            const newContenu = await this.ContenuService.createContenu(req.body);
            res.status(201).send(newContenu);

        } catch (err) {
            console.log(err);
            res.status(500).send(err);
        }
    };


}

module.exports = ContenuController;
