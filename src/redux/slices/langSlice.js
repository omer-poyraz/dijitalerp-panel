import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";

const initialState = {
  lang: localStorage.getItem("lang") || "tr",
};

export const langSlice = createSlice({
  name: "lang",
  initialState,
  reducers: {
    changeLang: (state, action) => {
      localStorage.setItem("lang", action.payload);
      state.lang = action.payload;
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { changeLang } = langSlice.actions;

export default langSlice.reducer;
