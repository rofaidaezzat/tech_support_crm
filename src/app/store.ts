import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './service/crudauth';
import { leadsApi } from './service/crudleads';
import { leadsAssignmentsApi } from './service/crudAssignment_lead';
import { notesApi } from './service/crudnote';
import { tasksApi } from './service/crudtasks';
import { settingsApi } from './service/crudsetting';
import { supportApi } from './service/crudSupport ticket';
import { messagesApi } from './service/message_Lead';
import { notificationsApi } from './service/crudnotifications';
import { devicesApi } from './service/cruddevices';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [leadsApi.reducerPath]: leadsApi.reducer,
    [leadsAssignmentsApi.reducerPath]: leadsAssignmentsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
    [settingsApi.reducerPath]: settingsApi.reducer,
    [supportApi.reducerPath]: supportApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [notificationsApi.reducerPath]: notificationsApi.reducer,
    [devicesApi.reducerPath]: devicesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      leadsApi.middleware,
      leadsAssignmentsApi.middleware,
      notesApi.middleware,
      tasksApi.middleware,
      settingsApi.middleware,
      supportApi.middleware,
      messagesApi.middleware,
      notificationsApi.middleware,
      devicesApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
