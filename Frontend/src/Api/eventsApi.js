

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8000/api/v1/',
    credentials: 'include', // Ensures token is sent as a cookie
  }),
  tagTypes: ['Event'], // Add tag for cache management
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: () => 'events/', // Endpoint to get all events
      providesTags: ['Event'],
    }),
    createEvent: builder.mutation({
      query: (newEvent) => ({
        url: 'events/',
        method: 'POST',
        body: newEvent,
      }),
      invalidatesTags: ['Event'],
    }),
    getEventById: builder.query({
      query: (id) => `events/${id}`, // Endpoint to get an event by ID
      providesTags: ['Event'],
    }),
    updateEvent: builder.mutation({
      query: ({ id, updatedEvent }) => ({
        url: `events/${id}`,
        method: 'PUT',
        body: updatedEvent, // Send updated event data
      }),
      invalidatesTags: ['Event'],
    }),
  }),
});

export const {
  useGetEventsQuery,
  useCreateEventMutation,
  useGetEventByIdQuery,
  useUpdateEventMutation,
} = eventsApi;


export default eventsApi