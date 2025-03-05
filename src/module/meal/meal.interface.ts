export interface IMeal {
  day: string;
  name: string;
  price: number;
  category: string;
  type: "breakfast" | "lunch" | "dinner";
  calories: number;
  protein: string;
  fat: string;
  carbs: string;
}
