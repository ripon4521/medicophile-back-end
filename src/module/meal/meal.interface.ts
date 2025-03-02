export interface IMeal {
    day: string;
    meals: {
      name: string;
      price: number;
      nutrition: {
        calories: number;
        protein: string;
        fat: string;
        carbs: string;
      };
    }[];
  }
  