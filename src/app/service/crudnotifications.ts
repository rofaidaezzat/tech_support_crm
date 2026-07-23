import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, getCookie } from './baseQuery';
import { getSocket } from '../../socket/socket';
import { toast } from 'sonner';

// Keep track of toasted notification IDs to avoid duplicate alerts when multiple queries are active
const toastedNotificationIds = new Set<string>();

export type NotificationType =
  | 'NEW_ASSIGNMENT'
  | 'TASK_REMINDER'
  | 'TASK_OVERDUE'
  | 'LEAD_UPDATE'
  | 'DEAL_UPDATE'
  | 'SUPPORT_TICKET'
  | 'PLAN_REMINDER'
  | 'SYSTEM';

// 14 System Triggers Metadata Interfaces
export interface TaskAssignedData { taskId: string; creatorName?: string }
export interface TaskReassignedData { taskId: string }
export interface TaskCompletedData { taskId: string; assigneeName?: string }
export interface LeadAssignedData { leadId: string; name: string }
export interface LeadAssignedEndpointData { leadId: string; name: string; assignerName?: string }
export interface LeadReassignedData { leadId: string; name: string }
export interface LeadUnassignedData { leadId: string; name: string }
export interface LeadStatusUpdatedData { leadId: string; name: string; newStatus: string }
export interface LeadConvertedData { leadId: string; name: string }
export interface DealCreatedData { dealId: string; value?: number }
export interface DealUpdatedData { dealId: string }
export interface SupportTicketCreatedData { ticketId: string; title: string }
export interface SupportTicketStatusData { ticketId: string; title: string; newStatus?: string }
export interface SupportMessageData { ticketId: string; title: string }

export type NotificationData =
  | TaskAssignedData
  | TaskReassignedData
  | TaskCompletedData
  | LeadAssignedData
  | LeadAssignedEndpointData
  | LeadReassignedData
  | LeadUnassignedData
  | LeadStatusUpdatedData
  | LeadConvertedData
  | DealCreatedData
  | DealUpdatedData
  | SupportTicketCreatedData
  | SupportTicketStatusData
  | SupportMessageData
  | Record<string, any>;

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: NotificationType;
  data?: NotificationData;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
  user_id: string;
}

export interface PaginationInfo {
  currentPage: number;
  limit: number;
  totalPages: number;
  total: number;
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
  pagination?: PaginationInfo;
  data: Notification[] | { data: Notification[]; meta?: NotificationMeta; pagination?: PaginationInfo };
}

export interface GetUnreadCountResponse {
  status: string;
  code: number;
  message: string;
  data: {
    count?: number;
    unread_count?: number;
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

// Helper to extract list from notification response safely
export const extractNotifications = (res?: GetNotificationsResponse): Notification[] => {
  if (!res?.data) return [];
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.data.data)) return res.data.data;
  return [];
};

// Helper to extract unread count safely
export const extractUnreadCount = (res?: GetUnreadCountResponse): number => {
  if (!res?.data) return 0;
  return res.data.count ?? res.data.unread_count ?? 0;
};

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
      providesTags: (result) => {
        const list = extractNotifications(result);
        return list.length > 0
          ? [
              ...list.map(({ id }) => ({ type: 'Notification' as const, id })),
              { type: 'Notification', id: 'LIST' },
            ]
          : [{ type: 'Notification', id: 'LIST' }];
      },
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
                toast.info(notification.title || 'New Support Notification', {
                  description: notification.body || '',
                });
                // Keep the set size bounded
                if (toastedNotificationIds.size > 200) {
                  const firstKey = toastedNotificationIds.values().next().value;
                  if (firstKey !== undefined) toastedNotificationIds.delete(firstKey);
                }
              }
            }
            dispatch(
              notificationsApi.util.invalidateTags([
                { type: 'Notification', id: 'LIST' },
                { type: 'Notification', id: 'UNREAD' },
              ])
            );
          };

          socket.on('notification', handleNotificationEvent);
          socket.on('notification:created', handleNotificationEvent);
          socket.on('support:notification', handleNotificationEvent);

          await cacheEntryRemoved;
          socket.off('notification', handleNotificationEvent);
          socket.off('notification:created', handleNotificationEvent);
          socket.off('support:notification', handleNotificationEvent);
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
                toast.info(notification.title || 'New Support Notification', {
                  description: notification.body || '',
                });
                if (toastedNotificationIds.size > 200) {
                  const firstKey = toastedNotificationIds.values().next().value;
                  if (firstKey !== undefined) toastedNotificationIds.delete(firstKey);
                }
              }
            }
            dispatch(
              notificationsApi.util.invalidateTags([
                { type: 'Notification', id: 'UNREAD' },
                { type: 'Notification', id: 'LIST' },
              ])
            );
          };

          socket.on('notification', handleNotificationEvent);
          socket.on('notification:created', handleNotificationEvent);
          socket.on('support:notification', handleNotificationEvent);

          await cacheEntryRemoved;
          socket.off('notification', handleNotificationEvent);
          socket.off('notification:created', handleNotificationEvent);
          socket.off('support:notification', handleNotificationEvent);
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
