import User from "@/interface/User";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";


const initialState: User = {
  ok: false,
  uid: "",
  name: "",
  token: "",
  email: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserState: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetUserState: () => {
      return { ...initialState };
    },
  },
});

export const { setUserState, resetUserState } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
