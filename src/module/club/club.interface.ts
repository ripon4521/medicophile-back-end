// Club Interface
export interface IClub {
    club_id: string;
    club_name: string;
    description: string;
    president: string; // User ID
    members: string[]; // Array of User IDs
    events: string[]; // Array of Event IDs
  }