import { Request, Response } from 'express';
import {
  getAllPromotionsService,
  createPromotionService,
  updatePromotionService,
  deletePromotionService,
  getPromotionByIdService,
} from '../services/promotionService';
import { Promotion } from '../types';

export const getAllPromotions = (req: Request, res: Response) => {
  try {
    const promotions: Promotion[] = getAllPromotionsService();
    res.json({ promotions });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export function getPromotionById(req: Request, res: Response): void {
  try {
    const promotionId: number = parseInt(req.params.id, 10);
    const promotion = getPromotionByIdService(promotionId);

    if (!promotion) {
      res.status(404).json({ message: 'Promotion not found' });
    } else {
      res.status(200).json(promotion);
    }
  } catch (error) {
    console.error('Error in getPromotionById controller', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

export const createPromotion = (req: Request, res: Response) => {
  try {
    const createdPromotion = createPromotionService(req.body);

    if (createdPromotion) {
      res.status(201).json({ promotion: createdPromotion });
    } else {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updatePromotion = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updatedPromotion: Promotion = req.body;

    const result = updatePromotionService(Number(id), updatedPromotion);

    if (result) {
      res.json({ promotion: result });
    } else {
      res.status(404).json({ error: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deletePromotion = (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const result = deletePromotionService(Number(id));

    if (result) {
      res.json({ message: 'Promotion marked as hidden' });
    } else {
      res.status(404).json({ error: 'Promotion not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};