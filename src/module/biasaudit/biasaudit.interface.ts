export interface IBiasAudit {
    id: string;
    application: string; // Reference to Application ID
    bias_score: number; // AI-generated score for bias detection
    audit_report: string; // Detailed analysis of bias factors
    createdAt: Date;
  }