let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ContenuSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    id_assignment : String,
    id_eleve : String,
    commentaire: String,
    note: Number,
    reponse : String,
    dateRendu : Date,
    siNote : Boolean
});

module.exports = mongoose.model('Contenus', ContenuSchema);