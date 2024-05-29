let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let AssignmentSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    titre: String,
    id_matiere : String,
    id_promotion : String,
    Description: String,
    id_type_a_rendre : String,
    dateRendu : Date,
    email_reminder : Boolean
});

module.exports = mongoose.model('Assignments', AssignmentSchema);