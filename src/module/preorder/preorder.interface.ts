// PreOrder Interface
export interface IPreOrder {
    user: string; 
    selected_meals_id: string; 
    total_price: number;
    pickup_time: string;
    payment_method: string;
    status: "Pending" | "Completed" | "Cancelled";
  }