export interface IBus {
    route_id: string;
    route_name: string;
    stops: {
      stop_name: string;
      arrival_time: string;
      departure_time: string;
    }[];
    bus_number: string;
    driver_name: string;
    contact: string;
    status: "On Time" | "Delayed" | "Cancelled";
  }