import { Request, Response } from 'express';
import {
  getAllPromotionsService,
  createPromotionService,
  updatePromotionService,
  deletePromotionService,
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

export const createPromotion = (req: Request, res: Response) => {
  try {
    const { title, commerceName, creationDate, content, image }: Promotion = req.body;
    const newPromotion: Promotion = {
      title, commerceName, creationDate : new Date(), content, image, id: 0, hidden: false
    };

    const createdPromotion = createPromotionService(newPromotion);

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