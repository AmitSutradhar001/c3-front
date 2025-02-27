import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  projects: [],
};
export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    set: (state, action) => {
      state.projects = action.payload;
    },
    resetProjects: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { set, resetProjects } = projectsSlice.actions;

export default projectsSlice.reducer;
