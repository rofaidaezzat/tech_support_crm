export const PLANS = {
  FREE: {
    id: 'free',
    name: 'Free',
    price: 0,
    features: ['1 project', 'Basic support', 'Community access'],
  },
  PROFESSIONAL: {
    id: 'professional',
    name: 'Professional',
    price: 29,
    features: ['Unlimited projects', 'Priority support', 'Advanced analytics'],
  },
  ENTERPRISE: {
    id: 'enterprise',
    name: 'Enterprise',
    price: 99,
    features: ['Everything in Professional', 'Custom integrations', 'Dedicated support'],
  },
} as const;

export type PlanId = keyof typeof PLANS;
