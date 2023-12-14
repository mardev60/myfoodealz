import express from 'express';
import {
    getAllPromotions,
    createPromotion, 
    deletePromotion, 
    updatePromotion,
    getPromotionById
} from '../controllers/promotionController';

const router = express.Router();

router.get('/', getAllPromotions);
router.get('/:id', getPromotionById);
router.post('/', createPromotion);
router.delete('/:id', deletePromotion);
router.put('/:id', updatePromotion);

export default router;
