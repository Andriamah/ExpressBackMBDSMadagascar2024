let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    intitule : String,
    image : String 
});

module.exports = mongoose.model('Matieres', MatiereSchema);
