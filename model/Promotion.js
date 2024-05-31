let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PromotionSchema = Schema({
    _id: String,
    intitule : String
});

module.exports = mongoose.model('Promotions', PromotionSchema);
