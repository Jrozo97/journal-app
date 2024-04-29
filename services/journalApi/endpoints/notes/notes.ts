import { ListNotes, DataNotes, ParamsQueryNotes } from "@/interface/Notes";

function endpoints(builder: any) {
  return {
    getNotesList: builder.query({
      query: ({ page, limit, search }: ParamsQueryNotes) => ({
        url: "/notes",
        method: "POST",
        params: { page, limit, search },
      }),
      providesTags: ["NotesList"],
      transformResponse: (res: ListNotes) => res || {},
    }),
    createNote: builder.mutation({
      query: (data: DataNotes) => ({
        url: "/notes/create",
        method: "POST",
        body: data,
      }),
      providesTags: ["NotesList"],
      transformResponse: (res: any) => res || {},
    }),
    getNoteById: builder.query({
      query: ({ id }: { id: string }) => ({
        url: `/notes/${id}`,
        method: "GET",
      }),
      transformResponse: (res: any) => res || {},
    }),
    updateNote: builder.mutation({
      query: (data: DataNotes) => ({
        url: `/notes/update/${data.id}`,
        method: "PUT",
        body: data,
      }),
      providesTags: ["NotesList"],
      transformResponse: (res: any) => res || {},
    }),
    deleteNote: builder.query({
      query: (id: string) => ({
        url: `/notes/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["NotesList"],
      transformResponse: (res: any) => res || {},
    }),
  };
}

export default endpoints;
