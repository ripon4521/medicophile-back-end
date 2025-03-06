export interface IPreOrder {
  user: string;
  selected_meals: [];
  total_price: number;
  status: "Pending" | "Completed" | "Cancelled";
}
