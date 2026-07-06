import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, getCookie } from './baseQuery';
import { getSocket } from '../../socket/socket';

export interface Message {
  id: string;
  tenant_id: string;
  lead_id: string | null;
  message_id: string;
  direction: 'INCOMING' | 'OUTGOING';
  type: 'TEXT' | 'IMAGE' | 'AUDIO' | string;
  source: 'WHATSAPP' | string;
  content: string;
  status: 'sent' | 'delivered' | 'read' | 'received' | null;
  created_at: string;
  updated_at: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  total: number;
  limit: number;
}

export interface GetMessagesResponse {
  status: string;
  code?: number;
  results?: number;
  message: string;
  pagination: PaginationInfo;
  data: Message[];
}

export interface GetMessagesParams {
  leadId: string;
  page?: number;
  limit?: number;
  sort?: string;
}

export interface SendMessageRequest {
  lead_id: string;
  content: string;
}

export interface SendMessageResponse {
  status: string;
  message: string;
  data: Message;
}

export const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Message'],
  endpoints: (builder) => ({
    getMessagesForLead: builder.query<GetMessagesResponse, GetMessagesParams>({
      query: ({ leadId, page = 1, limit = 20, sort = 'created_at' }) => {
        const queryParams = new URLSearchParams();
        queryParams.append('page', page.toString());
        queryParams.append('limit', limit.toString());
        if (sort) queryParams.append('sort', sort);
        return `api/v1/messages/lead/${leadId}?${queryParams.toString()}`;
      },
      providesTags: (result, error, { leadId }) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'Message' as const, id })),
              { type: 'Message', id: `LEAD_${leadId}` },
            ]
          : [{ type: 'Message', id: `LEAD_${leadId}` }],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          // Wait for the initial query to resolve before starting the socket
          await cacheDataLoaded;

          const token = getCookie('token');
          if (!token) return;

          const socket = getSocket(token);

          // Join the room for this lead
          socket.emit('join_lead', arg.leadId);

          // Handle message:created event
          const handleMessageCreated = (message: Message) => {
            updateCachedData((draft) => {
              if (message.lead_id === arg.leadId) {
                const exists = draft.data.some((m) => m.id === message.id);
                if (!exists) {
                  if (arg.sort === '-created_at') {
                    draft.data.unshift(message);
                  } else {
                    draft.data.push(message);
                  }
                  if (draft.pagination) {
                    draft.pagination.total += 1;
                  }
                }
              }
            });
          };

          // Handle message:status_updated event
          const handleMessageStatusUpdated = (statusUpdate: { messageId: string; status: string; leadId: string }) => {
            updateCachedData((draft) => {
              if (statusUpdate.leadId === arg.leadId) {
                const message = draft.data.find(
                  (m) => m.id === statusUpdate.messageId || m.message_id === statusUpdate.messageId
                );
                if (message) {
                  message.status = statusUpdate.status as any;
                }
              }
            });
          };

          socket.on('message:created', handleMessageCreated);
          socket.on('message:status_updated', handleMessageStatusUpdated);

          // Clean up on cache entry removal
          await cacheEntryRemoved;

          socket.emit('leave_lead', arg.leadId);
          socket.off('message:created', handleMessageCreated);
          socket.off('message:status_updated', handleMessageStatusUpdated);
        } catch {
          // no-op
        }
      },
    }),
    sendMessage: builder.mutation<SendMessageResponse, SendMessageRequest>({
      query: (body) => ({
        url: 'api/v1/messages/send',
        method: 'POST',
        body,
      }),
      invalidatesTags: (result, error, { lead_id }) => [
        { type: 'Message', id: `LEAD_${lead_id}` },
      ],
    }),
  }),
});

export const {
  useGetMessagesForLeadQuery,
  useSendMessageMutation,
} = messagesApi;
