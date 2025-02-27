import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  git: false,
  singleProject: null,
};
const gitAndCollabProject = createSlice({
  name: "gitAndCollabProject",
  initialState,
  reducers: {
    set: (state, action) => {
      state.singleProject = action.payload;
    },
    remove: (state) => {
      state.singleProject = null;
    },
    gitSet: (state) => {
      state.git = true;
    },
    gitRemove: (state) => {
      state.git = false;
    },
    resetGitAndCollabProject: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { set, remove, gitSet, gitRemove, resetGitAndCollabProject } =
  gitAndCollabProject.actions;
export default gitAndCollabProject.reducer;
