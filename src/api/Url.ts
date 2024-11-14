/* eslint-disable @typescript-eslint/no-empty-object-type */
import { CreateUrl, DeleteUrl, ResponseUrl, UpdateUrl } from "@/types/urlTypes";
import { EndpointBuilder } from "@reduxjs/toolkit/query";
import {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from "@reduxjs/toolkit/query/react";


const urlEndpoint = (  builder: EndpointBuilder<
    BaseQueryFn<
      string | FetchArgs,
      unknown,
      FetchBaseQueryError,
      {},
      FetchBaseQueryMeta
    >,
    "url",
    "url"
  >) => ({
    getUrl: builder.query<ResponseUrl[], void>({
        query: () => ({
            url: "/urls",
        }),
        providesTags: ["url"],
    }),
    createUrl: builder.mutation<ResponseUrl, CreateUrl>({
        query: (data) => ({
            url: "/urls",
            method: "POST",
            body: data,
        }),
        invalidatesTags: ["url"],
    }),
    deleteUrl: builder.mutation<ResponseUrl, DeleteUrl>({
      query: ({ id }) => ({
        url: `/urls/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["url"],
    }),
    updateUrl: builder.mutation<ResponseUrl, UpdateUrl>({
      query: ({ id, ...data }) => ({
        url: `/urls/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["url"],
    }),
});

export default urlEndpoint;