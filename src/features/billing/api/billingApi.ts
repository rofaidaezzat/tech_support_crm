import { apiClient } from '../../../api/client';
import type { BillingPlan } from '../types';

export const billingApi = {
  async getCurrentPlan(): Promise<BillingPlan> {
    // Mock API call - replace with real endpoint
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: '1',
          name: 'Professional',
          price: 29,
          description: 'For growing teams',
          features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
        });
      }, 500);
    });
  },

  async updatePlan(planId: string): Promise<BillingPlan> {
    // Mock API call - replace with real endpoint
    return apiClient.post('/billing/plan', { planId });
  },
};
