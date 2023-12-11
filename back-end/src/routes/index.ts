import express from 'express';
import promotionRoutes from './promotionRoutes';

const router = express.Router();

router.use('/promotions', promotionRoutes);

export default router;