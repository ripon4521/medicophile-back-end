import mongoose, { Schema } from "mongoose";
import { IBus } from "./bus.interface";

const busSchema = new Schema<IBus>({
    route_id: { type: String, required: false },
    route_name: { type: String, required: false },
    stops: [
      {
        stop_name: { type: String, required: false },
        arrival_time: { type: String, required: false },
        departure_time: { type: String, required: false }
      }
    ],
    bus_number: { type: String, required: false },
    driver_name: { type: String, required: false },
    contact: { type: String, required: false },
    status: { type: String, enum: ["On Time", "Delayed", "Cancelled"], required: false }
  },{ timestamps: true });


  export const busModel = mongoose.model<IBus>("Bus", busSchema);