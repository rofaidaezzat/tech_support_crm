import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { fetchBillingPlan } from '../store/billingSlice';

export function useBillingData() {
  const dispatch = useAppDispatch();
  const { currentPlan, loading, error } = useAppSelector((state) => state.billing);

  useEffect(() => {
    dispatch(fetchBillingPlan());
  }, [dispatch]);

  return {
    currentPlan,
    loading,
    error,
  };
}
