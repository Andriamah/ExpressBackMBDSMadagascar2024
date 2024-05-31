let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let EleveSchema = Schema({
    _id: String,
    nom : String,
    prenom : String,
    mail : String ,
    mdp : String,
    id_promotion : String,
    photo : String
});

module.exports = mongoose.model('Eleves', EleveSchema);
