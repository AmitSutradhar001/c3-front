import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "string",
  phone_number: "string",
  role: "string",
  stack: ["string"],
  bio: "string",
  profile_pic: "string",
  experiences: [
    {
      company_name: "string",
      position: "string",
      description: "string",
      location: "string",
      start_date: "2024-08-20",
      end_date: "2024-08-20",
    },
  ],
  educations: [
    {
      institute: "string",
      degree: "string",
      description: "string",
      location: "string",
      start_date: "2024-08-20",
      end_date: "string",
    },
  ],
  created_at: "2024-08-20T09:57:36.773Z",
  updated_at: "2024-08-20T09:57:36.773Z",
  user_id: 1,
};

const ContributorSlice = createSlice({
  name: "contributor",
  initialState,
  reducers: {
    updateContributor(state, action) {
      return {
        ...state,
        ...action.payload,
        updated_at: new Date().toISOString(),
      };
    },
    resetContributor: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const { updateContributor, resetContributor } = ContributorSlice.actions;

export default ContributorSlice.reducer;
