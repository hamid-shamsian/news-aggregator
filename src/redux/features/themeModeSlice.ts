import { createSlice } from "@reduxjs/toolkit";

const themeModeSlice = createSlice({
  name: "themeMode",
  initialState: "light",
  reducers: {
    toggle: themeMode => (themeMode === "dark" ? "light" : "dark")
  }
});

export default themeModeSlice.reducer;

export const themeModeActions = themeModeSlice.actions;
