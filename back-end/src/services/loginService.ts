import { User } from '../types';
import fs from 'fs';
import path from 'path';

const dataFilePath = path.join(__dirname, '../../data/users.json');

function readUsersFromFile(): User[] {
    try {
      const data = fs.readFileSync(dataFilePath, 'utf-8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users from file', error);
      return [];
    }
  }

export function userLogin(user : User): object | null {
    try {
      const users : User[] = readUsersFromFile();
      const userFound = users.find((u) => u.username === user.username && u.password === user.password);
      if(userFound){
        return {username : userFound.username, logged : true}
      }
      else {
        return {username : '', logged : false}
      }
    } catch (error) {
      console.error('Error logging user', error);
      return null;
    }
  }