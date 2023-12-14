import express from 'express';
import promotionRoutes from './promotionRoutes';
import authRoutes from './authRoutes';

const router = express.Router();

router.use('/promotions', promotionRoutes);
router.use('/auth', authRoutes);

export default router;