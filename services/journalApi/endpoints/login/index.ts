import login from "./login";

const endpoints = (builder: any) => ({
  ...login(builder),
});

export default endpoints;