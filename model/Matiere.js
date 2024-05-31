let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let MatiereSchema = Schema({
    _id: String,
    intitule : String,
    image : String 
});

module.exports = mongoose.model('Matieres', MatiereSchema);
