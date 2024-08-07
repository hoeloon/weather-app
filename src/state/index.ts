import { getCurrentDateTime } from "@/app/utils/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isDarkMode: boolean;
  history: any;
}

const initialState: InitialStateTypes = {
  isDarkMode: false,
  history: [{ country: "Singapore", sys: "SG", dt: getCurrentDateTime() }],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsDarkmode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    setHistory: (state, action: PayloadAction<any>) => {
      state.history = action.payload;
    },
  },
});

export const { setIsDarkmode, setHistory } = globalSlice.actions;

export default globalSlice.reducer;
