// src/features/comments/commentsApi.js
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentsApi = createApi({
  reducerPath: "commentsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001" }), // tu API local o JSON server
  tagTypes: ["Comments"],
  endpoints: (builder) => ({
    getCommentsByCharacter: builder.query({
      query: (characterId) => `/comments?characterId=${characterId}`,
      providesTags: ["Comments"],
    }),
    addComment: builder.mutation({
      query: (comment) => ({
        url: "/comments",
        method: "POST",
        body: comment,
      }),
      invalidatesTags: ["Comments"],
    }),
    deleteComment: builder.mutation({
      query: (id) => ({
        url: `/comments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comments"],
    }),
  }),
});

export const { useGetCommentsByCharacterQuery, useAddCommentMutation, useDeleteCommentMutation } = commentsApi;
