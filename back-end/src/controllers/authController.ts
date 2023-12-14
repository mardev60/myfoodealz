import { Request, Response } from 'express';
import { userLogin } from '../services/loginService';

export const login = (req: Request, res: Response) => {
    try {
      const login = userLogin(req.body);
  
      if (login) {
        res.status(201).json({ login });
      } else {
        res.status(400).json({ error: 'Auth failed' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };