import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, getCookie } from './baseQuery';
import { getSocket } from '../../socket/socket';
import { toast } from 'sonner';

// ─── Shared Sub-types ────────────────────────────────────────────────────────

export interface TicketCreatedBy {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
}

export type TicketStatus = 'OPEN' | 'IN_PROGRESS' | 'CLOSED';

// ─── Ticket Entity ────────────────────────────────────────────────────────────

export interface SupportTicket {
  id: string;
  tenant_id: string;
  created_by: TicketCreatedBy;
  title: string;
  description: string;
  status: TicketStatus;
  created_at: string;
  updated_at: string;
}

// ─── Pagination ───────────────────────────────────────────────────────────────

export interface Pagination {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  limit: number;
}

// ─── Response shapes ──────────────────────────────────────────────────────────

export interface GetTicketsResponse {
  status: string;
  code: number;
  message: string;
  data: SupportTicket[];
  pagination: Pagination;
}

export interface GetTicketResponse {
  status: string;
  code: number;
  message: string;
  data: SupportTicket;
}

export interface DeleteTicketResponse {
  status: string;
  code: number;
  message: string;
}

// ─── Request shapes ───────────────────────────────────────────────────────────

export interface GetTicketsParams {
  page?: number;
  limit?: number;
  sort?: string;
  search?: string;
  tenant_id?: string;
  status?: TicketStatus;
}

export interface CreateTicketRequest {
  title: string;
  description: string;
  /** Required only for Admin / Tech-Support roles */
  tenant_id?: string;
}

export interface UpdateTicketRequest {
  id: string;
  body: {
    title?: string;
    description?: string;
    /** Only system roles (1, 2) or ticket creator may update status */
    status?: TicketStatus;
  };
}

export interface SupportMessage {
  id: string;
  ticket_id: string;
  sender_id: string;
  sender: {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
  };
  message: string;
  created_at: string;
  updated_at: string;
}

export interface GetMessagesResponse {
  status: string;
  code: number;
  message: string;
  data: SupportMessage[];
  pagination: Pagination;
}

export interface GetMessagesParams {
  ticketId: string;
  page?: number;
  limit?: number;
}

export interface CreateMessageRequest {
  ticketId: string;
  message: string;
}

export interface CreateMessageResponse {
  status: string;
  code: number;
  message: string;
  data: SupportMessage;
}

// ─── API slice ────────────────────────────────────────────────────────────────

export const supportApi = createApi({
  reducerPath: 'supportApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['SupportTicket', 'SupportMessage'],
  endpoints: (builder) => ({

    // GET /api/v1/support  — paginated list with filters
    getTickets: builder.query<GetTicketsResponse, GetTicketsParams | void>({
      query: (params) => {
        const urlParams = new URLSearchParams();
        if (params) {
          Object.entries(params).forEach(([key, val]) => {
            if (val !== undefined && val !== null && val !== '') {
              urlParams.append(key, String(val));
            }
          });
        }
        const qs = urlParams.toString();
        return `api/v1/support${qs ? `?${qs}` : ''}`;
      },
      providesTags: (result) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'SupportTicket' as const, id })),
              { type: 'SupportTicket', id: 'LIST' },
            ]
          : [{ type: 'SupportTicket', id: 'LIST' }],
      async onCacheEntryAdded(
        arg,
        { cacheDataLoaded, cacheEntryRemoved, dispatch, updateCachedData }
      ) {
        try {
          await cacheDataLoaded;
          const token = getCookie('token');
          if (!token) return;
          const socket = getSocket(token);
 
          const handleTicketCreated = (ticket: any) => {
            // Update cached list instantly
            updateCachedData((draft) => {
              const newTicket: SupportTicket = {
                id: ticket.id,
                tenant_id: ticket.tenant_id,
                title: ticket.subject || ticket.title || '',
                description: ticket.description || '',
                status: ticket.status || 'OPEN',
                created_at: ticket.created_at || new Date().toISOString(),
                updated_at: ticket.updated_at || new Date().toISOString(),
                created_by: {
                  id: ticket.created_by_id || '',
                  first_name: 'User',
                  last_name: '',
                  email: ''
                }
              };
              const exists = draft.data.some((t) => t.id === newTicket.id);
              if (!exists) {
                draft.data.unshift(newTicket);
                if (draft.pagination) {
                  draft.pagination.totalItems += 1;
                }
              }
            });

            // Show toast notification if created by someone else
            const myUserId = getCookie('user_id');
            if (ticket.created_by_id !== myUserId) {
              toast.info(`New ticket: ${ticket.subject || ticket.title || ''}`);
            }

            // Sync full details from server
            dispatch(supportApi.util.invalidateTags([{ type: 'SupportTicket', id: 'LIST' }]));
          };
 
          const handleTicketUpdated = (ticket: any) => {
            // Update cached list instantly
            updateCachedData((draft) => {
              const index = draft.data.findIndex((t) => t.id === ticket.id);
              if (index !== -1) {
                draft.data[index] = {
                  ...draft.data[index],
                  title: ticket.subject || ticket.title || draft.data[index].title,
                  status: ticket.status || draft.data[index].status,
                  updated_at: ticket.updated_at || new Date().toISOString(),
                };
              }
            });

            // Show toast notification
            toast.info(`Ticket updated: ${ticket.subject || ticket.title || ''}`);

            // Sync full details from server
            dispatch(
              supportApi.util.invalidateTags([
                { type: 'SupportTicket', id: ticket.id },
                { type: 'SupportTicket', id: 'LIST' },
              ])
            );
          };
 
          const handleLeadAssigned = (data: any) => {
            const assignedSalesId = data?.assignment?.sales_id || data?.lead?.assigned_to_id;
            const myUserId = getCookie('user_id');
            if (myUserId && assignedSalesId === myUserId) {
              toast.info("You have been assigned a new lead!");
            }
          };
 
          socket.on('ticket:created', handleTicketCreated);
          socket.on('ticket:updated', handleTicketUpdated);
          socket.on('lead:assigned', handleLeadAssigned);
 
          await cacheEntryRemoved;
          socket.off('ticket:created', handleTicketCreated);
          socket.off('ticket:updated', handleTicketUpdated);
          socket.off('lead:assigned', handleLeadAssigned);
        } catch {}
      },
    }),

    // GET /api/v1/support/:id  — single ticket
    getTicketById: builder.query<GetTicketResponse, string>({
      query: (id) => `api/v1/support/${id}`,
      providesTags: (result, error, id) => [{ type: 'SupportTicket', id }],
    }),

    // POST /api/v1/support  — create
    createTicket: builder.mutation<GetTicketResponse, CreateTicketRequest>({
      query: (body) => ({
        url: 'api/v1/support',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'SupportTicket', id: 'LIST' }],
    }),

    // PATCH /api/v1/support/:id  — update title / description / status
    updateTicket: builder.mutation<GetTicketResponse, UpdateTicketRequest>({
      query: ({ id, body }) => ({
        url: `api/v1/support/${id}`,
        method: 'PATCH',
        body,
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'SupportTicket', id },
        { type: 'SupportTicket', id: 'LIST' },
      ],
    }),

    // DELETE /api/v1/support/:id
    deleteTicket: builder.mutation<DeleteTicketResponse, string>({
      query: (id) => ({
        url: `api/v1/support/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, id) => [
        { type: 'SupportTicket', id },
        { type: 'SupportTicket', id: 'LIST' },
      ],
    }),

    // GET /api/v1/support/:ticketId/messages — paginated messages for a ticket
    getSupportMessages: builder.query<GetMessagesResponse, GetMessagesParams>({
      query: ({ ticketId, page = 1, limit = 100 }) =>
        `api/v1/support/${ticketId}/messages?page=${page}&limit=${limit}`,
      providesTags: (result, error, { ticketId }) =>
        result
          ? [
              ...result.data.map(({ id }) => ({ type: 'SupportMessage' as const, id })),
              { type: 'SupportMessage', id: `LIST_${ticketId}` },
            ]
          : [{ type: 'SupportMessage', id: `LIST_${ticketId}` }],
      async onCacheEntryAdded(
        arg,
        { updateCachedData, cacheDataLoaded, cacheEntryRemoved }
      ) {
        try {
          await cacheDataLoaded;
          const token = getCookie('token');
          if (!token) return;
          const socket = getSocket(token);

          // Join the ticket room so we receive support_message:created events
          socket.emit('join_ticket', arg.ticketId);

          const handleSupportMessageCreated = (eventPayload: { message: SupportMessage; ticket: any }) => {
            const { message, ticket } = eventPayload;
            updateCachedData((draft) => {
              if (message.ticket_id === arg.ticketId) {
                const exists = draft.data.some((m) => m.id === message.id);
                if (!exists) {
                  draft.data.push(message);
                  if (draft.pagination) {
                    draft.pagination.totalItems += 1;
                  }
                }
              }
            });

            // Show toast notification if we did not send it
            const myUserId = getCookie('user_id');
            if (message.sender_id !== myUserId) {
              toast.info(`New reply on "${ticket?.subject || ticket?.title || 'Ticket'}": ${message.message}`);
            }
          };

          socket.on('support_message:created', handleSupportMessageCreated);

          await cacheEntryRemoved;
          // Leave the ticket room on cache cleanup
          socket.emit('leave_ticket', arg.ticketId);
          socket.off('support_message:created', handleSupportMessageCreated);
        } catch {}
      },
    }),

    // POST /api/v1/support/:ticketId/messages — create message
    createSupportMessage: builder.mutation<CreateMessageResponse, CreateMessageRequest>({
      query: ({ ticketId, message }) => ({
        url: `api/v1/support/${ticketId}/messages`,
        method: 'POST',
        body: { message },
      }),
      invalidatesTags: (result, error, { ticketId }) => [
        { type: 'SupportMessage', id: `LIST_${ticketId}` },
      ],
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketByIdQuery,
  useCreateTicketMutation,
  useUpdateTicketMutation,
  useDeleteTicketMutation,
  useGetSupportMessagesQuery,
  useCreateSupportMessageMutation,
} = supportApi;
