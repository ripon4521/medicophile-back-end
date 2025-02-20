export interface IGlobalTalent {
    id: string;
    job: string; // Reference to Job ID
    country: string;
    language_requirements: string[];
    timezone: string;
  }