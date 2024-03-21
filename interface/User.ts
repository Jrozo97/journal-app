interface User {
  ok: boolean;
  uid: string;
  name: string;
  token: string;
  email?: string;
}

export default User;