export interface IMeal {
  name: string;
  price: number;
  category: string;
  type: "breakfast" | "lunch" | "dinner";
  calories: number;
  protein: string; // Should be in "Xg" format (e.g., "12g")
  fat: string; // Should be in "Xg" format (e.g., "8g")
  carbs: string; // Should be in "Xg" format (e.g., "60g")
}

export interface IDayMeal {
  day: "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
  meals: IMeal[];
}
