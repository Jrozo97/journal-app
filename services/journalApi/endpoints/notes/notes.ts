import { ListNotes, DataNotes, ParamsQueryNotes } from "@/interface/Notes";

function endpoints(builder: any) {
  return {
    getNotesList: builder.query({
      query: ({ page, limit, search }: ParamsQueryNotes) => ({
        url: "/notes",
        method: "POST",
        params: { page, limit, search },
      }),
      transformResponse: (res: ListNotes) => res || {},
    }),
    createNote: builder.mutation({
      query: (data: DataNotes) => ({
        url: "/notes/create",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: any) => res || {},
    }),
  };
}

export default endpoints;
