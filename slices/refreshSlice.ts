import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

interface RefreshState {
  refresh: boolean;
}

const initialState: RefreshState = {
  refresh: false,
};

export const refreshSlice = createSlice({
  name: "refresh",
  initialState,
  reducers: {
    setRefresh: (state, action) => {
      return { refresh: action.payload }
    },
  },
});

export const { setRefresh } = refreshSlice.actions;
export const selectRefresh = (state: RootState) => state.refresh;
export default refreshSlice.reducer;