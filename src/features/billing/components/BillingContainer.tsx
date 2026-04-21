import { useBillingData } from '../hooks/useBillingData';
import { BillingCard } from './BillingCard';

export function BillingContainer() {
  const { currentPlan, loading } = useBillingData();

  if (loading) {
    return <div>Loading billing information...</div>;
  }

  return (
    <div className="space-y-6">
      <BillingCard plan={currentPlan} />
    </div>
  );
}
