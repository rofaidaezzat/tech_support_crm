export interface BillingPlan {
  id: string;
  name: string;
  price: number;
  description: string;
  features: string[];
}

export interface BillingSubscription {
  id: string;
  planId: string;
  status: 'active' | 'inactive' | 'cancelled';
  startDate: string;
  endDate?: string;
}
