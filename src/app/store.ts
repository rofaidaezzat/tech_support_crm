import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/crudauth';
import { leadsApi } from './service/crudleads';
import { leadsAssignmentsApi } from './service/crudAssignment_lead';
import { notesApi } from './service/crudnote';
import { tasksApi } from './service/crudtasks';
import { dealsApi } from './service/cruddeals';
import { reportsApi } from './service/crudreports';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [leadsAssignmentsApi.reducerPath]: leadsAssignmentsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [dealsApi.reducerPath]: dealsApi.reducer,
    [reportsApi.reducerPath]: reportsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      leadsApi.middleware,
      leadsAssignmentsApi.middleware,
      notesApi.middleware,
      tasksApi.middleware,
      dealsApi.middleware,
      reportsApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
