import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { billingApi } from '../api/billingApi';
import type { BillingPlan } from '../types';

interface BillingState {
  currentPlan: BillingPlan | null;
  loading: boolean;
  error: string | null;
}

const initialState: BillingState = {
  currentPlan: null,
  loading: false,
  error: null,
};

export const fetchBillingPlan = createAsyncThunk(
  'billing/fetchPlan',
  async () => {
    return await billingApi.getCurrentPlan();
  }
);

const billingSlice = createSlice({
  name: 'billing',
  initialState,
  reducers: {
    clearBillingError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchBillingPlan.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBillingPlan.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPlan = action.payload;
      })
      .addCase(fetchBillingPlan.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch billing plan';
      });
  },
});

export const { clearBillingError } = billingSlice.actions;
export default billingSlice.reducer;
