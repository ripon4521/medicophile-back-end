export interface ICareerGrowth {
    id: string;
    job_seeker: string; // Reference to JobSeeker ID
    recommended_skills: string[];
    industry_trends: {
      skill: string;
      demand_level: 'high' | 'medium' | 'low';
    }[];
    createdAt: Date;
  }