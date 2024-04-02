import RegisterUser from "@/interface/RegisterUser";

function endpoints(builder: any) {
  return {
    userRegister: builder.mutation({
      query: (data: RegisterUser) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
      transformResponse: (res: any) => res || {}
    }),
    refeshToken: builder.query({
      query: ({uid, name}: {uid: string, name: string}) => ({
        url: "/renew",
        method: "GET",
        params: {uid, name},
      }),
      transformResponse: (res: any) => res || {}
    }),
  };
}

export default endpoints;