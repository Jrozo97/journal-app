import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import notesEndpoints from "./endpoints/notes";
import loginEndpoints from "./endpoints/login";
import { RootState } from "@/store";

export const JournalAPi = createApi({
  reducerPath: "journalApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_ENDPOINT}`,
    prepareHeaders: (headers, { getState }) => {
      const { user } = getState() as RootState;
      const userToken = user?.token;
      if (userToken) {
        headers.set("x-token", `${userToken}`);
      }
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),
  tagTypes: ["NotesList"],
  endpoints: (builder) => ({
    ...notesEndpoints(builder),
    ...loginEndpoints(builder),
  }),
});

export const {
  useLazyGetNotesListQuery,
  useCreateNoteMutation,
  useLazyGetNoteByIdQuery,
  useUpdateNoteMutation,
  useLazyRefeshTokenQuery,
} = JournalAPi;
