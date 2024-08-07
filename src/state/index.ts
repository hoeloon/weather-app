import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialStateTypes {
  isSidebarCollapesed: boolean;
  isDarkMode: boolean;
  history: any;
}

const initialState: InitialStateTypes = {
  isSidebarCollapesed: false,
  isDarkMode: false,
  history: [{ country: "Singapore", sys: "SG" }],
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setIsSidebarCollapsed: (state, action: PayloadAction<boolean>) => {
      state.isSidebarCollapesed = action.payload;
    },
    setIsDarkmode: (state, action: PayloadAction<boolean>) => {
      console.log(action);
      state.isDarkMode = action.payload;
    },
    setHistory: (state, action: PayloadAction<any>) => {
      state.history = action.payload;
    },
  },
});

export const { setIsSidebarCollapsed, setIsDarkmode, setHistory } =
  globalSlice.actions;

export default globalSlice.reducer;
