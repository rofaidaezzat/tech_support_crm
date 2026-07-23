import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, getCookie } from './baseQuery';
import { getSocket } from '../../socket/socket';
import { toast } from 'sonner';

// Keep track of toasted notification IDs to avoid duplicate alerts when multiple queries are active
const toastedNotificationIds = new Set<string>();

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'TASK_OVERDUE' | 'TASK_REMINDER' | 'NEW_ASSIGNMENT' | 'DEAL_UPDATE' | 'PLAN_REMINDER' | 'LEAD_UPDATE' | 'SUPPORT_TICKET' | 'SYSTEM';
  data: any;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  user_id: string;
}

export interface NotificationMeta {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface GetNotificationsResponse {
  status: string;
  code: number;
  message: string;
  data: {
    data: Notification[];
    meta: NotificationMeta;
  };
}

export interface GetUnreadCountResponse {
  status: string;
  code: number;
  message: string;
  data: {
    unread_count: number;
  };
}

export interface GenericResponse {
  status: string;
  code: number;
  message: string;
}

export interface SingleNotificationResponse {
  status: string;
  code: number;
  message: string;
  data: Notification;
}

export const notificationsApi = createApi({
  reducerPath: 'notificationsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Notification'],
  endpoints: (builder) => ({
    getNotifications: builder.query<
      GetNotificationsResponse,
      { page?: number; limit?: number; is_read?: boolean } | void
    >({
      query: (params) => {
        const queryParams = new URLSearchParams();
        if (params) {
          if (params.page !== undefined) queryParams.append('page', params.page.toString());
          if (params.limit !== undefined) queryParams.append('limit', params.limit.toString());
          if (params.is_read !== undefined) queryParams.append('is_read', params.is_read.toString());
        }
        const qs = queryParams.toString();
        return `api/v1/notifications${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.data.map(({ id }) => ({ type: 'Notification' as const, id })),
              { type: 'Notification', id: 'LIST' },
            ]
          : [{ type: 'Notification', id: 'LIST' }],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const token = getCookie('token');
          if (!token) return;
          const socket = getSocket(token);

          const handleNotificationEvent = (notification: any) => {
            if (notification && typeof notification === 'object') {
              const notifId = notification.id || String(Math.random());
              if (!toastedNotificationIds.has(notifId)) {
                toastedNotificationIds.add(notifId);
                toast.info(notification.title || 'New Notification', {
                  description: notification.body || '',
                });
                // Keep the set size bounded to prevent memory leakage over long sessions
                if (toastedNotificationIds.size > 200) {
                  const firstKey = toastedNotificationIds.values().next().value;
                  if (firstKey !== undefined) toastedNotificationIds.delete(firstKey);
                }
              }
            }
            dispatch(
              notificationsApi.util.invalidateTags([{ type: 'Notification', id: 'LIST' }])
            );
          };

          socket.on('notification', handleNotificationEvent);
          socket.on('notification:created', handleNotificationEvent);

          await cacheEntryRemoved;
          socket.off('notification', handleNotificationEvent);
          socket.off('notification:created', handleNotificationEvent);
        } catch {
          // no-op
        }
      },
    }),

    getUnreadCount: builder.query<GetUnreadCountResponse, void>({
      query: () => 'api/v1/notifications/unread-count',
      providesTags: [{ type: 'Notification', id: 'UNREAD' }],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch }
      ) {
        try {
          await cacheDataLoaded;
          const token = getCookie('token');
          if (!token) return;
          const socket = getSocket(token);

          const handleNotificationEvent = (notification: any) => {
            if (notification && typeof notification === 'object') {
              const notifId = notification.id || String(Math.random());
              if (!toastedNotificationIds.has(notifId)) {
                toastedNotificationIds.add(notifId);
                toast.info(notification.title || 'New Notification', {
                  description: notification.body || '',
                });
                if (toastedNotificationIds.size > 200) {
                  const firstKey = toastedNotificationIds.values().next().value;
                  if (firstKey !== undefined) toastedNotificationIds.delete(firstKey);
                }
              }
            }
            dispatch(
              notificationsApi.util.invalidateTags([{ type: 'Notification', id: 'UNREAD' }])
            );
          };

          socket.on('notification', handleNotificationEvent);
          socket.on('notification:created', handleNotificationEvent);

          await cacheEntryRemoved;
          socket.off('notification', handleNotificationEvent);
          socket.off('notification:created', handleNotificationEvent);
        } catch {
          // no-op
        }
      },
    }),

    markAllAsRead: builder.mutation<GenericResponse, void>({
      query: () => ({
        url: 'api/v1/notifications/read-all',
        method: 'PATCH',
      }),
      invalidatesTags: [
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'UNREAD' },
      ],
    }),

    markAsRead: builder.mutation<SingleNotificationResponse, string>({
      query: (id) => ({
        url: `api/v1/notifications/${id}/read`,
        method: 'PATCH',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Notification', id },
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'UNREAD' },
      ],
    }),

    deleteNotification: builder.mutation<GenericResponse, string>({
      query: (id) => ({
        url: `api/v1/notifications/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'Notification', id },
        { type: 'Notification', id: 'LIST' },
        { type: 'Notification', id: 'UNREAD' },
      ],
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useGetUnreadCountQuery,
  useMarkAllAsReadMutation,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
} = notificationsApi;
