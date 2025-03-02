// PreOrder Interface
export interface IPreOrder {
    order_id: string;
    user: string; // User ID
    selected_meals: {
      meal_name: string;
      day: string;
      quantity: number;
      price: number;
    }[];
    total_price: number;
    pickup_time: string;
    payment_method: string;
    status: "Pending" | "Completed" | "Cancelled";
  }