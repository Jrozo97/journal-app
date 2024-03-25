import notes from "./notes";

const endpoints = (builder: any) => ({
  ...notes(builder),
});

export default endpoints;