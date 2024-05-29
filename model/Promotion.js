let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let PromotionSchema = Schema({
    // _id: { type: mongoose.Schema.Types.ObjectId, default: mongoose.Types.ObjectId },
    intitule : String
});

module.exports = mongoose.model('Promotions', PromotionSchema);
