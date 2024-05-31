let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ProfSchema = Schema({
    _id: String,
    nom: String,
    prenom: String,
    mail: String,
    mdp: String,
    id_matiere: String,
    photo: String
});

module.exports = mongoose.model('Prof', ProfSchema);
