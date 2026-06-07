import { createSlice } from "@reduxjs/toolkit";
import type { ColourMode } from "@lifesg/react-design-system/theme";
import type { RootState } from "../../store/index";

interface ThemeState {
  colourMode: ColourMode;
}

const initialState: ThemeState = {
  colourMode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleColourMode(state) {
      state.colourMode = state.colourMode === "light" ? "dark" : "light";
    },
  },
});

export const { toggleColourMode } = themeSlice.actions;
export const selectColourMode = (state: RootState) => state.theme.colourMode;
export default themeSlice.reducer;
