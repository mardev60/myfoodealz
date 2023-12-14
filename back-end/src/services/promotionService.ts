import { Promotion } from '../types';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../../data/promotions.json');

function readPromotionsFromFile(): Promotion[] {
  try {
    const data = fs.readFileSync(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading promotions from file', error);
    return [];
  }
}

function writePromotionsToFile(promotions: Promotion[]): void {
  try {
    fs.writeFileSync(dataFilePath, JSON.stringify(promotions, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing promotions to file', error);
  }
}

export function getAllPromotionsService(): Promotion[] {
  const promotions: Promotion[] = readPromotionsFromFile();
  return promotions.filter(promotion => !promotion.hidden);
}

export function getPromotionByIdService(id: number): Promotion | null {
  try {
    const promotions: Promotion[] = readPromotionsFromFile();
    const promotion = promotions.find((promo) => promo.id === id && !promo.hidden);
    return promotion || null;
  } catch (error) {
    console.error('Error getting promotion by ID', error);
    return null;
  }
}

export function createPromotionService(newPromotion: Omit<Promotion, 'id' | 'hidden' | 'creationDate'>): Promotion | null {
  try {
    const promotions: Promotion[] = readPromotionsFromFile();
    const newId : number = promotions.length + 1;
    
    const defaultPromotion: Promotion = {
      id: newId,
      hidden: false,
      creationDate : new Date(),
      ...newPromotion,
    };
    console.log(defaultPromotion);

    promotions.push(defaultPromotion);
    writePromotionsToFile(promotions);

    return defaultPromotion;
  } catch (error) {
    console.error('Error creating promotion', error);
    return null;
  }
}

export function updatePromotionService(id: number, updatedPromotion: Promotion): Promotion | null {
  try {
    const promotions: Promotion[] = readPromotionsFromFile();
    const index = promotions.findIndex((promo) => promo.id === id);

    if (index === -1) {
      return null;
    }

    promotions[index] = { ...promotions[index], ...updatedPromotion };
    writePromotionsToFile(promotions);

    return promotions[index];
  } catch (error) {
    console.error('Error updating promotion', error);
    return null;
  }
}

export function deletePromotionService(id: number): boolean {
  try {
    const promotions: Promotion[] = readPromotionsFromFile();
    const index = promotions.findIndex((promo) => promo.id === id);

    if (index === -1) {
      return false;
    }

    promotions[index].hidden = true;
    writePromotionsToFile(promotions);

    return true;
  } catch (error) {
    console.error('Error deleting promotion', error);
    return false;
  }
}