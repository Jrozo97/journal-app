
function endpoints(builder: any) {
  return {
    refeshToken: builder.query({
      query: ({uid, name}: {uid: string, name: string}) => ({
        url: "/auth/renew",
        method: "GET",
        params: {uid, name},
      }),
      transformResponse: (res: any) => res || {}
    }),
  };
}

export default endpoints;