import mongoose, { Schema } from "mongoose";
import { IEvent } from "./event.interface";

const EventSchema  = new Schema<IEvent>(
    {
      event_name: { type: String, required: true, minlength: 3 },
      date: { type: Date, required: true },
      time: { type: String  }, 
      location: { type: String, required: true, minlength: 5 },
      organizer: { type: String, required: true, minlength: 3 },
      description: { type: String, required: true, minlength: 10 },
      registration_required: { type: Boolean, required: true },
      rsvp_count: { type: Number, required: true, min: 0 },
      contact: {
        name: { type: String, required: true, minlength: 3 },
        email: { type: String, required: true, match: /^\S+@\S+\.\S+$/ },
        phone: { type: String, required: true, match: /^\+?\d{10,15}$/ },
      },
    },
    { timestamps: true } 
  );
  
  export const eventModel = mongoose.model<IEvent>("Events", EventSchema);