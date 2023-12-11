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
  return readPromotionsFromFile();
}

export function createPromotionService(newPromotion: Omit<Promotion, 'id' | 'hidden'>): Promotion | null {
  try {
    const promotions: Promotion[] = readPromotionsFromFile();

    const defaultPromotion: Promotion = {
      id: promotions.length + 1,
      hidden: false,
      ...newPromotion,
    };

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