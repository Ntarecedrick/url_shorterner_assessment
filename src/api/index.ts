/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import urlEndpoint from "./Url";
const AppUrl = process.env.NEXT_PUBLIC_APP_URL;
console.log(AppUrl);

const baseQuery = fetchBaseQuery({
  baseUrl: AppUrl,
  prepareHeaders: async (headers) => {
    try {
      const username = process.env.NEXT_PUBLIC_API_USERNAME;
      const password = process.env.NEXT_PUBLIC_API_PASSWORD;

      const base64Credentials = btoa(`${username}:${password}`);

      headers.set("Content-Type", "application/json");
      headers.set("Authorization", `Basic ${base64Credentials}`);
      return headers;
    } catch (error) {
      console.log(error);
    }
  },
});
const baseQueryIntercept: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  const result = await baseQuery(args, api, extraOptions);
  return result;
};
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryIntercept,
  tagTypes: ["url"],
  endpoints: (builder) => ({
    ...urlEndpoint(builder as any),
  }),
});

export default api;

export const {
  useGetUrlQuery,
  useCreateUrlMutation,
  useDeleteUrlMutation,
  useUpdateUrlMutation,
} = api;
