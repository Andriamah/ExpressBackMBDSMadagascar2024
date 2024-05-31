let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContenuSchema = Schema({
    _id: String,
    id_assignment : String,
    id_eleve : String,
    commentaire: String,
    note: Number,
    reponse : String,
    dateRendu : Date,
    siNote : Boolean
});

module.exports = mongoose.model('Contenus', ContenuSchema);