import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/crudauth';
import { leadsApi } from './service/crudleads';
import { leadsAssignmentsApi } from './service/crudAssignment_lead';
import { notesApi } from './service/crudnote';
import { tasksApi } from './service/crudtasks';
import { settingsApi } from './service/crudsetting';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [leadsAssignmentsApi.reducerPath]: leadsAssignmentsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      leadsApi.middleware,
      leadsAssignmentsApi.middleware,
      notesApi.middleware,
      tasksApi.middleware,
      settingsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
