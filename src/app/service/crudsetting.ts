import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReauth, setCookie } from './baseQuery';

export interface Badge {
  name: string;
  earned: boolean;
}

export interface ProfileData {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'NOT_SPECIFIED';
  language?: 'EN' | 'AR';
  task_reminder?: boolean;
  follow_up_reminder?: boolean;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  current_rank?: number;
  target_percentage?: number;
  monthly_sales?: number;
  badges?: Badge[];
  avatar?: string | null;
  rank_list?: any[];
  role?: {
    id: number;
    name: string;
  };
  user_type?: string;
}

export interface ProfileDetailsResponse {
  status: string;
  code: number;
  data: {
    profile: ProfileData;
  };
}

export interface UpdateProfileRequest {
  first_name?: string;
  last_name?: string;
  phone?: string;
  gender?: 'MALE' | 'FEMALE' | 'NOT_SPECIFIED';
  language?: 'EN' | 'AR';
  task_reminder?: boolean;
  follow_up_reminder?: boolean;
  address?: string | null;
  city?: string | null;
  country?: string | null;
}

export interface ChangePasswordRequest {
  current_password?: string;
  new_password?: string;
}

export interface GenericResponse {
  status: string;
  code: number;
  message: string;
}

export const settingsApi = createApi({
  reducerPath: 'settingsApi',
  baseQuery: baseQueryWithReauth,
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfileDetails: builder.query<ProfileDetailsResponse, void>({
      query: () => 'api/v1/sales/profile',
      providesTags: ['Profile'],
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          const userId = data?.data?.profile?.id;
          if (userId) {
            setCookie('user_id', userId);
          }
        } catch (error) {
          console.error('Fetching profile failed:', error);
        }
      },
    }),
    updateProfileInfo: builder.mutation<ProfileDetailsResponse, UpdateProfileRequest>({
      query: (body) => ({
        url: 'api/v1/sales/profile',
        method: 'PATCH',
        body,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data?.data?.profile) {
            dispatch(
              settingsApi.util.updateQueryData('getProfileDetails', undefined, (draft) => {
                if (draft?.data) {
                  draft.data.profile = {
                    ...draft.data.profile,
                    ...data.data.profile,
                  };
                }
              })
            );
          }
        } catch (error) {
          console.error('Updating profile cache failed:', error);
        }
      },
    }),
    changePassword: builder.mutation<GenericResponse, ChangePasswordRequest>({
      query: (body) => ({
        url: 'api/v1/sales/profile/change-password',
        method: 'PATCH',
        body,
      }),
    }),
    uploadProfilePicture: builder.mutation<GenericResponse, FormData>({
      query: (body) => ({
        url: 'api/v1/sales/profile/upload-photo',
        method: 'PATCH',
        body,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const {
  useGetProfileDetailsQuery,
  useUpdateProfileInfoMutation,
  useChangePasswordMutation,
  useUploadProfilePictureMutation,
} = settingsApi;

export const getAvatarUrl = (avatarPath?: string | null) => {
  if (!avatarPath) return undefined;
  let path = avatarPath;
  const newBaseUrl = 'https://backend-crm-test.el-shayeb.cloud';

  // Replace old backend url or localhost/127.0.0.1 with new ngrok url
  if (path.includes('backend-crm-test.el-shayeb.cloud')) {
    path = path.replace(/^https?:\/\/backend-crm-test\.el-shayeb\.cloud/, newBaseUrl);
  } else if (path.includes('localhost') || path.includes('127.0.0.1')) {
    path = path.replace(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/, newBaseUrl);
  }

  if (path.startsWith('http://') || path.startsWith('https://') || path.startsWith('data:') || path.startsWith('blob:')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${newBaseUrl}${cleanPath}`;
};

