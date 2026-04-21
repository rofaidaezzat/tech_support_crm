import { PLANS, type PlanId } from '../constants/plans';

export function getPlanById(planId: PlanId) {
  return PLANS[planId];
}

export function isPlanAvailable(planId: PlanId): boolean {
  return planId in PLANS;
}

export function comparePlans(planA: PlanId, planB: PlanId): number {
  const planOrder: PlanId[] = ['FREE', 'PROFESSIONAL', 'ENTERPRISE'];
  return planOrder.indexOf(planA) - planOrder.indexOf(planB);
}

export function canUpgradeTo(currentPlan: PlanId, targetPlan: PlanId): boolean {
  return comparePlans(currentPlan, targetPlan) < 0;
}
