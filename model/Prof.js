let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    nom: String,
    prenom: String,
    mail: String,
    mdp: String,
    id_matiere: String,
    photo: String
});

module.exports = mongoose.model('Prof', ProfSchema);
