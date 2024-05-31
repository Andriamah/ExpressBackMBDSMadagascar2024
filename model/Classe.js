let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ClasseSchema = Schema({
    // _id: Number,
    intitule : String,
});

module.exports = mongoose.model('Classes', ClasseSchema);
