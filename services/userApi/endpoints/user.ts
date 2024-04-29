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
    })
  };
}

export default endpoints;