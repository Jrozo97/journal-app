import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import endpoints from "./endpoints";

export const UserApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}/auth`,
    prepareHeaders: (headers, { getState }) => {
      const token: any = getState()
      const userToken = token.user.token;
      if (userToken) {
        headers.set("x-token", `${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    }, 
}),
  endpoints: (builder) => ({
    ...endpoints(builder),
  }),
});

export const { useUserRegisterMutation } = UserApi;
