import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store/index";

interface GeneratorState {
  prompt: string;
  progress: number | null;
  progressStage: string | null;
}

const initialState: GeneratorState = {
  prompt: "",
  progress: null,
  progressStage: null,
};

const generatorSlice = createSlice({
  name: "generator",
  initialState,
  reducers: {
    setPrompt(state, action: PayloadAction<string>) {
      state.prompt = action.payload;
    },
    setProgress(state, action: PayloadAction<{ progress: number; stage: string }>) {
      state.progress = action.payload.progress;
      state.progressStage = action.payload.stage;
    },
    resetProgress(state) {
      state.progress = null;
      state.progressStage = null;
    },
  },
});

export const { setPrompt, setProgress, resetProgress } = generatorSlice.actions;

export const selectPrompt = (state: RootState) => state.generator.prompt;
export const selectProgress = (state: RootState) => state.generator.progress;
export const selectProgressStage = (state: RootState) => state.generator.progressStage;

export default generatorSlice.reducer;
