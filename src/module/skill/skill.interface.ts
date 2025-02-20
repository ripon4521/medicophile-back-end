export interface ISkill {
    id: string;
    name: string;
    category: 'technical' | 'soft_skills';
    description?: string;
  }