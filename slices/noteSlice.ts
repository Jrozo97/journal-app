import { InitialDataNoteRefresh } from "@/interface/Notes";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialDataNoteRefresh = {
  note: {
    title: "",
    content: "",
    img: "",
    userId: "",
  }
};


export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNoteState: (state, action) => {
      return { ...state, ...action.payload };
    },

    resetNoteState: () => {
      return { ...initialState };
    },
  },
});

export const { setNoteState, resetNoteState } = noteSlice.actions;

export const selectNote = (state: RootState) => state.note;

export default noteSlice.reducer;
