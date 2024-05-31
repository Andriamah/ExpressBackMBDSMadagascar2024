const PromotionService = require('../services/PromotionService');

class PromotionController {
    constructor() {
        this.PromotionService = new PromotionService();
    }

    getPromotions = async (req, res) => {
        try {
            const promotions = await this.PromotionService.getPromotions();
            res.send(promotions);
        } catch (error) {
            error.status(500).send(error);

        }
    };

    createPromotion = async (req, res) => {
        try {
            const newPromotion = await this.PromotionService.createPromotion(req.body);
            res.status(201).send(newPromotion); 
        } catch (err) {
            console.log(err)
            res.status(500).send(err);
        }
    };
}

module.exports = PromotionController;