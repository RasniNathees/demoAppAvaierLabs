export interface BorrowerDetails {
  id: string;
  name: string;
  email: string;
  phone: string;
  loan_amount: number;
  status: string;
  employment: string;
  income: number;
  existing_loan: number;
  credit_score: number;
  source_of_funds: string;
  risk_signal: string;
  ai_flags: string[];
}

export interface BorrowerCollection {
  [key: string]: BorrowerDetails;
}

export interface BrokerInfo {
  name: string;
  deals: number;
  approval_rate: string;
  pending: number;
}

export type WorkflowSteps = string[];