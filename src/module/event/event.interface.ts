// Event Interface
export interface IEvent {
    event_name: string;
    date: Date;
    time: string;
    location: string;
    organizer: string;
    description: string;
    registration_required: boolean;
    rsvp_count: number;
    contact: {
      name: string;
      email: string;
      phone: string;
    };
  }