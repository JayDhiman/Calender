import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:8000/api/v1/auth' }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: '/register',
        method: 'POST',
        body: userData,
      }),
    }),
    login: builder.mutation({
      query: (userData) => ({
        url: '/login',
        method: 'POST',
        body: userData,
      }),
    }),
    getUserDetails: builder.query({
      query: () => '/me',
    }),
    updateUser: builder.mutation({
      query: (userData) => ({
        url: '/me/update',
        method: 'PUT',
        body: userData,
      }),
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} = userApi;

export default userApi;
