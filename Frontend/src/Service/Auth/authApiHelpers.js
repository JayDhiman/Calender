import { apiSlice } from "../../app/api/authApiSlice";

export const authApiHelper = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/register",
        method: "POST",
        body: userData,
      }),
    }),

    login: builder.mutation({
      query: (credentials) => ({
        url: "/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    logOut: builder.mutation({
      query: () => ({
        url: "/logout",
        method: "POST",
      }),
    }),
    getUserDetails: builder.query({
      query: () => ({
        url: "/me",
      }),
    }),
    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/refresh-token",
        method: "POST",
        body:{ refreshToken }
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogOutMutation,
  useGetUserDetailsQuery,
  useRefreshTokenMutation,
} = authApiHelper;
