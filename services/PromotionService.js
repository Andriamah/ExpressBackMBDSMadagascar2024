const Promotion = require('../model/Promotion');

class PromotionService {
    async getPromotions() {
        try {
            const promotions = await Promotion.find();
            console.log(promotions);
            return promotions;
        } catch (err) {
            throw err;
        }
    }

    async createPromotion(data) {
        try {
            const promotion = new Promotion(data);
            await promotion.save();
            console.log("save promotion service")
            return promotion;
        } catch (err) {
            throw err;
        }
    }
}

module.exports = PromotionService;
