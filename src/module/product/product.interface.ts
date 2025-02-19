import { Types } from "mongoose";

export enum Category {
    Fiction = 'Fiction',
    Science = 'Science',
    SelfDevelopment = 'SelfDevelopment',
    Poetry = 'Poetry',
    Religious = 'Religious',
  }
  
  export type Product = {
    id: string; 
    image: string;
    title: string; 
    author: string; 
    price: number; 
    category:Types.ObjectId; 
    description: string; 
    quantity: number;
    inStock: boolean; 
    isActive: 'active' | 'inactive'; 
  };
  