import { InitialDataNoteRefresh } from "@/interface/Notes";
import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: InitialDataNoteRefresh = {
  note: {
    title: "",
    content: "",
    img: "",
    userId: "",
  },
  refresh: false,
};


export const noteSlice = createSlice({
  name: "note",
  initialState,
  reducers: {
    setNoteState: (state, action) => {
      return { ...state, ...action.payload };
    },
    refreshNoteState: (state, action) => {
      return { ...state, refresh: action.payload }
    },
    resetNoteState: () => {
      return { ...initialState };
    },
  },
});

export const { setNoteState, resetNoteState, refreshNoteState } = noteSlice.actions;

export const selectNote = (state: RootState) => state.note;

export default noteSlice.reducer;