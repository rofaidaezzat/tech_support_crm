import { Card, CardHeader, CardTitle, CardContent } from '../../../components/ui/card';
import type { BillingPlan } from '../types';

interface BillingCardProps {
  plan: BillingPlan | null;
}

export function BillingCard({ plan }: BillingCardProps) {
  if (!plan) {
    return <div>No billing plan found</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Current Plan: {plan.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-2xl">${plan.price}/month</p>
        <p className="text-muted-foreground mt-2">{plan.description}</p>
      </CardContent>
    </Card>
  );
}
