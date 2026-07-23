import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth } from './baseQuery';

export interface RegisterDeviceRequest {
  device_token: string;
  device_name?: string;
  device_type?: 'IOS' | 'ANDROID' | 'WEB';
}

export interface DeregisterDeviceRequest {
  device_token: string;
}

export interface RegisterDeviceResponse {
  status: string;
  code: number;
  message: string;
  data: {
    id: string;
    user_id: string;
    device_token: string;
    device_name?: string;
    device_type?: 'IOS' | 'ANDROID' | 'WEB';
    created_at: string;
    updated_at: string;
  };
}

export interface GenericResponse {
  status: string;
  code: number;
  message: string;
}

export const devicesApi = createApi({
  reducerPath: 'devicesApi',
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    registerDevice: builder.mutation<RegisterDeviceResponse, RegisterDeviceRequest>({
      query: (body) => ({
        url: 'api/v1/devices',
        method: 'POST',
        body,
      }),
    }),
    deregisterDevice: builder.mutation<GenericResponse, DeregisterDeviceRequest>({
      query: (body) => ({
        url: 'api/v1/devices',
        method: 'DELETE',
        body,
      }),
    }),
  }),
});

export const {
  useRegisterDeviceMutation,
  useDeregisterDeviceMutation,
} = devicesApi;
