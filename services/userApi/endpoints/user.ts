import RegisterUser from "@/interface/RegisterUser";

function endpoints(builder: any) {
  return {
    userRegister: builder.mutation({
      query: (data: RegisterUser) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),
  };
}

export default endpoints;